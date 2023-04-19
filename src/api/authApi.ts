import axios from "axios";
import { settings } from "config";
import { LOGIN_API } from "./constants";
import type { LoginFormData } from "validators/auth.validators";
interface TokenResponse {
  access_token: string;
  refresh_token: string;
}
export const loginApi = async (data: LoginFormData) =>
  await axios.post<TokenResponse>(`${settings.apiBase}${LOGIN_API}`, {
    ...data,
    client: settings.authClientId,
  });
