import { ApiResponse } from "@harpia/common";
import type { Request, Response } from "@harpia/core";
import { service } from "../services";

export async function getVisitorByIp(request: Request, response: Response) {
  try {
    const ip = request.params.ip;
    const date = request.query?.date as string | undefined;
    const data = await service.getVisitorByIp(ip, date);

    if (!data) {
      return response.status(404).json({ status: "ERROR", error: { code: "NOT_FOUND", message: "Visitor not found." } });
    }

    return ApiResponse.success(response, data);
  } catch (error: any) {
    return ApiResponse.error(response, error);
  }
}
