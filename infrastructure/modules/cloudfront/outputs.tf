#
# CloudFront Distribution Outputs
#
output "distribution_id" {
  description = "Unique identifier for the CloudFront distribution. Use for cache invalidations and API operations."
  value       = aws_cloudfront_distribution.site.id
}

output "distribution_arn" {
  description = "Amazon Resource Name (ARN) of the CloudFront distribution. Use for IAM policies and resource references."
  value       = aws_cloudfront_distribution.site.arn
}

output "distribution_domain_name" {
  description = "Default CloudFront domain name (e.g., d111111abcdef8.cloudfront.net). Use when custom domain is not configured."
  value       = aws_cloudfront_distribution.site.domain_name
}

#
# Route53 Integration
#
output "hosted_zone_id" {
  description = "Route53 hosted zone ID for the CloudFront distribution. Use as the AliasTarget HostedZoneId when creating Route53 alias records."
  value       = aws_cloudfront_distribution.site.hosted_zone_id
}
