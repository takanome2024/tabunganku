import api from "./api/axios";

export const getTransactions = async () => {
  const response = await api.get("/transactions");
  return response.data;
};

export const createTransaction = async (payload) => {
  const response = await api.post("/transactions", payload);
  return response.data;
};

export const updateTransaction = async (id, payload) => {
  const response = await api.put(`/transactions/${id}`, payload);
  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = await api.delete(`/transactions/${id}`);
  return response.data;
};