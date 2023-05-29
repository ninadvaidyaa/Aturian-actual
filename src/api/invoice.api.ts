import api from "./axios";
import {
  MANAGE_CUSTOMER_INVOICE_GET_ALL_API,
  MANAGE_PREBILLS_GET_ALL_API,
} from "constants/api.constants";
import {
  type ManageCustInvoiceList,
  type ManagePrebillsList,
} from "validators/invoicing.validator";

export const fetchAllPrebillsItems = async (
  offset: number = 0,
  limit: number = 50,
  q: string = ""
) => {
  const resp = await api.get<{ data: ManagePrebillsList[]; total: number }>(
    `${MANAGE_PREBILLS_GET_ALL_API}?offset=${offset}&limit=${limit}${
      q ? `&${q}` : ""
    }`
  );
  return resp.data;
};

export const fetchAllCustInvoiceItems = async (
  offset: number = 0,
  limit: number = 50,
  q: string = ""
) => {
  const resp = await api.get<{ data: ManageCustInvoiceList[]; total: number }>(
    `${MANAGE_CUSTOMER_INVOICE_GET_ALL_API}?offset=${offset}&limit=${limit}${
      q ? `&${q}` : ""
    }`
  );
  return resp.data;
};
