import prisma from "../config/prisma.js";


const createError = (
  message,
  status = 400
) => {

  const err = new Error(message);

  err.status = status;

  return err;

};





export const getAll = async () => {

  return prisma.period.findMany({

    orderBy: {

      periodCode: "desc",

    },

  });

};







export const create = async (body) => {


  const {
    periodCode,
    label,
    status = "DRAFT",
  } = body;




  if (!periodCode) {

    throw createError(
      "Period Code wajib diisi"
    );

  }




  if (!label) {

    throw createError(
      "Label wajib diisi"
    );

  }




  const existing =
    await prisma.period.findUnique({

      where: {
        periodCode,
      },

    });




  if (existing) {

    throw createError(
      "Period Code sudah digunakan",
      409
    );

  }





  return prisma.period.create({

    data: {

      periodCode,

      label,

      status,

    },

  });


};









export const update = async (
  id,
  body
) => {


  const {
    periodCode,
    label,
    status,
  } = body;




  const period =
    await prisma.period.findUnique({

      where: {
        id: Number(id),
      },

    });




  if (!period) {

    throw createError(
      "Period tidak ditemukan",
      404
    );

  }





  return prisma.period.update({

    where: {

      id: Number(id),

    },


    data: {

      periodCode,

      label,

      status,

    },


  });


};









export const remove = async (
  id
) => {


  const period =
    await prisma.period.findUnique({

      where: {
        id: Number(id),
      },

    });




  if (!period) {

    throw createError(
      "Period tidak ditemukan",
      404
    );

  }





  const transaction =
    await prisma.transaction.count({

      where: {

        periodId: Number(id),

      },

    });




  if (transaction > 0) {

    throw createError(
      "Period tidak bisa dihapus karena sudah memiliki transaksi",
      400
    );

  }





  await prisma.period.delete({

    where: {

      id: Number(id),

    },

  });



  return true;


};