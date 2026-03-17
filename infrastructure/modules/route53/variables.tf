variable "create_route53_record" {
  description = "Whether to create the Route53 alias record"
  type        = bool
  default     = false
}

variable "hosted_zone_id" {
  description = "Route53 Hosted Zone ID"
  type        = string
  default     = ""
}

variable "domain_name" {
  description = "Domain name for the A record"
  type        = string
  default     = ""
}

variable "cloudfront_domain_name" {
  description = "CloudFront distribution domain name"
  type        = string
}

variable "cloudfront_hosted_zone_id" {
  description = "CloudFront distribution hosted zone ID"
  type        = string
}
