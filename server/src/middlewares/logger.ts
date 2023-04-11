import { Request, Response, NextFunction } from "express";

export default function logger(request: Request, _response: Response, next: NextFunction) {
  const method = request.method;
  const path = request.url;
  const now = new Date().toLocaleString();
  let dots: string = "";

  for (let i = 0; i < process.stdout.columns - 3 - method.length - path.length - now.length; i++) {
    dots += ".";
  }

  console.log(`${method} ${path} ${dots} ${now}`);

  next();
}
