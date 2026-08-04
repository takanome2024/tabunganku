import prisma from "../config/prisma.js";


export const summary = async (
  userId
) => {


  const [
    deposit,
    withdraw,
    totalTransaction,
    latestTransactions,
  ] = await Promise.all([


    prisma.transaction.aggregate({

      where: {
        userId,
        transactionType: "DEPOSIT",
      },

      _sum: {
        amount: true,
      },

    }),




    prisma.transaction.aggregate({

      where: {
        userId,
        transactionType: "WITHDRAW",
      },

      _sum: {
        amount: true,
      },

    }),




    prisma.transaction.count({

      where: {
        userId,
      },

    }),





    prisma.transaction.findMany({

      where: {
        userId,
      },


      include: {
        period: true,
      },


      orderBy: {
        createdAt: "desc",
      },


      take: 5,

    }),


  ]);





  const totalDeposit =
    Number(
      deposit._sum.amount || 0
    );



  const totalWithdraw =
    Number(
      withdraw._sum.amount || 0
    );





  return {


    totalDeposit,


    totalWithdraw,


    balance:
      totalDeposit -
      totalWithdraw,



    totalTransaction,



    latestTransactions:

      latestTransactions.map(
        (item) => ({

          id: item.id,

          transactionType:
            item.transactionType,


          amount:
            Number(item.amount),


          remarks:
            item.remarks,


          period:
            item.period?.label || "-",


          createdAt:
            item.createdAt,


        })
      ),


  };


};