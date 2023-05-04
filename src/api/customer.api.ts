import { type CustomerList } from "validators/customer.validators";
import api from "./axios";
import { CUSTOMER_GET_ALL_API } from "constants/api.constants";

export const fetchAllCustomers = async (
  offset: number = 0,
  limit: number = 50,
  q: string = ""
) => {
  const resp = await api.get<{ data: CustomerList[]; total: number }>(
    `${CUSTOMER_GET_ALL_API}?offset=${offset}&limit=${limit}${
      q ? `&${q}` : ""
    }`
  );
  return resp.data;
};

