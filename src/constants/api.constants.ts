import { settings } from "config";

export const LOGIN_API = "/auth/login";
export const REFRESH_API = "/auth/refresh";
export const ORDERS_GET_ALL_API = `/${settings.apiEnv}/orders`;
export const CUSTOMER_GET_ALL_API = `/${settings.apiEnv}/customers`;