import { Field, ObjectType } from "type-graphql";
import { UserModel } from "./User";

@ObjectType()
export class PresentsModel {
  @Field({ nullable: true })
  id: number | null;

  @Field({ nullable: true })
  name: string | null;

  @Field({ nullable: true })
  urlImg: string | null;

  @Field({ nullable: true })
  link: string | null;

  @Field({ nullable: true })
  price: number | null;

  @Field({ nullable: true })
  isSelected: boolean | null;
}
