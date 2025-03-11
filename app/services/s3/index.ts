import { S3Client, type S3File } from "bun";
import type { PresignedUrlOptions, S3Options, SendContentType, SendLargeFilesOptions, SendOptions } from "./types";

export class S3Service {
  private client: S3Client;

  /**
   * Initializes the S3 client with the provided configuration.
   * @param options Configuration object containing credentials, bucket, region, and optional endpoint.
   */
  constructor(options: S3Options) {
    this.client = new S3Client(options);
  }

  /**
   * Returns a lazy reference to a file in S3.
   * @param key The key of the file in S3.
   * @returns An instance of S3File.
   */
  public file(key: string): S3File {
    return this.client.file(key);
  }

  /**
   * Generates a presigned URL for accessing a file
   * @param key The key of the file in S3
   * @param options Presigned URL configuration options
   * @returns A presigned URL string
   */
  public generatePresignedUrl(key: string, options?: PresignedUrlOptions): string {
    const s3file = this.file(key);

    return s3file.presign({
      expiresIn: options?.expiresIn ?? 24 * 60 * 60, // Default to 24 hours
      acl: options?.acl,
      method: options?.method ?? "GET",
    });
  }

  /**
   * Uploads a file to S3.
   * @param key The key of the file in S3.
   * @param content The content to upload (string, Buffer, or Response).
   * @param options Additional options, such as content type.
   */
  public async send(key: string, content: SendContentType, options?: SendOptions): Promise<void> {
    try {
      const s3file = this.file(key);
      await s3file.write(content, {
        type: options?.type,
        acl: options?.acl,
      });
    } catch (error) {
      if ((error as any).code === "ERR_S3_MISSING_CREDENTIALS") {
        throw new Error("Missing or invalid S3 credentials.");
      }

      throw error;
    }
  }

  /**
   * Deletes a file from S3.
   * @param key The key of the file in S3.
   */
  public async delete(key: string): Promise<void> {
    const s3file = this.file(key);
    await s3file.delete();
  }

  /**
   * Reads the content of a file from S3 as text.
   * @param key The key of the file in S3.
   * @returns The content of the file as text.
   */
  public async readAsText(key: string): Promise<string> {
    const s3file = this.file(key);
    return await s3file.text();
  }

  /**
   * Reads the content of a file from S3 as JSON.
   * @param key The key of the file in S3.
   * @returns The content of the file as JSON.
   */
  public async readAsJson<T = unknown>(key: string): Promise<T> {
    const s3file = this.file(key);
    return (await s3file.json()) as T;
  }

  /**
   * Reads the content of a file from S3 as an ArrayBuffer.
   * @param key The key of the file in S3.
   * @returns The content of the file as an ArrayBuffer.
   */
  public async readAsArrayBuffer(key: string): Promise<ArrayBuffer> {
    const s3file = this.file(key);
    return await s3file.arrayBuffer();
  }

  /**
   * Reads only a portion of the content of a file from S3.
   * @param key The key of the file in S3.
   * @param start The starting index of the portion to read.
   * @param end The ending index of the portion to read.
   * @returns The partial content of the file as text.
   */
  public async readPartial(key: string, start: number, end: number): Promise<string> {
    const s3file = this.file(key);
    return await s3file.slice(start, end).text();
  }

  /**
   * Uploads a large file to S3 using streaming.
   * @param key The key of the file in S3.
   * @param content The content to upload as a Buffer.
   * @param options Streaming options, such as chunk size and retry count.
   */
  public async sendLargeFile(key: string, content: Buffer, options?: SendLargeFilesOptions): Promise<void> {
    try {
      const s3file = this.file(key);
      const writer = s3file.writer({
        retry: options?.retry ?? 3,
        queueSize: options?.queueSize ?? 10,
        partSize: options?.partSize ?? 5 * 1024 * 1024,
        acl: options?.acl,
        type: options?.type,
      });

      for (let i = 0; i < content.length; i += options?.partSize ?? 5 * 1024 * 1024) {
        const chunk = content.subarray(i, i + (options?.partSize ?? 5 * 1024 * 1024));
        await writer.write(chunk);
      }

      await writer.end();
    } catch (error) {
      if ((error as any).code === "ERR_S3_MISSING_CREDENTIALS") {
        throw new Error("Missing or invalid S3 credentials.");
      }

      throw error;
    }
  }
}