import DraggableColumnHeader from "./ColumnHeader";
import { type Table } from "@tanstack/react-table";
import Filter from "./ColumnFilter";
import { Fragment } from "react";

interface TableHeaderProps<M> {
  table: Table<M>;
}

const TableHeader = <M,>({ table, ...props }: TableHeaderProps<M>) => (
  <thead className="bg-gray-50 capitalize text-gray-700">
    {table.getHeaderGroups().map((headerGroup) => (
      <Fragment key={headerGroup.id}>
        <tr key={`${headerGroup.id}-name`}>
          {headerGroup.headers.map((header) => (
            <DraggableColumnHeader
              key={header.id}
              header={header}
              table={table}
            />
          ))}
        </tr>
        <tr key={`${headerGroup.id}-filter`}>
          {headerGroup.headers.map((header) => (
            <th
              className="overflow-hidden text-ellipsis whitespace-nowrap px-1 py-2 text-left font-normal"
              key={header.id}
              colSpan={header.colSpan}
            >
              {header.column.getCanFilter() ? (
                <Filter
                  key={header.id}
                  column={header.column}
                />
              ) : null}
            </th>
          ))}
        </tr>
      </Fragment>
    ))}
  </thead>
);

export default TableHeader;
