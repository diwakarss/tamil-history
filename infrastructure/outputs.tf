output "s3_bucket_name" {
  description = "Static website bucket name"
  value       = module.s3_website.bucket_id
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID"
  value       = module.cloudfront.distribution_id
}

output "cloudfront_domain_name" {
  description = "CloudFront domain name"
  value       = module.cloudfront.distribution_domain_name
}

output "github_actions_role_arn" {
  description = "IAM role ARN assumed by GitHub Actions"
  value       = module.github_oidc.role_arn
}
