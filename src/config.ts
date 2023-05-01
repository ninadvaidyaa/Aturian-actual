import type { DefaultConfigProps } from "types/config";
import { z } from "zod";

export const HORIZONTAL_MAX_ITEM = 6;
export const DRAWER_WIDTH = 260;
const config: DefaultConfigProps = {
  fontFamily: `'Public Sans', sans-serif`,
  i18n: "en",
  menuOrientation: "vertical",
  miniDrawer: false,
  container: true,
  mode: "light",
  presetColor: "default",
  themeDirection: "ltr",
};

const settingsSchema = z.object({
  VITE_BASE_URL: z.string({ description: "Base URI for backend api" }),
  MODE: z.string({ description: "The mode the app is running in" }),
  VITE_AUTH_CLIENT_ID: z.string({ description: "Authentication client id" }),
  VITE_API_ENV: z.string({ description: "Backend environment used in api" }),
});

const result = settingsSchema.safeParse(import.meta.env);
if (!result.success) {
  console.error(result.error);
  throw new Error(`${result.error.errors.join(" ")}`);
}
export const settings = {
  apiBase: result.data.VITE_BASE_URL,
  mode: result.data.MODE,
  authClientId: result.data.VITE_AUTH_CLIENT_ID,
  apiEnv: result.data.VITE_API_ENV,
};
export default config;
