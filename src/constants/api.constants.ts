import { settings } from "config";

export const LOGIN_API = "/auth/login";
export const REFRESH_API = "/auth/refresh";
export const ORDERS_GET_ALL_API = `/${settings.apiEnv}/orders`;
export const CUSTOMER_GET_ALL_API = `/${settings.apiEnv}/customers`;
export const SETTINGS_GET_ALL_STATUS = `/${settings.apiEnv}/settings/statuses`;
export const SETTINGS_GET_ALL_FLAG = `/${settings.apiEnv}/settings/flags`;
export const INVENTORY_ITEMS_GET_ALL_API = `/${settings.apiEnv}/inventory_items`;
export const MANAGE_QUOTES_GET_ALL_API = `/${settings.apiEnv}/manage_quotes`;
export const MANAGE_PROPOSAL_GET_ALL_API = `/${settings.apiEnv}/manage_proposal`;
export const PICK_PACK_OTHERS_GET_ALL_API = `/${settings.apiEnv}/pick_pack_others`;
export const MANAGE_SUPPLIER_INVOICES_GET_ALL_API = `/${settings.apiEnv}/manage_supplier_invoices`;
export const SUPPLIERS_GET_ALL_API = `/${settings.apiEnv}/suppliers`;
export const MANAGE_PREBILLS_GET_ALL_API = `/${settings.apiEnv}/manage_prebills`;
export const INVENTORY_GET_PICKPACK_LIST_API = `/${settings.apiEnv}/pickpacklist`;
