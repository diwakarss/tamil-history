output "route53_record_name" {
  description = "The name of the created Route53 record"
  value       = var.create_route53_record ? aws_route53_record.site_alias[0].name : null
}
