import prisma from "../config/prisma.js";


const createError = (message, status = 400) => {
  const err = new Error(message);
  err.status = status;
  return err;
};


const validateTransactionPayload = ({
  periodId,
  transactionType,
  amount,
}) => {

  if (!periodId) {
    throw createError("Period wajib dipilih.");
  }

  if (!transactionType) {
    throw createError("Transaction Type wajib dipilih.");
  }

  if (Number(amount) <= 0) {
    throw createError("Nominal harus lebih dari 0.");
  }
};


export const create = async (userId, body) => {

  const {
    periodId,
    transactionType,
    amount,
    remarks,
  } = body;


  validateTransactionPayload({
    periodId,
    transactionType,
    amount,
  });


  const period = await prisma.period.findUnique({
    where: {
      id: Number(periodId),
    },
  });


  if (!period) {
    throw createError(
      "Period tidak ditemukan.",
      404
    );
  }


  return prisma.transaction.create({
    data: {
      userId,
      periodId: Number(periodId),
      transactionType,
      amount: Number(amount),
      remarks,
    },

    include: {
      period: true,
      user: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },
    },
  });
};



export const getAll = async (
  userId,
  query = {}
) => {

  const {
    page = 1,
    limit = 10,
    periodId,
    transactionType,
    search,
  } = query;


  const currentPage = Math.max(
    Number(page),
    1
  );

  const perPage = Math.min(
    Math.max(Number(limit), 1),
    100
  );


  const where = {
    userId,
  };


  if (periodId) {
    where.periodId = Number(periodId);
  }


  if (
    transactionType &&
    transactionType !== "ALL"
  ) {
    where.transactionType = transactionType;
  }


  if (search) {
    where.remarks = {
      contains: search,
      mode: "insensitive",
    };
  }


  const skip =
    (currentPage - 1) * perPage;


  const [
    data,
    totalData
  ] = await Promise.all([

    prisma.transaction.findMany({
      where,

      include: {
        period: true,
      },

      orderBy: {
        createdAt: "desc",
      },

      skip,
      take: perPage,
    }),


    prisma.transaction.count({
      where,
    }),
  ]);



  return {

    data,

    pagination: {
      totalData,
      currentPage,
      limit: perPage,
      totalPages:
        Math.ceil(totalData / perPage),
    },

  };
};




export const getById = async (
  id,
  userId
) => {

  const transaction =
    await prisma.transaction.findFirst({

      where: {
        id: Number(id),
        userId,
      },


      include: {
        period: true,
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
          },
        },
      },

    });


  if (!transaction) {
    throw createError(
      "Transaction tidak ditemukan.",
      404
    );
  }


  return transaction;
};





export const updateTransaction = async (
  id,
  userId,
  body
) => {


  const {
    periodId,
    transactionType,
    amount,
    remarks,
  } = body;



  const transaction =
    await prisma.transaction.findFirst({

      where: {
        id: Number(id),
        userId,
      },

    });



  if (!transaction) {
    throw createError(
      "Transaction tidak ditemukan.",
      404
    );
  }



  validateTransactionPayload({
    periodId,
    transactionType,
    amount,
  });



  const period =
    await prisma.period.findUnique({

      where: {
        id: Number(periodId),
      },

    });



  if (!period) {
    throw createError(
      "Period tidak ditemukan.",
      404
    );
  }




  return prisma.transaction.update({

    where: {
      id: Number(id),
    },


    data: {
      periodId: Number(periodId),
      transactionType,
      amount: Number(amount),
      remarks,
    },


    include: {
      period: true,
      user: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },
    },

  });

};





export const remove = async (
  id,
  userId
) => {


  const transaction =
    await prisma.transaction.findFirst({

      where: {
        id: Number(id),
        userId,
      },

    });



  if (!transaction) {
    throw createError(
      "Transaction tidak ditemukan.",
      404
    );
  }



  await prisma.transaction.delete({

    where: {
      id: Number(id),
    },

  });



  return true;
};