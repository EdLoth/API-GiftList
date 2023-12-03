import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class UsuarioLoginModel {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  api_token: string;
}
