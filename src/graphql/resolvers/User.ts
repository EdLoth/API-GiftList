import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";

import { UserModel } from "../models/User";
import UserServices from "../services/User";
import { bodyUser } from "../inputs/User";
import { adminMiddleware, authMiddleware } from "../../middleware/auth";

@Resolver()
export class User {
  @Mutation(() => UserModel)
  async SetUser(@Arg("userBody") user: bodyUser) {
    const create = await UserServices.create(user);
    return create;
  }

  @UseMiddleware(authMiddleware, adminMiddleware)
  @Query(() => [UserModel])
  async GetUsers() {
    const users = await UserServices.findAll();
    return users;
  }
}
