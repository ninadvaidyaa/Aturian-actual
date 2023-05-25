import { lighten } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import { fetchAllStatus } from "api/settings.api";
import React, { useMemo } from "react";

const StatusCellComponent = ({
  label,
  color,
  info,
  ...props
}: {
  color: string;
  label: string;
  info: any;
}) => {
  const { data } = useQuery(["status"], fetchAllStatus);
  const value = info.getValue();
  const status = useMemo(
    () => data?.data.find((item) => item.name === value),
    []
  );
  return (
    <span
      className="text-md rounded-md px-1.5 py-1 font-medium"
      style={{
        color: status?.color,
        backgroundColor: lighten(status?.color ?? "#f9fafb", 0.9),
      }}
    >
      {status?.name}
    </span>
  );
};
const genericMemo: <T>(component: T) => T = React.memo;

const StatusCell = genericMemo(StatusCellComponent);
export default StatusCell;
