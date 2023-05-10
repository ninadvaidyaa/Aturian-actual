import React from "react";
import type { CellContext } from "@tanstack/react-table";
import MultiOrder from "components/icons/MultiOrder";
import {
  MdOutlineSpeed,
  MdPauseCircleOutline,
  MdOutlineReportProblem,
  MdCheckCircleOutline,
  MdOutlineDateRange,
} from "react-icons/md";
const genericMemo: <T>(component: T) => T = React.memo;

interface RowActionsProps<TData, P> {
  info: CellContext<TData, P>;
}

const FlagComponent = <TData, P>({ info }: RowActionsProps<TData, P>) => 
  // const value = info.getValue();
  // const rowData = info.row.getValue(info.column.id);
  // TODO: update color based on flag code
   (
    <>
      <div className="flex flex-row gap-0.5">
        <button
          type="button"
          className="text-skin-inverted focus:ring-1 p-0.5 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm text-center"
        >
          <MdOutlineSpeed
            className="w-4 h-4"
            color="#D80B0B"
          />
          <span className="sr-only">Icon</span>
        </button>

        <button
          type="button"
          className="w-6 h-6 text-skin-inverted focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1 text-center inline-flex items-center  "
        >
          <MdPauseCircleOutline
            className="w-4 h-4"
            color="#D2AC06"
          />
          <span className="sr-only">Icon</span>
        </button>

        <button
          type="button"
          className="w-6 h-6 text-skin-inverted focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1 text-center inline-flex items-center  "
        >
          <MdOutlineReportProblem
            className="w-4 h-4"
            color="#DB9409"
          />
          <span className="sr-only">Icon</span>
        </button>

        <button
          type="button"
          className="w-6 h-6 text-skin-inverted focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1 text-center inline-flex items-center  "
        >
          <MdCheckCircleOutline
            className="w-4 h-4"
            color="#008000"
          />
          <span className="sr-only">Icon</span>
        </button>

        <button
          type="button"
          className="w-6 h-6 text-skin-inverted focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1 text-center inline-flex items-center justify-center"
        >
          <span className="sr-only">Icon</span>
          <MultiOrder className="w-5 h-5" />
        </button>

        <button
          type="button"
          className="w-6 h-6 text-skin-inverted focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1 text-center inline-flex items-center  "
        >
          <MdOutlineDateRange
            className="w-4 h-4"
            color="#1890FF"
          />
          <span className="sr-only">Icon</span>
        </button>
      </div>
    </>
  )
;

const Flags = genericMemo(FlagComponent);
export default Flags;
