import { type Theme } from "@mui/material/styles";

export default function TableCell(theme: Theme) {
  const commonCell = {
    "&:not(:last-of-type)": {
      position: "relative",
      "&:after": {
        position: "absolute",
        content: '""',
        backgroundColor: theme.palette.divider,
        width: 1,
        height: "calc(100% - 30px)",
        right: 0,
        top: 16,
      },
    },
  };

  return {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          padding: 6,
          borderColor: theme.palette.divider,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          minWidth: "6ch",
          position: "relative",
        },
        sizeSmall: {
          padding: 4,
        },
        head: {
          fontSize: "0.75rem",
          fontWeight: 700,
          textTransform: "capitalize",
          ...commonCell,
        },
        footer: {
          fontSize: "0.75rem",
          textTransform: "uppercase",
          // ...commonCell,
        },
      },
    },
  };
}
