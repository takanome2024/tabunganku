import prisma from "../config/prisma.js";

export const summary = async (userId) => {

  const deposit = await prisma.transaction.aggregate({
    where: {
      userId,
      transactionType: "DEPOSIT",
    },
    _sum: {
      amount: true,
    },
  });

  const withdraw = await prisma.transaction.aggregate({
    where: {
      userId,
      transactionType: "WITHDRAW",
    },
    _sum: {
      amount: true,
    },
  });

  const totalDeposit = Number(deposit._sum.amount || 0);
  const totalWithdraw = Number(withdraw._sum.amount || 0);

  return {
    totalDeposit,
    totalWithdraw,
    balance: totalDeposit - totalWithdraw,
  };
};