# GitHub OIDC Module

Sets up AWS IAM Federation with GitHub Actions via OIDC.

## Features
- OIDC Provider for GitHub (optional)
- IAM Role with trust relationship for specific repo and branch
- Least-privilege policy for S3 deployment and CloudFront invalidation

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| role_name | IAM role name for GitHub Actions | `string` | n/a | yes |
| github_org | GitHub organization/user | `string` | n/a | yes |
| github_repo | GitHub repository | `string` | n/a | yes |
| github_branch | Git branch allowed for role assumption | `string` | `main` | no |
| s3_bucket_arn | S3 bucket ARN for deploy permissions | `string` | n/a | yes |
| cloudfront_dist_arn | CloudFront distribution ARN for invalidation permissions | `string` | n/a | yes |
| tags | Tags applied to resources | `map(string)` | `{}` | no |

## Outputs

| Name | Description |
|------|-------------|
| role_arn | IAM role ARN for GitHub Actions |
