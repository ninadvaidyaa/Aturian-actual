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
        className="odd:bg-white even:bg-slate-50 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      >
        {row.getVisibleCells().map((cell) => (
          <td
            key={cell.id}
            scope="row"
            className={`px-1.5 py-2 font-medium text-gray-900 whitespace-nowrap  text-ellipsis  dark:text-white ${
              cell.column.id !== "action" ? "truncate" : ""
            }`}
            style={{
              width: cell.column.getSize(),
              textAlign:
                !cell.column.columnDef.meta?.isCurrency &&
                cell.column.columnDef.meta?.dataType === "string"
                  ? "left"
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
