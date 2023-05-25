import { type SupplierList } from "validators/supplier.validators";
import api from "./axios";
import { SUPPLIERS_GET_ALL_API } from "constants/api.constants";

export const fetchAllSuppliers = async (
  offset: number = 0,
  limit: number = 50,
  q: string = ""
) => {
  const resp = await api.get<{ data: SupplierList[]; results: number }>(
    `${SUPPLIERS_GET_ALL_API}?offset=${offset}&limit=${limit}${
      q ? `&${q}` : ""
    }`
  );
  return resp.data;
};
