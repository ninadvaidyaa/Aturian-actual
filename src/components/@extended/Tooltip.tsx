import { styled, useTheme, type Theme } from "@mui/material/styles";
import {
  Box,
  tooltipClasses,
  Tooltip as MuiTooltip,
  type TooltipProps,
} from "@mui/material";

import getColors from "utils/getColors";

import { type ColorProps } from "types/extended";

// ==============================|| TOOLTIP - VARIANT ||============================== //

interface TooltipStyleProps {
  color?: ColorProps | string;
  labelColor?: ColorProps | string;
  theme: Theme;
}

function getVariantStyle({ color, theme, labelColor }: TooltipStyleProps) {
  const colors = getColors(theme, color as ColorProps);
  const { main, contrastText } = colors;
  const colorValue = color ?? "";

  if (
    ["primary", "secondary", "info", "success", "warning", "error"].includes(
      colorValue
    )
  ) {
    return {
      [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: main,
        color: labelColor ?? contrastText,
      },
      [`& .${tooltipClasses.arrow}`]: {
        color: main,
      },
    };
  } else {
    return {
      [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: colorValue,
        color: labelColor ?? contrastText,
        boxShadow: theme.shadows[1],
      },
      [`& .${tooltipClasses.arrow}`]: {
        color: colorValue,
      },
    };
  }
}

// ==============================|| STYLED - TOOLTIP COLOR ||============================== //

interface StyleProps {
  theme: Theme;
  arrow: TooltipProps["arrow"];
  labelColor?: ColorProps | string;
  color?: ColorProps | string;
}

const TooltipStyle = styled(
  ({ className, ...props }: TooltipProps) => (
    <MuiTooltip
      {...props}
      classes={{ popper: className }}
    />
  ),
  {
    shouldForwardProp: (prop) => prop !== "color" && prop !== "labelColor",
  }
)(({ theme, color, labelColor }: StyleProps) => ({
  ...(color && getVariantStyle({ color, theme, labelColor })),
}));

// ==============================|| EXTENDED - TOOLTIP ||============================== //

interface Props extends TooltipProps {
  color?: ColorProps | string;
  labelColor?: ColorProps | string;
  children: TooltipProps["children"];
}

export default function CustomTooltip({
  children,
  arrow,
  labelColor = "",
  ...rest
}: Props) {
  const theme = useTheme();
  return (
    <Box display="flex">
      <TooltipStyle
        arrow={arrow}
        {...rest}
        theme={theme}
        labelColor={labelColor}
      >
        {children}
      </TooltipStyle>
    </Box>
  );
}
