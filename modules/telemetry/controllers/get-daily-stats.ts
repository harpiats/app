import { ApiResponse } from "@harpiats/common";
import type { Request, Response } from "@harpiats/core";
import { service } from "../services";

export async function getDailyStats(_request: Request, response: Response) {
  try {
    const data = await service.getDailyStats();

    return ApiResponse.success(response, data);
  } catch (error: any) {
    return ApiResponse.error(response, error);
  }
}
