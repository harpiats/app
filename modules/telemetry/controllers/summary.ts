import { ApiResponse } from "@harpiats/common";
import type { Request, Response } from "@harpiats/core";
import { service } from "../services";

export async function summary(request: Request, response: Response) {
  try {
    const date = request.query?.date as string | undefined;
    const limit = request.query?.limit ? Number(request.query.limit) : undefined;
    const data = await service.summary(date, limit);

    return ApiResponse.success(response, data);
  } catch (error: any) {
    return ApiResponse.error(response, error);
  }
}
