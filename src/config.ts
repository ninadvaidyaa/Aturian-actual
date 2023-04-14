import type { DefaultConfigProps } from 'types/config';
export const HORIZONTAL_MAX_ITEM = 6;
export const DRAWER_WIDTH = 260;
const config: DefaultConfigProps = {
  fontFamily: `'Public Sans', sans-serif`,
  i18n: 'en',
  menuOrientation: 'vertical',
  miniDrawer: false,
  container: true,
  mode: 'light',
  presetColor: 'default',
  themeDirection: 'ltr'
};

export default config;
