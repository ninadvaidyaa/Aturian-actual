
import { type PickPackOthersList } from "validators/inventory.validators";
import api from "./axios";
import { PICK_PACK_OTHERS_GET_ALL_API } from "constants/api.constants";



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

