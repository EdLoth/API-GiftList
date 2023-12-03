import { Field, InputType } from "type-graphql";
import { PresentsModel } from "../models/Presents";

@InputType()
export class bodyUser {
  @Field({ nullable: true })
  id: number | null;

  @Field({ nullable: true })
  name: string | null;

  @Field({ nullable: true })
  email: string | null;

  @Field({ nullable: true })
  password: string | null;
}
