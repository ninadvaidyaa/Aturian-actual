import { type Theme } from "@mui/material/styles";

export default function TableRow(theme: Theme) {
  return {
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-of-type': {
            '& .MuiTableCell-root': {
              borderBottom: 'none'
            }
          },
          '& .MuiTableCell-root': {
            '&:last-of-type': {
              paddingRight: 24
            },
            '&:first-of-type': {
              paddingLeft: 24
            }
          },
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.grey[200],
          },
        }
      }
    }
  };
}
