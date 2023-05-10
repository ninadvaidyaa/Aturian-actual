import { Fragment } from "react";
import { type Table } from "@tanstack/react-table";

import ScrollX from "components/ScrollX";
import DraggableColumnHeader from "./ColumnHeader";
import Filter from "./ColumnFilter";
import EmptyTable from "./EmptyTable";
import ReactTableBody from "./TableBody";

interface ReactTableProps<P> {
  table: Table<P>;
  isError: boolean;
  error?: any;
}

const ReactTable = <M,>({ table, isError, error }: ReactTableProps<M>) => (
    <div className="rounded-sm bg-white p-2">
      <ScrollX className="relative h-[calc(100vh_-_270px)] overflow-auto rounded-sm">
        <table
          className="table-fixed"
          style={{ width: table.getCenterTotalSize() }}
        >
          <thead className="sticky top-0 z-20 bg-gray-50 capitalize">
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
          {isError ? (
            <EmptyTable
              msg="No Records Available"
              colSpan={table.getAllLeafColumns().length}
              isError={isError} error={error}
            />
          ) : (
            <ReactTableBody table={table} />
          )}
        </table>
      </ScrollX>
    </div>
  );

export default ReactTable;
