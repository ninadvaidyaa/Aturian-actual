import { type OrdersList } from "validators/orders.validators";
import api from "./axios";
import { ORDERS_GET_ALL_API } from "constants/api.constants";

export const fetchAllOrders = async (
  offset: number = 0,
  limit: number = 50,
  q: string = ""
) => {
  const resp = await api.get<{ data: OrdersList[]; results: number }>(
    `${ORDERS_GET_ALL_API}?offset=${offset}&limit=${limit}${q ? `&${q}` : ""}`
  );
  return resp.data;
};
