import { Field, InputType } from "type-graphql";
import { UserModel } from "../models/User";

@InputType()
export class presentsInput {
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
