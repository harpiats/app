import { ApiResponse } from "@harpia/common";
import type { Request, Response } from "@harpia/core";
import { service } from "../services";

export async function deleteData(request: Request, response: Response) {
  try {
    const date = request.query?.date as string | undefined;
    const ip = request.query?.ip as string | undefined;

    if (!date && !ip) {
      return response.status(400).json({ status: "ERROR", error: { code: "BAD_REQUEST", message: "At least one filter ('date' or 'ip') is required." } });
    }

    const data = await service.deleteData(date, ip);

    return ApiResponse.success(response, data);
  } catch (error: any) {
    return ApiResponse.error(response, error);
  }
}
