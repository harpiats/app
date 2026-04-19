import { ApiResponse } from "@harpia/common";
import type { Request, Response } from "@harpia/core";
import { service } from "../services";

export async function getVisitors(request: Request, response: Response) {
  try {
    const date = request.query?.date as string | undefined;
    const data = await service.getVisitors(date);

    return ApiResponse.success(response, data);
  } catch (error: any) {
    return ApiResponse.error(response, error);
  }
}
