import {
  ACCOUNTING_GET_GL_DETAILS_API,
  SINGLE_GET_GL_LINE_API,
} from "constants/api.constants";
import { type GLDetails } from "validators/accounting.validators";
import api from "./axios";

export const fetchGLDetails = async (
  offset: number = 0,
  limit: number = 50,
  q: string = ""
) => {
  const resp = await api.get<{ data: GLDetails[]; results: number }>(
    `${ACCOUNTING_GET_GL_DETAILS_API}?offset=${offset}&limit=${limit}${
      q ? `&${q}` : ""
    }`
  );
  return resp.data;
};

export const fetchSingleGLLines = async (
  offset: number = 0,
  limit: number = 50,
  q: string = ""
) => {
  const resp = await api.get<{ data: GLDetails[]; results: number }>(
    `${SINGLE_GET_GL_LINE_API}?offset=${offset}&limit=${limit}${
      q ? `&${q}` : ""
    }`
  );
  return resp.data;
};
