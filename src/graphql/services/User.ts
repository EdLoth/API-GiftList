import { prisma } from "../database";
import bcrypt from "bcryptjs";

type User = {
  email: string;
  name: string;
  password: string;
  api_token?: string;
};

class UserServices {
  async findAll() {
    return await prisma.user.findMany();
  }

  async findUser(id: number) {
    const find = await prisma.user.findFirst({
      where: { id},
      }
    );
    return find;
  }


  async emailValid(email: string) {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return { emailValid: false };
    }

    return { emailValid: true, user: user };
  }

  async passwordValid(password: string, hashPassword: string) {
    const isValid = await bcrypt.compare(password, hashPassword);

    if (!isValid) {
      return false;
    } else {
      return true;
    }
  }

  async updateToken(id: number, token: string) {
    const update = await prisma.user.update({
      where: { id },
      data: {
        remember_token: token,
      }
    });

    return update;
  }

  async create(user: User) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const data = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: hashedPassword,
        },
      });

      return data;
    } catch (error) {
      throw new Error(`Erro ao criar usuário: ${error}`);
    }
  }

  async update(
    userId: number,
    updatedData: {
      name?: string;
      email?: string;
      currentPassword?: string; // Adicione um campo para a senha atual
      newPassword?: string; // Adicione um campo para a nova senha (opcional)
    }
  ) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new Error(`Usuário não encontrado`);
      }

      if (updatedData.currentPassword) {
        const isPasswordValid = await bcrypt.compare(
          updatedData.currentPassword,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error(`Senha atual incorreta`);
        }
      }

      if (updatedData.newPassword) {
        const newHashedPassword = await bcrypt.hash(
          updatedData.newPassword,
          10
        );

        // Atualize a senha no banco de dados com o novo hash
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            password: newHashedPassword,
          },
        });
      }

      // Atualize outros campos (name, email, etc.) se forem fornecidos
      if (updatedData.name || updatedData.email) {
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            name: updatedData.name,
            email: updatedData.email,
          },
        });
      }

      return "Usuário atualizado com sucesso";
    } catch (error) {
      throw new Error(`Erro ao atualizar o usuário: ${error.message}`);
    }
  }

  async deleteUserByID(userId: number) {
    try {
      // Exclua o usuário do banco de dados
      await prisma.user.delete({
        where: {
          id: userId,
        },
      });

      return "Usuário excluído com sucesso";
    } catch (error) {
      throw new Error(`Erro ao excluir o usuário: ${error.message}`);
    }
  }
}

export default new UserServices();
