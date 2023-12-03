import { Field, InputType } from "type-graphql";
import { PresentsModel } from "../models/Presents";

@InputType()
export class bodyAdmin {
  @Field({ nullable: true })
  id: number | null;

  @Field({ nullable: true })
  name: string | null;

  @Field({ nullable: true })
  cpf: string | null;

  @Field({ nullable: true })
  hash: string | null;
}
