import {
  forwardRef,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from "react";
import { useTheme } from "@mui/material/styles";

import Card, { type CardProps } from "@mui/material/Card";
import CardContent, { type CardContentProps } from "@mui/material/CardContent";
import CardHeader, { type CardHeaderProps } from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import type { KeyedObject } from "types/root";

const headerSX = {
  p: 2.5,
  "& .MuiCardHeader-action": { m: "0px auto", alignSelf: "center" },
};

export interface MainCardProps extends KeyedObject {
  border?: boolean;
  boxShadow?: boolean;
  children: ReactNode | string;
  subheader?: ReactNode | string;
  style?: CSSProperties;
  content?: boolean;
  contentSX?: CardContentProps["sx"];
  darkTitle?: boolean;
  divider?: boolean;
  sx?: CardProps["sx"];
  secondary?: CardHeaderProps["action"];
  shadow?: string;
  elevation?: number;
  title?: ReactNode | string;
  codeHighlight?: boolean;
  codeString?: string;
  modal?: boolean;
}

const MainCard = forwardRef(
  (
    {
      border = true,
      boxShadow,
      children,
      subheader,
      content = true,
      contentSX = {},
      darkTitle,
      divider = true,
      elevation,
      secondary,
      shadow,
      sx = {},
      title,
      codeHighlight = false,
      codeString,
      modal = false,
      ...others
    }: MainCardProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const theme = useTheme();
    boxShadow = theme.palette.mode === "dark" ? boxShadow ?? true : boxShadow;

    return (
      <Card
        elevation={elevation ?? 0}
        ref={ref}
        {...others}
        sx={{
          position: "relative",
          border: border ? "1px solid" : "none",
          borderRadius: 1,
          borderColor:
            theme.palette.mode === "dark"
              ? theme.palette.divider
              : theme.palette.grey.A800,
         
          ...(codeHighlight && {
            "& pre": {
              m: 0,
              p: "12px !important",
              fontFamily: theme.typography.fontFamily,
              fontSize: "0.75rem",
            },
          }),
          ...(modal && {
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: `calc( 100% - 50px)`, sm: "auto" },
            "& .MuiCardContent-root": {
              overflowY: "auto",
              minHeight: "auto",
              maxHeight: `calc(100vh - 200px)`,
            },
          }),
          ...sx,
        }}
      >
        
        {!darkTitle && title && (
          <CardHeader
            sx={headerSX}
            titleTypographyProps={{ variant: "subtitle1" }}
            title={title}
            action={secondary}
            subheader={subheader}
          />
        )}
        {darkTitle && title && (
          <CardHeader
            sx={headerSX}
            title={<Typography variant="h4">{title}</Typography>}
            action={secondary}
          />
        )}

        
        {title && divider && <Divider />}

        
        {content && <CardContent sx={contentSX}>{children}</CardContent>}
        {!content && children}
      </Card>
    );
  }
);

MainCard.displayName = "MainCard";
export default MainCard;
