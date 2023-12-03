import { Field, ObjectType } from "type-graphql";
import { PresentsModel } from "./Presents";

@ObjectType()
export class UserModel {
  @Field({ nullable: true })
  id: number | null;

  @Field({ nullable: true })
  name: string | null;

  @Field({ nullable: true })
  email: string | null;

  @Field({ nullable: true })
  password: string | null;

  @Field(() => [PresentsModel], { nullable: true })
  presents: [PresentsModel] | null;
}
