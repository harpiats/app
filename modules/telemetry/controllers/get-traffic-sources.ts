import { ApiResponse } from "@harpia/common";
import type { Request, Response } from "@harpia/core";
import { service } from "../services";

export async function getTrafficSources(request: Request, response: Response) {
  try {
    const date = request.query?.date as string | undefined;
    const source = request.query?.source as string | undefined;
    const data = await service.getTrafficSources(date, source);

    return ApiResponse.success(response, data);
  } catch (error: any) {
    return ApiResponse.error(response, error);
  }
}
