import { Field, ObjectType } from "type-graphql";
import { PresentsModel } from "./Presents";
import { UserModel } from "./User";

@ObjectType()
export class UserPresentModel {
  @Field({ nullable: true })
  id: number | null;

  @Field({ nullable: true })
  userId: number | null;

  @Field({ nullable: true })
  presentId: number | null;

  @Field(() => UserModel, { nullable: true })
  user: UserModel | null; // Campo que representa o usuário associado

  @Field(() => PresentsModel, { nullable: true })
  present: PresentsModel | null; // Campo que representa o presente associado
}
