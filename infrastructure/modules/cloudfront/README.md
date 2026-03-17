# CloudFront Module

Provisions a CloudFront distribution for static website hosting from an S3 bucket, using Origin Access Control (OAC) for secure, policy-enforced access.

## Features

- **Origin Access Control (OAC)**: Secure S3 access via signed requests (SigV4)
- **Custom domain support**: Optional ACM certificate and domain aliases
- **Single Page Application (SPA) support**: Routes 403/404 errors to `index.html` for client-side routing
- **HTTPS enforcement**: Automatic HTTP-to-HTTPS redirects
- **S3 bucket policy**: CloudFront-only read access with distribution ARN restriction
- **Tagging**: Support for resource tags (cost allocation, environment, etc.)

## Inputs

| Name | Type | Default | Required | Description |
|------|------|---------|:--------:|-------------|
| `bucket_name` | `string` | — | Yes | Name of the S3 bucket to serve content from |
| `bucket_domain_name` | `string` | — | Yes | Regional domain name of the S3 bucket (e.g., `my-bucket.s3.amazonaws.com`) |
| `bucket_arn` | `string` | — | Yes | Amazon Resource Name (ARN) of the S3 bucket |
| `aliases` | `list(string)` | `[]` | No | Custom domain aliases (e.g., `["example.com", "www.example.com"]`) |
| `acm_certificate_arn` | `string` | `""` | No | ACM certificate ARN in us-east-1 (required only with custom aliases) |
| `tags` | `map(string)` | `{}` | No | Tags to apply to all CloudFront resources |

## Outputs

| Name | Description |
|------|-------------|
| `distribution_id` | Unique identifier for the CloudFront distribution |
| `distribution_arn` | Amazon Resource Name (ARN) of the distribution |
| `distribution_domain_name` | Default CloudFront domain name |
| `hosted_zone_id` | Route53 hosted zone ID for alias records |
