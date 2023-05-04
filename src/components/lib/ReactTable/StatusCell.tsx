import { lighten } from "@mui/material/styles";
import React from "react";

const StatusCellComponent = ({
  label,
  color,
  ...props
}: {
  color: string;
  label: string;
}) => (
  <span
    className="text-md font-medium px-1.5 py-1 rounded-sm"
    style={{ color, backgroundColor: lighten(color, 0.9) }}
  >
    {label}
  </span>
);
const genericMemo: <T>(component: T) => T = React.memo;

const StatusCell = genericMemo(StatusCellComponent);
export default StatusCell;
