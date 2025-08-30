export class AppError extends Error {
  private static readonly BAD_REQUEST: number = 400;
  private static readonly VALIDATION_FAIL: number = 400;
  private static readonly UNAUTHORIZED: number = 401;
  private static readonly FORBIDDEN: number = 403;
  private static readonly NOT_FOUND: number = 404;
  private static readonly LOGIC_ERROR: number = 500;
  private static readonly GENERIC_ERROR: number = 500;

  public status: number;

  constructor(status = 500, ...params: string[]) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }

    this.status = status;
    this.name = "AppError";
  }

  public static E_INVALID_CREDENTIALS() {
    return new AppError(AppError.UNAUTHORIZED, "INVALID_CREDENTIALS");
  }

  public static E_BAD_REQUEST(message?: string) {
    return new AppError(AppError.BAD_REQUEST, message ?? "BAD_REQUEST");
  }

  public static E_VALIDATION_FAIL(message?: string) {
    return new AppError(AppError.VALIDATION_FAIL, message ?? "VALIDATION_FAIL");
  }

  public static E_UNAUTHORIZED(message?: string) {
    return new AppError(AppError.UNAUTHORIZED, message ?? "UNAUTHORIZED");
  }

  public static E_FORBIDDEN(message?: string) {
    return new AppError(AppError.FORBIDDEN, message ?? "FORBIDDEN");
  }

  public static E_NOT_FOUND(message?: string) {
    return new AppError(AppError.NOT_FOUND, message ?? "NOT_FOUND");
  }

  public static E_LOGIC_ERROR(message?: string) {
    return new AppError(AppError.LOGIC_ERROR, message ?? "LOGIC_ERROR");
  }

  public static E_GENERIC_ERROR(message?: string) {
    return new AppError(AppError.GENERIC_ERROR, message ?? "GENERIC_ERROR");
  }
}
