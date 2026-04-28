import { ApiResponse } from "@harpiats/common";
import type { Request, Response } from "@harpiats/core";
import { service } from "../services";

export async function getSlowRequests(request: Request, response: Response) {
  try {
    const threshold = request.query?.threshold ? Number(request.query.threshold) : 1000;
    const date = request.query?.date as string | undefined;
    const data = await service.getSlowRequests(threshold, date);

    return ApiResponse.success(response, data);
  } catch (error: any) {
    return ApiResponse.error(response, error);
  }
}
