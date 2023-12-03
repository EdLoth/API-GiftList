import { Field, InputType, ID } from "type-graphql";


@InputType()
export class usuarioLogin {
  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  password: string;

}
