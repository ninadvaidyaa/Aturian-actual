import { styled } from "@mui/material/styles";

const ScrollX = styled("div")(({ theme }) => ({
  width: "100%",
  overflow: "auto",
  display: "block",
  "&::-webkit-scrollbar": {
    width: "10px",
    height: "10px",
  },
  "&::-webkit-scrollbar-track": {
    WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.2)",
    background: theme.palette.grey["200"],
    borderRadius: "100vw",
    margin: "8px",
  },

  "&::-webkit-scrollbar-thumb": {
    borderRadius: "100vw",
    backgroundColor: theme.palette.grey["400"],
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: theme.palette.grey["400"],
  },
}));

export default ScrollX;
