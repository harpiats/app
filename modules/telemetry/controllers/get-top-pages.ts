import { ApiResponse } from "@harpia/common";
import type { Request, Response } from "@harpia/core";
import { service } from "../services";

export async function getTopPages(request: Request, response: Response) {
  try {
    const limit = request.query?.limit ? Number(request.query.limit) : 10;
    const date = request.query?.date as string | undefined;
    const data = await service.getTopPages(limit, date);

    return ApiResponse.success(response, data);
  } catch (error: any) {
    return ApiResponse.error(response, error);
  }
}
