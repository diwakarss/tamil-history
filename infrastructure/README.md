# Infrastructure (Terraform)

This directory provisions Wave 2 infrastructure for the Tamil History static site:

- Private S3 bucket for static assets
- CloudFront distribution with S3 origin access control
- Optional Route53 alias for custom domain
- GitHub Actions OIDC IAM role for deployment without long-lived AWS keys

## Prerequisites

- Terraform `>= 1.5.0`
- AWS credentials with permission to manage S3, CloudFront, IAM, and optional Route53
- For custom domains: ACM certificate in `us-east-1`

## Module Layout

- `modules/s3-website` - S3 bucket with encryption and public access block
- `modules/cloudfront` - CloudFront distribution + S3 bucket policy + optional Route53 record
- `modules/github-oidc` - OIDC provider, deploy role, and least-privilege deployment policy

## Usage

1. Copy example variables file:

```bash
cp terraform.tfvars.example terraform.tfvars
```

2. Update required values in `terraform.tfvars`:
- `bucket_name`
- `github_org`
- `github_repo`
- Optional custom-domain values: `domain_name`, `hosted_zone_id`, `acm_certificate_arn`

3. Initialize and apply:

```bash
terraform init
terraform plan
terraform apply
```

4. Configure GitHub repository secrets from Terraform outputs:
- `AWS_ROLE_ARN` = `github_actions_role_arn`
- `S3_BUCKET` = `s3_bucket_name`
- `CF_DIST_ID` = `cloudfront_distribution_id`

## Validation

```bash
terraform fmt -check -recursive
terraform validate
```

## Behavior Notes

- When `domain_name` is unset, CloudFront uses its default certificate and no Route53 record is created.
- To create a Route53 alias record, set both `domain_name` and `hosted_zone_id`.
- If using a custom domain, set `acm_certificate_arn` for a certificate issued in `us-east-1`.
- **OIDC Provider**: By default, the `github-oidc` module creates the IAM OIDC provider. If the provider already exists in the AWS account, set `create_oidc_provider = false` and provide the `oidc_provider_arn`.
