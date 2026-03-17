variable "bucket_name" {
  description = "Unique S3 bucket name"
  type        = string
}

variable "tags" {
  description = "Tags applied to resources"
  type        = map(string)
  default     = {}
}
