// eslint-disable-next-line
import * as Theme from '@mui/material/styles';
import type{ CustomShadowProps } from 'types/theme';
declare module '@mui/material/styles' {
  interface Theme {
    customShadows: CustomShadowProps;
  }
}
