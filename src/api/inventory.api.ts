import { type PickPackOthersList, type InventoryItemsList } from "validators/inventory.validators";
import api from "./axios";
import { INVENTORY_ITEMS_GET_ALL_API, PICK_PACK_OTHERS_GET_ALL_API } from "constants/api.constants";

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

