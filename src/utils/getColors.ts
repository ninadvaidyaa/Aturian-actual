import type { PaletteColor, Theme } from "@mui/material/styles";
import { type ColorProps } from "types/extended";

// ==============================|| CUSTOM FUNCTION - COLORS ||============================== //

const getColors = (theme: Theme, color?: ColorProps): PaletteColor => {
  switch (color) {
    case "secondary":
      return theme.palette.secondary;
    case "error":
      return theme.palette.error;
    case "warning":
      return theme.palette.warning;
    case "info":
      return theme.palette.info;
    case "success":
      return theme.palette.success;
    default:
      return theme.palette.primary;
  }
};

export default getColors;
