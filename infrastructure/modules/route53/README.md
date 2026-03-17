# Route53 Module

Provisions a Route53 alias record for CloudFront.

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| create_route53_record | Whether to create the record | `bool` | n/a | yes |
| hosted_zone_id | Route53 hosted zone ID | `string` | n/a | yes |
| domain_name | Custom domain name | `string` | n/a | yes |
| cloudfront_domain_name | CloudFront distribution domain name | `string` | n/a | yes |
| cloudfront_hosted_zone_id | CloudFront Route53 hosted zone ID | `string` | n/a | yes |

## Outputs

(No outputs)
