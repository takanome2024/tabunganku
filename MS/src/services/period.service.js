import api from "./api/axios";


export const getPeriods = async () => {

  const response =
    await api.get("/periods");


  return response.data;

};




export const createPeriod = async (
  payload
) => {

  const response =
    await api.post(
      "/periods",
      payload
    );


  return response.data;

};




export const updatePeriod = async (
  id,
  payload
) => {

  const response =
    await api.put(
      `/periods/${id}`,
      payload
    );


  return response.data;

};




export const deletePeriod = async (
  id
) => {

  const response =
    await api.delete(
      `/periods/${id}`
    );


  return response.data;

};