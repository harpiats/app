import { ApiResponse } from "@harpiats/common";
import type { Request, Response } from "@harpiats/core";
import { service } from "../services";

export async function countUniqueVisitors(request: Request, response: Response) {
  try {
    const date = request.query?.date as string | undefined;
    const data = await service.countUniqueVisitors(date);

    return ApiResponse.success(response, { count: data });
  } catch (error: any) {
    return ApiResponse.error(response, error);
  }
}
