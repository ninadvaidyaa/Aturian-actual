import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DraggableColumnHeader from "./ColumnHeader";
import { flexRender, type Table } from "@tanstack/react-table";
import TextField from "@mui/material/TextField";
import TableCell from "@mui/material/TableCell";

import Filter from "./ColumnFilter";
import { Fragment } from "react";
interface TableHeaderProps<M> {
  table: Table<M>;
}

const TableHeader = <M,>({ table, ...props }: TableHeaderProps<M>) => (
  <TableHead>
    {table.getHeaderGroups().map((headerGroup) => (
      <Fragment key={headerGroup.id}>
        <TableRow key={`${headerGroup.id}-name`}>
          {headerGroup.headers.map((header) => (
            <DraggableColumnHeader
              key={header.id}
              header={header}
              table={table}
            />
          ))}
        </TableRow>
        <TableRow key={`${headerGroup.id}-filter`}>
          {headerGroup.headers.map((header) => (
            // <ColumnHeaderFilter
            //   key={header.id}
            //   header={header}
            // />
            <TableCell
              key={header.id}
              colSpan={header.colSpan}
            >
              {header.column.getCanFilter() ? (
                <Filter
                  key={header.id}
                  column={header.column}
                />
              ) : (
                <TextField
                  key={header.id}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-input": { py: 0.5, px: 0.75 },
                  }}
                  size="small"
                  disabled
                  value={flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                />
              )}
            </TableCell>
          ))}
        </TableRow>
      </Fragment>
    ))}
  </TableHead>
);

export default TableHeader;
