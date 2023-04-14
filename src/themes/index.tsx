import { type ReactNode, useMemo } from "react";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import type {
  ThemeOptions,
  Theme,
  TypographyVariantsOptions,
} from "@mui/material/styles";
import useConfig from "hooks/useConfig";
import Palette from "./palette";
import Typography from "./typography";
import CustomShadows from "./shadows";
import componentsOverride from "./overrides";

import { type CustomShadowProps } from "types/theme";

interface ThemeCustomizationProps {
  children: ReactNode;
}

export default function ThemeProvider({
  children,
}: ThemeCustomizationProps) {
  const { themeDirection, mode, presetColor, fontFamily } = useConfig();

  const theme: Theme = useMemo<Theme>(
    () => Palette(mode, presetColor),
    [mode, presetColor]
  );

  const themeTypography: TypographyVariantsOptions =
    useMemo<TypographyVariantsOptions>(
      () => Typography(mode, fontFamily, theme),
      [mode, fontFamily]
    );
  const themeCustomShadows: CustomShadowProps = useMemo<CustomShadowProps>(
    () => CustomShadows(theme),
    [theme]
  );

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1440,
        },
      },
      direction: themeDirection,
      mixins: {
        toolbar: {
          minHeight: 60,
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
      palette: theme.palette,
      customShadows: themeCustomShadows,
      typography: themeTypography,
    }),
    [themeDirection, theme, themeTypography, themeCustomShadows]
  );

  const themes: Theme = createTheme(themeOptions);
  themes.components = componentsOverride(themes);

  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </StyledEngineProvider>
  );
}
