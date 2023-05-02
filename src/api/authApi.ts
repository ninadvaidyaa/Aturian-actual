import axios from "axios";
import { settings } from "config";
import type { LoginFormData } from "validators/auth.validators";
import { LOGIN_API, REFRESH_API } from "constants/api.constants";
import api from "./axios";
interface TokenResponse {
  access_token: string;
  refresh_token: string;
}
export const loginApi = async (data: LoginFormData) =>
  await axios.post<TokenResponse>(`${settings.apiBase}${LOGIN_API}`, {
    ...data,
    client: settings.authClientId,
  });

export const refreshTokenApi = async (token: string) =>
  await api.post<TokenResponse>(
    `${REFRESH_API}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
