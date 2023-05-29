import type { CellContext } from "@tanstack/react-table";
import React from "react";
import {
  MdOutlineDeleteOutline,
  MdOutlineStickyNote2,
  MdOutlineAvTimer,
} from "react-icons/md";

const genericMemo: <T>(component: T) => T = React.memo;
interface RowActionsProps<TData, P> {
  info: CellContext<TData, P>;
}

const RowActionComponent = <TData, P>({ info }: RowActionsProps<TData, P>) => (
  <>
    <div className="flex flex-row">
      <div>
        <button
          type="button"
          title="Activity Logs"
          className="inline-flex items-center rounded-full p-1 text-center text-sm font-medium text-skin-inverted focus:outline-none focus:ring-1 focus:ring-blue-300  "
        >
          <MdOutlineAvTimer
            className="h-4 w-4"
            color="#1890FF"
          />
          <span className="sr-only">Activity Logs</span>
        </button>
      </div>
      <div>
        <button
          type="button"
          title="Delete Invoice"
          className="inline-flex items-center rounded-full p-1 text-center text-sm font-medium text-skin-inverted focus:outline-none focus:ring-1 focus:ring-blue-300  "
        >
          <MdOutlineDeleteOutline
            className="h-4 w-4"
            color="#BB0505"
          />
          <span className="sr-only">Delete Invoice</span>
        </button>
      </div>
      <div>
        <button
          type="button"
          title="Order Notes"
          className="inline-flex items-center rounded-full p-1 text-center text-sm font-medium text-skin-inverted focus:outline-none focus:ring-1 focus:ring-blue-300  "
        >
          <MdOutlineStickyNote2
            className="h-4 w-4 "
            color="#8C8C8C"
          />
          <span className="sr-only">Order Notes</span>
        </button>
      </div>
    </div>
  </>
);
const RowActions = genericMemo(RowActionComponent);
export default RowActions;
