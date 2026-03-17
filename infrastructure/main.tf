locals {
  tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
  }

  has_custom_domain     = var.domain_name != ""
  has_hosted_zone       = var.hosted_zone_id != ""
  create_route53_record = local.has_custom_domain && local.has_hosted_zone
  aliases               = local.has_custom_domain ? [var.domain_name] : []
}

module "s3_website" {
  source      = "./modules/s3-website"
  bucket_name = var.bucket_name
  tags        = local.tags
}

module "cloudfront" {
  source              = "./modules/cloudfront"
  bucket_name         = module.s3_website.bucket_id
  bucket_domain_name  = module.s3_website.bucket_regional_domain_name
  bucket_arn          = module.s3_website.bucket_arn
  aliases             = local.aliases
  acm_certificate_arn = var.acm_certificate_arn
  tags                = local.tags
}

module "github_oidc" {
  source               = "./modules/github-oidc"
  role_name            = "${var.project_name}-${var.environment}-github-actions-deploy"
  github_org           = var.github_org
  github_repo          = var.github_repo
  github_branch        = var.github_branch
  create_oidc_provider = var.create_oidc_provider
  oidc_provider_arn    = var.oidc_provider_arn
  s3_bucket_arn        = module.s3_website.bucket_arn
  cloudfront_dist_arn  = module.cloudfront.distribution_arn
  tags                 = local.tags
}

module "route53" {
  source                    = "./modules/route53"
  create_route53_record     = local.create_route53_record
  hosted_zone_id            = var.hosted_zone_id
  domain_name               = var.domain_name
  cloudfront_domain_name    = module.cloudfront.distribution_domain_name
  cloudfront_hosted_zone_id = module.cloudfront.hosted_zone_id
}
