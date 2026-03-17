variable "role_name" {
  description = "IAM role name for GitHub Actions"
  type        = string
}

variable "create_oidc_provider" {
  description = "Whether to create the GitHub OIDC provider. Set to false if it already exists in the account."
  type        = bool
  default     = true
}

variable "oidc_provider_arn" {
  description = "Existing GitHub OIDC provider ARN. Required if create_oidc_provider is false."
  type        = string
  default     = ""
}

variable "github_org" {
  description = "GitHub organization/user"
  type        = string
}

variable "github_repo" {
  description = "GitHub repository"
  type        = string
}

variable "github_branch" {
  description = "Git branch allowed for role assumption"
  type        = string
  default     = "main"
}

variable "s3_bucket_arn" {
  description = "S3 bucket ARN for deploy permissions"
  type        = string
}

variable "cloudfront_dist_arn" {
  description = "CloudFront distribution ARN for invalidation permissions"
  type        = string
}

variable "tags" {
  description = "Tags applied to resources"
  type        = map(string)
  default     = {}
}
