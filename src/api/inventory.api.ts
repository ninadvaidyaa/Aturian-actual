import {
  type PickPackOthersList,
  type InventoryItemsList,
  type PickListInventory,
  type ReceivedOrder,
} from "validators/inventory.validators";
import api from "./axios";
import {
  INVENTORY_ITEMS_GET_ALL_API,
  PICK_PACK_OTHERS_GET_ALL_API,
  INVENTORY_GET_PICKPACK_LIST_API,
  RECEIVED_ORDERS_GET_ALL_API,
} from "constants/api.constants";

export const fetchAllInventoryItems = async (
  offset: number = 0,
  limit: number = 50,
  q: string = ""
) => {
  const resp = await api.get<{ data: InventoryItemsList[]; total: number }>(
    `${INVENTORY_ITEMS_GET_ALL_API}?offset=${offset}&limit=${limit}${
      q ? `&${q}` : ""
    }`
  );
  return resp.data;
};

export const fetchAllPickPackOthers = async (
  offset: number = 0,
  limit: number = 50,
  q: string = ""
) => {
  const resp = await api.get<{ data: PickPackOthersList[]; total: number }>(
    `${PICK_PACK_OTHERS_GET_ALL_API}?offset=${offset}&limit=${limit}${
      q ? `&${q}` : ""
    }`
  );
  return resp.data;
};

export const fetchPickListInventory = async (
  offset: number = 0,
  limit: number = 50,
  q: string = ""
) => {
  const resp = await api.get<{ data: PickListInventory[]; results: number }>(
    `${INVENTORY_GET_PICKPACK_LIST_API}?offset=${offset}&limit=${limit}${
      q ? `&${q}` : ""
    }`
  );
  return resp.data;
};


export const fetchALLReceivedOrders = async (
  offset: number = 0,
  limit: number = 50,
  q: string = ""
) => {
  const resp = await api.get<{ data: ReceivedOrder[]; results: number }>(
    `${RECEIVED_ORDERS_GET_ALL_API}?offset=${offset}&limit=${limit}${
      q ? `&${q}` : ""
    }`
  );
  return resp.data;
};
