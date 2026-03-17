#
# S3 Bucket Configuration
#
variable "bucket_name" {
  type        = string
  description = "Name of the S3 bucket to serve content from."
}

variable "bucket_domain_name" {
  type        = string
  description = "Regional domain name of the S3 bucket (e.g., my-bucket.s3.amazonaws.com)."
}

variable "bucket_arn" {
  type        = string
  description = "Amazon Resource Name (ARN) of the S3 bucket."
}

#
# CloudFront Configuration
#
variable "aliases" {
  type        = list(string)
  default     = []
  description = "List of custom domain aliases for the CloudFront distribution (e.g., [\"example.com\", \"www.example.com\"]). When empty, CloudFront default domain is used."
}

variable "acm_certificate_arn" {
  type        = string
  default     = ""
  description = "ARN of ACM SSL/TLS certificate in us-east-1. Required only when using custom domain aliases. Leave blank to use CloudFront default domain."
}

#
# Tags
#
variable "tags" {
  type        = map(string)
  default     = {}
  description = "Map of tags to apply to all CloudFront resources (e.g., {\"Environment\" = \"production\", \"Team\" = \"platform\"})."
}
