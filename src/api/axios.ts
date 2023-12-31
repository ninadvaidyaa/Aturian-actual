import axios from "axios";
import { settings } from "config";
import { LOGIN_API, REFRESH_API } from "constants/api.constants";
import { useVanillaRefreshToken, userVanillaToken } from "hooks/useAuth";
// TODO: test interceptors
interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

const api = axios.create({
  baseURL: settings.apiBase,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const { token } = userVanillaToken();
  if (token !== "") {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;
    const { tokenRefresh, setTokenRefresh } = useVanillaRefreshToken();
    const { setToken } = userVanillaToken();

    if (originalConfig.url !== LOGIN_API && err.response) {
      // Access Token has expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await axios.post<TokenResponse>(
            `${settings.apiBase}${REFRESH_API}`,
            {},
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenRefresh}`,
              },
            }
          );

          // eslint-disable-next-line @typescript-eslint/naming-convention
          const { access_token, refresh_token } = rs.data;
          setTokenRefresh(refresh_token);
          setToken(access_token);

          return await api(originalConfig);
        } catch (_error) {
          setTokenRefresh(null);
          return await Promise.reject(_error);
        }
      }
    }
    /* eslint-disable */
    return Promise.reject(err);
  }
);

export default api;
