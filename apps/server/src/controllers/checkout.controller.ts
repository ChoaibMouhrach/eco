import { Request, Response } from "express";
import { AuthRequest } from "..";

const checkOut = (request: AuthRequest, response: Response) => {
  return response.json(request.body);
};

const webHook = (request: Request, response: Response) => {
  return response.json(request.body);
};

export const checkOutController = {
  checkOut,
  webHook,
};
