import { MiddlewareFn } from "type-graphql";
import jwt from "jsonwebtoken";

import { Context } from "../context/context";
import { UserServices } from "../graphql/services";

interface TokenPayload {
  id: number;
  ip: string;
  iat: number;
  exp: number;
}

export const authMiddleware: MiddlewareFn<Context> = async (
  { context },
  next
) => {
  const { authorization } = context.req.headers;

  if (!authorization) {
    throw new Error("Need a token");
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = jwt.verify(token, process.env.AUTH_SECRET);
    const { id } = data as TokenPayload;

    context.user.id = id;
    context.user.token = token;

    const usuario = await UserServices.findUser(id);

    if (!usuario) {
      throw new Error("User not found");
    }

    context.user = usuario;

    return next();
  } catch (error) {
    throw new Error(error);
  }
};

export const adminMiddleware: MiddlewareFn<Context> = async (
  { context },
  next
) => {
  const { admin } = context;

  if (!admin) {
    throw new Error("Need a token");
  }

  const userProfile = admin.hash;

  if (!userProfile) {
    throw new Error("You are not admin");
  }

  return next();
};
