locals {
  # Determine whether to use CloudFront default certificate or custom ACM certificate.
  # Default certificate is used when no custom domain aliases are specified.
  use_default_cert = length(var.aliases) == 0
}

#
# CloudFront Function: URL Rewrite
#
# Rewrites locale paths (/en, /ta) to their static HTML files (/en.html, /ta.html).
# Required because Next.js static export generates .html files but users access
# extensionless paths.
#
resource "aws_cloudfront_function" "url_rewrite" {
  name    = "${var.bucket_name}-url-rewrite"
  runtime = "cloudfront-js-2.0"
  comment = "Rewrite locale paths to .html files for ${var.bucket_name}"
  publish = true
  code    = file("${path.module}/url-rewrite.js")
}

#
# Origin Access Control (OAC)
#
resource "aws_cloudfront_origin_access_control" "site" {
  name                              = "${var.bucket_name}-oac"
  description                       = "Origin Access Control for S3 bucket: ${var.bucket_name}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

#
# CloudFront Distribution
#
resource "aws_cloudfront_distribution" "site" {
  enabled             = true
  comment             = "Content delivery for ${var.bucket_name}"
  default_root_object = "index.html"
  aliases             = var.aliases

  # S3 origin with Origin Access Control for secure, policy-enforced access
  origin {
    domain_name              = var.bucket_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.site.id
    origin_id                = "s3-${var.bucket_name}"
  }

  # Cache behavior for all requests
  default_cache_behavior {
    # Allow only safe HTTP methods (no mutation operations on static content)
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "s3-${var.bucket_name}"
    compress               = true
    viewer_protocol_policy = "redirect-to-https"

    # URL rewrite function for locale paths (/en -> /en.html, /ta -> /ta.html)
    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.url_rewrite.arn
    }

    # Disable query string and cookie forwarding for simpler caching
    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  # No geographic restrictions applied
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  # SSL/TLS configuration: use ACM certificate if custom domain, else CloudFront default
  viewer_certificate {
    acm_certificate_arn            = local.use_default_cert ? null : var.acm_certificate_arn
    ssl_support_method             = local.use_default_cert ? null : "sni-only"
    minimum_protocol_version       = local.use_default_cert ? null : "TLSv1.2_2021"
    cloudfront_default_certificate = local.use_default_cert
  }

  # Error handling for Single Page Application (SPA) client-side routing
  # Maps 403 Forbidden errors to index.html (occurs when OAC denies access)
  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }

  # Error handling for Single Page Application (SPA) client-side routing
  # Maps 404 Not Found errors to index.html (client-side router handles path matching)
  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  tags = var.tags
}

#
# S3 Bucket Policy
#
# Authorizes CloudFront distribution to read objects from the S3 bucket.
# Access is restricted to the specific distribution via ARN.
#
data "aws_iam_policy_document" "allow_cloudfront_read" {
  statement {
    sid    = "AllowCloudFrontDistributionReadOnly"
    effect = "Allow"

    # Grant access to CloudFront service
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    # Allow read-only access to bucket objects
    actions   = ["s3:GetObject"]
    resources = ["${var.bucket_arn}/*"]

    # Restrict to this specific CloudFront distribution
    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.site.arn]
    }
  }
}

# Attach policy to S3 bucket to enforce CloudFront-only access
resource "aws_s3_bucket_policy" "allow_cloudfront" {
  bucket = var.bucket_name
  policy = data.aws_iam_policy_document.allow_cloudfront_read.json
}
