import { prisma } from "../database";

class UserPresentServices {
  async associatePresentToUser(userId: number, presentId: number) {
    // Atualize o campo isSelected para true no presente escolhido
    const updatedPresent = await prisma.present.update({
      where: {
        id: presentId,
      },
      data: {
        isSelected: true,
      },
    });

    // Crie a associação entre o usuário e o presente na tabela intermediária 'userPresent'
    const userPresent = await prisma.userPresent.create({
      data: {
        userId: userId,
        presentId: presentId,
      },
    });

    return userPresent; // Retorna o presente atualizado
  }

  async findPresentsByUserId(userId: number) {
    try {
      // Faça uma consulta que junta as tabelas UserPresent e Present
      const userPresents = await prisma.userPresent.findMany({
        where: {
          userId: userId,
        },
        include: {
          present: true,
          user: true // Isso fará a junção entre as tabelas UserPresent e Present
        },
      });
  
      return userPresents;
    } catch (error) {
      throw new Error(`Erro ao buscar presentes do usuário: ${error}`);
    }
  }

  async deleteAssociationUserPresent(userPresentID: number) {
    try {
      // Use o Prisma para excluir a associação com base no ID da associação
      const deletedUserPresent = await prisma.userPresent.delete({
        where: {
          id: userPresentID,
        },
        include: {
          present: false,
          user: false // Isso fará a junção entre as tabelas UserPresent e Present
        },
      });

      return deletedUserPresent; // Retorna os dados da associação excluída
    } catch (error) {
      throw new Error(
        `Erro ao excluir a associação do usuário com o presente: ${error}`
      );
    }
  }
}

export default new UserPresentServices();
