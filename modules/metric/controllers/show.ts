import type { Request, Response } from "harpiats";

import ApiResponse from "app/helpers/ApiResponse";
import { service } from "../services";

export async function show(request: Request, response: Response) {
  try {
    const data = await service.show();

    return ApiResponse.success(response, data);
  } catch (error: any) {
    return ApiResponse.error(response, error);
  }
}
