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
export const INVENTORY_GET_PICKPACK_LIST_API = `/${settings.apiEnv}/pickpacklist`;
export const ACCOUNTING_GET_GL_DETAILS_API = `/${settings.apiEnv}/getGLDetails`;
export const MANAGE_PREBILLS_GET_ALL_API = `/${settings.apiEnv}/manage_prebills`;

export const SINGLE_GET_GL_LINE_API = `/${settings.apiEnv}/getSingleGLlines`;

export const MULTI_GET_GL_LINE_API = `/${settings.apiEnv}/get_multi_GL_lines`;
export const TRIAL_BALANCE_GET_ALL_API = `/${settings.apiEnv}/get_trial_balance`;

export const MANAGE_CUSTOMER_INVOICE_GET_ALL_API = `/${settings.apiEnv}/manage_customers`;
