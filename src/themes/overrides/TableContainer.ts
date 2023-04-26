import { type Theme } from "@mui/material/styles";
export default function TableContainer(theme: Theme) {
  return {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          "&::-webkit-scrollbar": {
            width: "10px",
            height: "10px",
          },
          "&::-webkit-scrollbar-track": {
            WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.2)",
            background: theme.palette.secondary["300"],
            borderRadius: "100vw",
            marginTop: "80px",
            marginBottom: "10px",
          },

          "&::-webkit-scrollbar-thumb": {
            borderRadius: "100vw",
            backgroundColor: theme.palette.primary["400"],
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: theme.palette.primary.main,
          },
        },
      },
    },
  };
}
