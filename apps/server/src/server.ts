import express, { Request, Response } from "express";

const app = express();

app.get("/products", (_req: Request, res: Response) =>
  res.json([
    {
      name: "SAMSUNG S21",
    },
  ])
);

app.listen(3000, () => console.log("The server os listening on port 3000"));
