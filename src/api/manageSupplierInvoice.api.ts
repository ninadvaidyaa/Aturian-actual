import api from "./axios";
import { MANAGE_SUPPLIER_INVOICES_GET_ALL_API } from "constants/api.constants";

import { type ManageSupplierInvoiceList } from "validators/manageSupplierInvoice.validator";

export const fetchAllManageSupplierInvoice = async (
  offset: number = 0,
  limit: number = 50,
  q: string = ""
) => {
  const resp = await api.get<{
    data: ManageSupplierInvoiceList[];
    total: number;
  }>(
    `${MANAGE_SUPPLIER_INVOICES_GET_ALL_API}?offset=${offset}&limit=${limit}${
      q ? `&${q}` : ""
    }`
  );
  return resp.data;
};
