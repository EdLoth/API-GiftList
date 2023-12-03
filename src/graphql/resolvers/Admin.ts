import {
  Arg,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
  Ctx,
} from "type-graphql";

import AdminServices from "../services/Admin";
import { bodyAdmin } from "../inputs/Admin";
import { AdminModel } from "../models/Admin";

@Resolver()
export class Admin {
  @Mutation(() => AdminModel)
  async SetAdmin(@Arg("adminBody") adminBody: bodyAdmin) {
    const create = await AdminServices.create(adminBody);
    return create;
  }

  @Mutation(() => AdminModel)
  async PutHashAdminByCPF(@Arg("cpf") cpf: string) {
    const create = await AdminServices.updateHashByCPF(cpf);
    return create;
  }
}
