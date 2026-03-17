# S3 Website Module

Provisions a private S3 bucket for static website hosting with best practices:
- Server-side encryption (AES256)
- Versioning enabled
- Public access blocked (intended for use with CloudFront OAC)

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| bucket_name | S3 bucket name | `string` | n/a | yes |
| tags | Tags applied to resources | `map(string)` | `{}` | no |

## Outputs

| Name | Description |
|------|-------------|
| bucket_id | The name of the bucket |
| bucket_arn | The ARN of the bucket |
| bucket_regional_domain_name | The regional domain name of the bucket |
