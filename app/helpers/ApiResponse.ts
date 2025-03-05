import type { Response } from "harpiats";
import { ZodError } from "zod";
import AppError from "./AppError";

export default {
  success: (res: Response, data?: any, redirect?: string): void => {
    const result = typeof data === "string" ? { message: data } : (data ?? null);
    const redirectUrl = redirect?.startsWith("/") ? redirect : `/${redirect}`;

    if (redirect) {
      res.redirect(redirectUrl);
    } else {
      res.json({
        status: "OK",
        result,
        error: null,
      });
    }
  },

  pagination: (res: Response, data: any): void => {
    const result = data.toJSON ? data.toJSON() : data;

    res.json({
      status: "OK",
      result: result.data || [],
      pagination: {
        page: result.meta.currentPage,
        lastPage: result.meta.lastPage,
        total: result.meta.total,
        perPage: result.meta.perPage,
      },
      error: null,
    });
  },

  error: function (
    res: Response,
    ...args: [error: AppError | Error] | [code: string, message?: string, statusCode?: number]
  ) {
    const [code, message, statusCode] = args;

    if (code instanceof AppError) {
      return this.appError(res, code);
    }

    if (code instanceof ZodError) {
      const issues: Record<string, string[]> = {};

      for (const error of code.errors) {
        const field = error.path[0];

        if (!issues[field]) issues[field] = [];

        issues[field].push(error.message);
      }

      return res.status(400).json({
        status: "ERROR",
        error: {
          code: "VALIDATION_ERROR",
          issues,
        },
      });
    }

    if (code instanceof Error) {
      const errorMap: Record<string, { status: number; code: string; message?: string }> = {
        E_ROUTE_NOT_FOUND: { status: 404, code: "NOT_FOUND" },
        E_ROW_NOT_FOUND: { status: 404, code: "NOT_FOUND" },
        E_UNAUTHORIZED_ACCESS: {
          status: 401,
          code: "UNAUTHORIZED",
          message: "You must be logged in.",
        },
      };

      const errorResponse = Object.entries(errorMap).find(([prefix]) => code.message.startsWith(prefix))?.[1];

      if (errorResponse) {
        return res.status(errorResponse.status).json({
          status: "ERROR",
          error: { code: errorResponse.code, message: errorResponse.message },
        });
      }

      return res.status(statusCode ?? 500).json({
        status: "ERROR",
        error: { code: "INTERNAL_ERROR", message: code.message },
      });
    }

    return res.status(statusCode ?? 500).json({ status: "ERROR", error: { code, message } });
  },

  appError: (res: Response, error: AppError): void => {
    res.status(error.status).json({
      status: "ERROR",
      error: {
        message: error.message,
      },
    });
  },
};
