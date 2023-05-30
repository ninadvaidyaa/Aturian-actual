import type { OrderPO, OrdersList } from "validators/orders.validators";
import api from "./axios";
import {
  ORDERS_GET_ALL_API,
  ORDERS_GET_PO_LIST,
} from "constants/api.constants";

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

export const fetchOrderSupplierPO = async (
  offset: number = 0,
  limit: number = 50,
  q: string = ""
) => {
  const resp = await api.get<{ data: OrderPO[]; results: number }>(
    `${ORDERS_GET_PO_LIST}?offset=${offset}&limit=${limit}${q ? `&${q}` : ""}`
  );
  return resp.data;
};
