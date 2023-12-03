import { prisma } from "../database";
import { UserModel } from "../models/User";

type PresentType = {
  id: number;
  name: string;
  urlImg: string;
  link: string;
  price: number;
  isSelected: boolean;
  user: UserModel | null;
};

class PresentServices {
  async findAll(isSelected?: boolean) {
    if (isSelected === null) {
      // Se isSelected não foi fornecido, retorne todos os registros
      return await prisma.present.findMany({
        orderBy: {
          price: 'asc'
        },
      });
    } else {
      // Se isSelected foi fornecido, filtre pelos registros correspondentes
      return await prisma.present.findMany({
        where: {
          isSelected,
        },
        orderBy: {
          price: 'asc'
        },
      });
    }
  }
  
  async create(present: Object) {
    const { id, isSelected, link, name, price, urlImg } =
      present as PresentType;

    const data = await prisma.present.create({
      data: {
        id,
        isSelected,
        link,
        name,
        price,
        urlImg,
      },
    });

    return data;
  }

  async updatePresent(present: Object) {
    const {
      name,
      urlImg,
      link,
      price,
      isSelected,
      id
     } = present as PresentType;

    try {
      const updatedPresent = await prisma.present.update({
        where: {
          id: id,
        },
        data: {
          isSelected,
          link,
          name,
          price,
          urlImg,
        },
      });
      return updatedPresent;
    } catch (error) {
      throw new Error(`Erro ao atualizar o presente: ${error}`);
    }
  }

  async deletePresentById(presentId: number) {
    try {
      const deletedPresent = await prisma.present.delete({
        where: {
          id: presentId,
        },
      });
      return deletedPresent;
    } catch (error) {
      throw new Error(`Erro ao excluir o presente: ${error}`);
    }
  }
}

export default new PresentServices();
