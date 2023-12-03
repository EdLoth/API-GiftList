import {
  Arg,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
  Ctx,
} from "type-graphql";

import { UserPresentModel } from "../models/UserPresent";
import UserPresentServices from "../services/UserPresent";

@Resolver()
export class UserPresents {
  @Query(() => [UserPresentModel])
  async GetPresentsByUserId(@Arg("userId") userId: number) {
    // Chame o método de serviço para buscar presentes do usuário com base no ID do usuário
    const presents = await UserPresentServices.findPresentsByUserId(userId);
    return presents;
  }

  @Mutation(() => UserPresentModel)
  async associationUserPresent(
    @Arg("userId") userId: number,
    @Arg("presentId") presentId: number
  ) {
    // Chame o método de serviço para associar o presente ao usuário
    const updatedPresent = await UserPresentServices.associatePresentToUser(
      userId,
      presentId
    );
    return updatedPresent;
  }

  @Mutation(() => UserPresentModel)
  async deleteAssociationUserPresent(
    @Arg("userPresentID") userPresentID: number,
  ) {
    // Chame o método de serviço para associar o presente ao usuário
    const updatedPresent = await UserPresentServices.deleteAssociationUserPresent(
      userPresentID
    );
    return updatedPresent;
  }
  
}
