import { flexRender } from "@tanstack/react-table";
import type { Table } from "@tanstack/react-table";

interface TableBodyProps<M> {
  table: Table<M>;
}

const ReactTableBody = <M,>({ table, ...props }: TableBodyProps<M>) => (
  <tbody>
    {table.getRowModel().rows.map((row) => (
      <tr
        key={row.id}
        // onClick={() => {
        //   table.toggleAllRowsSelected(false);
        //   row.toggleSelected(!row.getIsSelected());
        // }}
        className={`border-b odd:bg-white even:bg-gray-50  hover:bg-base-hover  `}
      >
        {row.getVisibleCells().map((cell) => (
          <td
            key={cell.id}
            scope="row"
            className={`text-ellipsis whitespace-nowrap p-1 font-medium  text-gray-900 ${
              cell.column.id !== "action" ? "truncate" : ""
            }`}
            style={{
              width: cell.column.getSize(),
              textAlign:
                !cell.column.columnDef.meta?.isCurrency &&
                cell.column.columnDef.meta?.dataType === "string"
                  ? "left"
                  : cell.column.columnDef.meta?.dataType === "date"
                  ? "center"
                  : "right",
            }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
);

export default ReactTableBody;
