import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class AdminModel {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  cpf: string;

  @Field()
  hash: string;
}
