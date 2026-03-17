variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project identifier used for tagging"
  type        = string
  default     = "tamil-history"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "prod"
}

variable "bucket_name" {
  description = "S3 bucket name for static site artifacts"
  type        = string
}

variable "domain_name" {
  description = "Optional custom domain"
  type        = string
  default     = ""
}

variable "hosted_zone_id" {
  description = "Optional Route53 hosted zone ID used when domain_name is set"
  type        = string
  default     = ""
}

variable "acm_certificate_arn" {
  description = "Optional ACM certificate ARN in us-east-1 for CloudFront custom domain"
  type        = string
  default     = ""
}

variable "github_org" {
  description = "GitHub organization or user owning the repository"
  type        = string
}

variable "github_repo" {
  description = "GitHub repository name"
  type        = string
}

variable "github_branch" {
  description = "Git branch allowed to assume deploy role"
  type        = string
  default     = "main"
}

variable "create_oidc_provider" {
  description = "Whether to create the GitHub OIDC provider"
  type        = bool
  default     = true
}

variable "oidc_provider_arn" {
  description = "Existing GitHub OIDC provider ARN (if create_oidc_provider is false)"
  type        = string
  default     = ""
}

variable "budget_limit" {
  description = "Monthly budget limit in USD"
  type        = string
  default     = "5"
}

variable "budget_emails" {
  description = "Email addresses for budget alerts"
  type        = list(string)
  default     = []
}
