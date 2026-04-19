import { ApiResponse } from "@harpia/common";
import type { Request, Response } from "@harpia/core";
import { service } from "../services";

export async function getPageByPath(request: Request, response: Response) {
  try {
    const path = request.params.path;
    const date = request.query?.date as string | undefined;

    if (!path) {
      return response.status(400).json({ status: "ERROR", error: { code: "BAD_REQUEST", message: "The 'path' parameter is required." } });
    }

    const data = await service.getPageByPath(`/${path}`, date);

    if (!data) {
      return response.status(404).json({ status: "ERROR", error: { code: "NOT_FOUND", message: "Page not found." } });
    }

    return ApiResponse.success(response, data);
  } catch (error: any) {
    return ApiResponse.error(response, error);
  }
}
