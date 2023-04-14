export type ThemeDirection = 'ltr' | 'rtl';
export type ThemeMode = 'light' | 'dark';
export type MenuOrientation = 'vertical' | 'horizontal';

export type FontFamily = `'Inter', sans-serif` | `'Poppins', sans-serif` | `'Roboto', sans-serif` | `'Public Sans', sans-serif`;
export type PresetColor = 'default' | 'theme1';
export type I18n = 'en' | 'fr'; // 'en' - English, 'fr' - French

export const LAYOUT_CONST = {
  VERTICAL_LAYOUT: 'vertical',
  HORIZONTAL_LAYOUT: 'horizontal'
};

export interface CustomizationActionProps {
  type: string;
  payload?: CustomizationProps;
}

export interface DefaultConfigProps {
  /**
   * The props used for the theme font-style.
   * We provide static below options -
   * `'Inter', sans-serif`
   * `'Poppins', sans-serif`
   * `'Roboto', sans-serif`
   * `'Public Sans', sans-serif` (default)
   */
  fontFamily: FontFamily;

  /**
   * The props used for display menu-items with multi-language.
   * We provide static below languages according to 'react-intl' options - https://www.npmjs.com/package/react-intl
   * 'en' (default)
   * 'fr'
   */
  i18n: I18n;

  /**
   * the props used for menu orientation (different theme layout).
   * we provide static below options -
   * 'vertical' (default)
   * 'horizontal'
   */
  menuOrientation: MenuOrientation;

  /**
   * the props used for show mini variant drawer
   * the mini variant is recommended for apps sections that need quick selection access alongside content.
   * default - false
   */
  miniDrawer: boolean;

  /**
   * the props used for theme container.
   * the container centers your content horizontally. It's the most basic layout element.
   * default - true which show container
   * false - will show fluid
   */
  container: boolean;

  /**
   * the props used for default theme palette mode
   * explore the default theme
   * below theme options -
   * 'light' (default)
   * 'dark'
   */
  mode: ThemeMode;

  /**
   * the props used for theme primary color variants
   * we provide static below options those are already defined in src/themes/theme -
   * 'default'
   * 'theme1'
   */
  presetColor: PresetColor;

  /**
   * the props used for default theme direction
   * explore the default theme
   * below theme options -
   * 'ltr' (default)
   * 'rtl'
   */
  themeDirection: ThemeDirection;
}

export interface CustomizationProps {
  fontFamily: FontFamily;
  i18n: I18n;
  miniDrawer: boolean;
  container: boolean;
  menuOrientation: MenuOrientation;
  mode: ThemeMode;
  presetColor: PresetColor;
  themeDirection: ThemeDirection;
  onChangeContainer: VoidFunction;
  onChangeLocalization: (lang: I18n) => void;
  onChangeMode: (mode: ThemeMode) => void;
  onChangePresetColor: (theme: PresetColor) => void;
  onChangeDirection: (direction: ThemeDirection) => void;
  onChangeMiniDrawer: (miniDrawer: boolean) => void;
  onChangeMenuOrientation: (menuOrientation: MenuOrientation) => void;
  onChangeFontFamily: (fontFamily: FontFamily) => void;
}
