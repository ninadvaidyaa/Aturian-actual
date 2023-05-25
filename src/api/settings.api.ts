import api from "./axios";
import {
  SETTINGS_GET_ALL_FLAG,
  SETTINGS_GET_ALL_STATUS,
} from "constants/api.constants";
import { type Flag, type Status } from "validators/settings.validators";

export const fetchAllStatus = async () => {
  const resp = await api.get<{ data: Status[]; results: number }>(
    `${SETTINGS_GET_ALL_STATUS}`
  );
  return resp.data;
};

export const fetchAllFlags = async () => {
  const resp = await api.get<{ data: Flag[]; results: number }>(
    `${SETTINGS_GET_ALL_FLAG}`
  );
  return resp.data;
};
