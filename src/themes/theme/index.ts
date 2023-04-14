import Default from './default';
import Theme1 from './theme1';

import type{ PaletteThemeProps } from 'types/theme';
import type{ PalettesProps } from '@ant-design/colors';
import type{ ThemeMode, PresetColor } from 'types/config';

const Theme = (colors: PalettesProps, presetColor: PresetColor, mode: ThemeMode): PaletteThemeProps => {
  switch (presetColor) {
    case 'theme1':
      return Theme1(colors, mode);
    default:
      return Default(colors);
  }
};

export default Theme;
