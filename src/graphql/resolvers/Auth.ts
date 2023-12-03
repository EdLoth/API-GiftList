import { Context } from "src/context/context";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { usuarioLogin } from "../inputs/UserLogin";
import { UsuarioLoginModel } from "../models/UserLogin";
import UserServices from "../services/User";
import { GraphQLError } from "graphql/error/GraphQLError";
import jwt from "jsonwebtoken";

@Resolver()
export class Authenticate {
  @Mutation(() => UsuarioLoginModel)
  async Login(@Arg("usuario") usuario: usuarioLogin, @Ctx() context: Context) {
    const emailValid = await UserServices.emailValid(usuario.email);

    if (!emailValid.emailValid) {
      throw new GraphQLError("Usuário não existe!");
    }

    const passwordValid = await UserServices.passwordValid(
      usuario.password,
      emailValid.user.password
    );

    if (!passwordValid) {
      throw new GraphQLError("Senha Inválida!");
    }

    emailValid.user.api_token = jwt.sign(
      {
        name: emailValid.user.name,
        email: emailValid.user.email,
        id: emailValid.user.id,
      },
      process.env.AUTH_SECRET,
      { expiresIn: "1d" }
    );

    let update = await UserServices.updateToken(
      emailValid.user.id,
      emailValid.user.api_token
    );

    context.user = update;

    return {
      ...emailValid.user,
    };
  }
}
