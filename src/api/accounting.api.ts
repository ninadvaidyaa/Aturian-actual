
import { type MultiGLDetails, type GLDetails, type TrailBalance } from "validators/accounting.displayGLDetails.validators";
import api from "./axios";
import { ACCOUNTING_GET_GL_DETAILS_API, MULTI_GET_GL_LINE_API, SINGLE_GET_GL_LINE_API, TRIAL_BALANCE_GET_ALL_API } from "constants/api.constants";


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


  export const fetchMultiGLLines = async (
    offset: number = 0,
    limit: number = 50,
    q: string = ""
  ) => {
    const resp = await api.get<{ data: MultiGLDetails[]; results: number }>(
      `${MULTI_GET_GL_LINE_API}?offset=${offset}&limit=${limit}${
        q ? `&${q}` : ""
      }`
    );
    return resp.data;
  };

  export const fetchAllTrialBalance = async (
    offset: number = 0,
    limit: number = 50,
    q: string = ""
  ) => {
    const resp = await api.get<{ data: TrailBalance[]; results: number }>(
      `${TRIAL_BALANCE_GET_ALL_API}?offset=${offset}&limit=${limit}${
        q ? `&${q}` : ""
      }`
    );
    return resp.data;
  };
