import { styled, lighten } from "@mui/material/styles";
import React from "react";

const StyledDiv = styled("div")(({ theme }) => ({
  position: "relative",
  height: theme.spacing(3),
  padding: "0px",
  maxWidth: "100%",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  whiteSpace: "nowrap",
  transition:
    "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  outline: 0,
  textDecoration: "none",
  border: 0,
  borderRadius: theme.spacing(0.5),
  verticalAlign: "middle",
  fontSize: "0.8125rem",
  "& span": {
    overflow: "hidden",
    textOverflow: "ellipsis",
    paddingInline: theme.spacing(1),
    whiteSpace: "nowrap",
  },
}));

const StatusCellComponent = ({
  label,
  color,
  ...props
}: {
  color: string;
  label: string;
}) => (
  <StyledDiv
    {...props}
    sx={{ color, backgroundColor: lighten(color, 0.9) }}
  >
    <span>{label}</span>
  </StyledDiv>
);
const genericMemo: <T>(component: T) => T = React.memo;

const StatusCell = genericMemo(StatusCellComponent);
export default StatusCell;
