import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { flexRender } from "@tanstack/react-table";
import type { Table } from "@tanstack/react-table";

interface TableBodyProps<M> {
  table: Table<M>;
}

const ReactTableBody = <M,>({ table, ...props }: TableBodyProps<M>) => (
  <TableBody {...props}>
    {table.getRowModel().rows.map((row) => (
      <TableRow key={row.id}>
        {row.getVisibleCells().map((cell) => (
          <TableCell
            key={cell.id}
            sx={{
              width: cell.column.getSize(),
              textAlign:
                !cell.column.columnDef.meta?.isCurrency &&
                cell.column.columnDef.meta?.dataType === "string"
                  ? "left"
                  : "right",
            }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableBody>
);

export default ReactTableBody;
