import { prisma } from "../database";
import bcrypt from "bcryptjs";
import { generateRandomHash } from "../../helper/generateRandom";

type Admin = {
  id: number | null;
  name: string;
  cpf: string;
  hash: string;
};

class AdminServices {
  async create(admin: Admin) {
    try {
      // Gere a hash de acesso com 8 dígitos
      const hashAcesso = await generateRandomHash(8);

      // Criptografe a hash de acesso antes de armazená-la no banco de dados
      const hashedHashAcesso = await bcrypt.hash(hashAcesso, 10);

      // Crie o usuário no banco de dados com nome, CPF e a hash criptografada
      const data = await prisma.admin.create({
        data: {
          name: admin.name,
          cpf: admin.cpf,
          hash: hashedHashAcesso, // Armazene a hash criptografada no banco de dados
        },
      });

      data.hash = hashAcesso;

      return data;
    } catch (error) {
      console.error("Erro ao criar o administrador:", error);
    }
  }

  async updateHashByCPF(cpf: string) {
    try {
      // Verifique se o administrador com o CPF fornecido existe
      const admin = await prisma.admin.findFirst({
        where: {
          cpf: {
            equals: cpf,
          },
        },
      });

      if (!admin) {
        throw new Error(`Administrador com o CPF ${cpf} não encontrado.`);
      }

      // Gere uma nova hash de acesso com 8 dígitos
      const newHashAcesso = await generateRandomHash(8);

      // Criptografe a nova hash de acesso
      const hashedNewHashAcesso = await bcrypt.hash(newHashAcesso, 10);

      // Atualize a hash de acesso no banco de dados
      const update = await prisma.admin.update({
        where: {
          id: admin.id,
        },
        data: {
          hash: hashedNewHashAcesso,
        },
      });

      update.hash = newHashAcesso;

      console.log(
        `Hash de acesso atualizada para o administrador com CPF ${cpf}`
      );

      // Retorne a nova hash de acesso
      return update;
    } catch (error) {
      console.error("Erro ao atualizar a hash de acesso:", error);
      throw error; // Lembre-se de lançar o erro para lidar com ele em outros lugares, se necessário
    }
  }
}

export default new AdminServices();
