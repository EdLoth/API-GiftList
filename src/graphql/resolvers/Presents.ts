import {
  Arg,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
  Ctx,
} from "type-graphql";

import { PresentsModel } from "../models/Presents";
import PresentServices from "../services/Presents";
import { presentsInput } from "../inputs/Presents";
import { authMiddleware } from "src/middleware/auth";

@Resolver()
export class Present {
  @Mutation(() => PresentsModel)
  async SetPresent(@Arg("present") present: presentsInput) {

    const create = await PresentServices.create(present);
    return create;
  }

  @Mutation(() => PresentsModel)
  async PutPresent(@Arg("present") updatedData: presentsInput) {

    const update = await PresentServices.updatePresent(updatedData);
    return update;
  }

  @Mutation(() => PresentsModel)
  async DeletePresent(@Arg("present") presentId: number) {

    const create = await PresentServices.deletePresentById(presentId);
    return create;
  }

  @Query(() => [PresentsModel])
  @UseMiddleware(authMiddleware)
  async GetPresents(@Arg("isSelected", { nullable: true }) isSelected: boolean | null) {
    // Chame o método de serviço para buscar presentes com base no filtro
    const presents = await PresentServices.findAll(isSelected);
    return presents;
  }
}
