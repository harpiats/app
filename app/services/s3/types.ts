export type S3Options = {
  bucket: string;
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  endpoint?: string;
};

export type ACLType =
  | "public-read"
  | "private"
  | "public-read-write"
  | "authenticated-read"
  | "aws-exec-read"
  | "bucket-owner-read"
  | "bucket-owner-full-control"
  | "log-delivery-write";

export type PresignedUrlOptions = {
  expiresIn?: number; // Tempo em segundos
  acl?: ACLType;
  method?: "GET" | "PUT" | "DELETE" | "HEAD" | "POST";
};

export type SendContentType = string | Buffer | Response;

export type SendOptions = {
  type?: string;
  acl?: ACLType;
};

export type SendLargeFilesOptions = {
  retry?: number;
  queueSize?: number;
  partSize?: number;
  acl?: ACLType;
  type?: string;
};
