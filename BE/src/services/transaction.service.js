import prisma from "../config/prisma.js";

export const create = async (userId, body) => {
  const {
    periodId,
    transactionType,
    amount,
    remarks,
  } = body;

  if (!periodId) {
    throw new Error("Period wajib dipilih.");
  }

  if (!transactionType) {
    throw new Error("Transaction Type wajib dipilih.");
  }

  if (Number(amount) <= 0) {
    throw new Error("Nominal harus lebih dari 0.");
  }

  // Pastikan period ada
  const period = await prisma.period.findUnique({
    where: {
      id: Number(periodId),
    },
  });

  if (!period) {
    throw new Error("Period tidak ditemukan.");
  }

  const transaction = await prisma.transaction.create({
    data: {
      userId,
      periodId: Number(periodId),
      transactionType,
      amount,
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

  return transaction;
};
export const getAll = async (userId, query) => {

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  const skip = (page - 1) * limit;

  const where = {
    userId,
  };

  const totalData = await prisma.transaction.count({
    where,
  });

  const items = await prisma.transaction.findMany({
    where,

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

    orderBy: {
      createdAt: "desc",
    },

    skip,
    take: limit,
  });

  return {
    items,

    pagination: {
      page,
      limit,
      totalData,
      totalPage: Math.ceil(totalData / limit),
    },
  };
};

export const getById = async (id, userId) => {
  const transaction = await prisma.transaction.findFirst({
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
    const err = new Error("Transaction tidak ditemukan.");
err.status = 404;
throw err;
  }

  return transaction;
};

export const update = async (id, userId, body) => {
  const {
    periodId,
    transactionType,
    amount,
    remarks,
  } = body;

  const transaction = await prisma.transaction.findFirst({
    where: {
      id: Number(id),
      userId,
    },
  });

  if (!transaction) {
    throw new Error("Transaction tidak ditemukan.");
  }

  const period = await prisma.period.findUnique({
    where: {
      id: Number(periodId),
    },
  });

  if (!period) {
    const err = new Error("Period tidak ditemukan.");
err.status = 404;
throw err;
  }

  const updated = await prisma.transaction.update({
    where: {
      id: Number(id),
    },
    data: {
      periodId: Number(periodId),
      transactionType,
      amount,
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

  return updated;
};

export const remove = async (id, userId) => {

  const transaction = await prisma.transaction.findFirst({
    where: {
      id: Number(id),
      userId,
    },
  });

  if (!transaction) {
    throw new Error("Transaction tidak ditemukan.");
  }

  await prisma.transaction.delete({
    where: {
      id: Number(id),
    },
  });

  return true;
};