"use server ";

import api from "~/app/api/recipes/api";

export const getMyPrograms = async (userId) => {
  const result = await api.get(`/program/${userId}`);

  // console.log("addIngredient", result.data);
  const { response, data } = result.data;
  return result.data.result;
};
