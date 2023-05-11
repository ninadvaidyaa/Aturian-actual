import React, { useMemo } from "react";
import type { CellContext } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { fetchAllFlags } from "api/settings.api";
import { type FlagData, type Flag } from "validators/settings.validators";

const genericMemo: <T>(component: T) => T = React.memo;

interface RowActionsProps<TData, P> {
  info: CellContext<TData, P>;
}

const getFlagElements = (flagData: FlagData[], flags: Flag[]) =>
  flagData.map((flag) => {
    const flagInfo = flags.find((item) => item.id === flag.id);
    if (flagInfo) {
      const status = flagInfo.statuses.find(
        (item) => item.id === flag.status.id
      );
      return {
        name: flagInfo.name,
        color: status?.color ?? "#F3F3F3",
        tooltip: status?.tooltip,
        icon: status?.icon ??  "fa fa-circle",
      };
    }
    return {
      name: flag.name,
      color: "#F3F3F3",
      tooltip: flag.status.name,
      icon: "fa fa-circle",
    };
  });

const FlagComponent = <TData, P>({ info }: RowActionsProps<TData, P>) => {
  const flags = info.getValue() as FlagData[];
  const { data } = useQuery(["flags"], fetchAllFlags);

  const flagData = useMemo(
    () => getFlagElements(flags, data?.data as Flag[]),
    [data, flags]
  );
  // const rowData = info.row.getValue(info.column.id);
  // TODO: update color based on flag code
  return (
    <div className="flex flex-row gap-0.5 pt-1">
      {flagData?.map((flag) => (
        <button
          type="button"
          key={flag.name}
          className="inline-flex items-center justify-center rounded-full p-0.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-300  "
          title={flag.tooltip}
        >
          <span className="sr-only">{flag.tooltip}</span>
          <span
            className={`h-4 w-4 ${flag.icon ?? "fa fa-circle"}`}
            style={{ color: flag.color }}
          ></span>
        </button>
      ))}
    </div>
  );
};
const Flags = genericMemo(FlagComponent);
export default Flags;
