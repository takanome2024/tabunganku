import api from "./api/axios";


export const getTransactions = async (
  params = {}
) => {

  const response = await api.get(
    "/transactions",
    {
      params: {
        page: params.page || 1,
        limit: params.limit || 5,
        periodId: params.periodId || undefined,
        transactionType:
          params.transactionType || undefined,
        search:
          params.search || undefined,
      },
    }
  );

  return response.data;
};



export const getTransactionById = async (
  id
) => {

  const response = await api.get(
    `/transactions/${id}`
  );

  return response.data;
};



export const createTransaction = async (
  payload
) => {

  const response = await api.post(
    "/transactions",
    payload
  );

  return response.data;
};



export const updateTransaction = async (
  id,
  payload
) => {

  const response = await api.put(
    `/transactions/${id}`,
    payload
  );

  return response.data;
};



export const deleteTransaction = async (
  id
) => {

  const response = await api.delete(
    `/transactions/${id}`
  );

  return response.data;
};