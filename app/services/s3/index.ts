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

// Example usage:
const s3Service = new S3Service({
  accessKeyId: "your-access-key",
  secretAccessKey: "your-secret-key",
  bucket: "my-bucket",
  region: "us-east-1",
});

// Upload de um Arquivo Simples
//
// Upload a text file
await s3Service.send("example.txt", "Hello, S3!", { type: "text/plain" });
console.log("File uploaded successfully!");

// Leitura de um Arquivo como Texto
//
// Read a file as text
const content = await s3Service.readAsText("example.txt");
console.log("File content:", content);

// Exclusão de um Arquivo
//
// Delete a file
await s3Service.delete("example.txt");
console.log("File deleted successfully!");

// Leitura de um Arquivo como JSON
//
// Upload a JSON file
await s3Service.send("data.json", JSON.stringify({ name: "John", age: 30 }), { type: "application/json" });

// Read the JSON file
const data = await s3Service.readAsJson("data.json");
console.log("JSON data:", data);

// Upload de um Arquivo Grande com Streaming
//
// Create a large buffer (e.g., 20MB)
const largeFile = Buffer.alloc(20 * 1024 * 1024, "a"); // 20MB file filled with 'a'

// Upload the large file using streaming
await s3Service.sendLargeFile("large-file.bin", largeFile, {
  partSize: 5 * 1024 * 1024, // 5MB chunks
  retry: 3, // Retry up to 3 times on failure
  queueSize: 10, // 10 concurrent uploads
});
console.log("Large file uploaded successfully!");

// Leitura Parcial de um Arquivo
//
// Read only the first 100 bytes of a file
const partialContent = await s3Service.readPartial("large-file.bin", 0, 100);
console.log("Partial content:", partialContent);

// Explicação dos Exemplos
// Upload Simples: Envia um arquivo de texto para o S3.
// Leitura como Texto: Lê o conteúdo de um arquivo como texto.
// Leitura como JSON: Envia um arquivo JSON para o S3 e o lê de volta como um objeto JavaScript.
// Exclusão: Remove um arquivo do S3.
// Upload de Arquivo Grande: Usa streaming para enviar um arquivo grande em partes (chunks).
// Leitura Parcial: Lê apenas uma parte específica de um arquivo.
