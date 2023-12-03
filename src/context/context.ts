import { Request, Response } from "express";

export interface Context {
  req: Request;
  res: Response;
  user: {
    id: number;
    email?: string;
    name?: string;
    api_token?: string;
    presents?: any[];
    token?: string;
  };
  admin: {
    hash: string;
  };
}
