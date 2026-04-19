import { ApiResponse } from "@harpia/common";
import type { Request, Response } from "@harpia/core";
import { service } from "../services";

export async function getAll(_request: Request, response: Response) {
  try {
    const data = await service.getAll();

    return ApiResponse.success(response, data);
  } catch (error: any) {
    return ApiResponse.error(response, error);
  }
}
