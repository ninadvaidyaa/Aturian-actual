import { type ColumnDef } from "@tanstack/react-table";
import { getFormattedDate } from "utils/date";
import StatusCell from "components/lib/ReactTable/StatusCell";

import RowActions from "./RowActions";
import { type PickListInventory } from "validators/inventory.validators";
import CheckBox from "components/CheckBox";
import { Link } from "react-router-dom";
import { selectedRowIdActions } from "pages/accountPayable/manageSuppliesInvoice/useTable";

export const useDefaultColumns = () => {
  const { setRowIds, resetAll, setAll } = selectedRowIdActions();

  const defaultColumns: Array<ColumnDef<PickListInventory>> = [
    {
      id: "select",
      header: ({ table }) => (
        <CheckBox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
            onClick: (e) => {
              e.stopPropagation();
              if (table.getIsAllRowsSelected()) {
                resetAll();
              } else {
                const { rows } = table.getRowModel();
                if (rows) {
                  const rowIds = rows.map((row) => row.original.orderNumber);
                  setAll(rowIds);
                }
              }
            },
          }}
        />
      ),
      cell: ({ row }) => (
        <div className="px-1">
          <CheckBox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
              onClick: (e) => {
                setRowIds(row.original.orderNumber);
              },
            }}
          />
        </div>
      ),

      footer: (props) => props.column.id,
      size: 50,
      enableHiding: false,
      enableColumnFilter: false,
      enableGlobalFilter: false,
      enableSorting: false,
      enableResizing: false,
      enablePinning: true,
      meta: {
        dataType: "string",
      },
    },
    {
      accessorKey: "orderNote",
      id: "orderNote",
      header: "Links",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
      size: 80,
      enableHiding: true,
      enableColumnFilter: false,
      enableGlobalFilter: false,
      enableSorting: false,
      meta: {
        dataType: "string",
      },
    },
    {
      accessorKey: "orderNumber",
      id: "orderNumber",
      header: "PL #",
      cell: (info) => {
        const { table, row } = info;
        return (
          <Link
            to={`/pick-packs/${info.getValue() as string}`}
            onClick={() => {
              table.toggleAllRowsSelected(false);
              row.toggleSelected(!row.getIsSelected());
            }}
            className={`inline-block h-full w-full text-skin-primary ${
              row.getIsSelected()
                ? "underline decoration-2 underline-offset-2"
                : ""
            }`}
          >
            {info.getValue() as string}
          </Link>
        );
      },
      footer: (props) => props.column.id,
      enableHiding: false,
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
      enablePinning: true,
      meta: {
        dataType: "string",
      },
    },
    {
      accessorKey: "custName",
      id: "custName",
      header: "Customer Name",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
      enableHiding: false,
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
      meta: {
        dataType: "string",
      },
    },
    {
      accessorKey: "orderDate",
      id: "orderDate",
      header: "Order Date",
      cell: (info) =>
        `${getFormattedDate(info.getValue() as string, "M/D/YYYY h:mm:ss A")}`,
      footer: (props) => props.column.id,
      enableHiding: false,
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
      meta: {
        dataType: "date",
        dateFormate: "M/D/YYYY h:mm:ss A",
      },
    },
    {
      accessorKey: "inHandDate",
      id: "inHandDate",
      header: "In-Hands Date",
      cell: (info) =>
        `${getFormattedDate(info.getValue() as string, "M/D/YYYY h:mm:ss A")}`,
      footer: (props) => props.column.id,
      enableHiding: false,
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
      meta: {
        dataType: "date",
        dateFormate: "M/D/YYYY h:mm:ss A",
      },
    },
    {
      accessorKey: "dayOnList",
      id: "dayOnList",
      header: "Days on List",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
      enableHiding: false,
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
      meta: {
        dataType: "number",
      },
    },
    {
      accessorKey: "noOfItems",
      id: "noOfItems",
      header: "# of Items",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
      enableHiding: false,
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
      meta: {
        dataType: "number",
      },
    },
    {
      accessorKey: "pickPackStatus",
      id: "pickPackStatus",
      header: "Status",
      cell: (info) => (
        <StatusCell
          color="#006979"
          label="In Production"
          info={info}
        />
      ),
      footer: (props) => props.column.id,
      size: 100,
      enableSorting: true,
      meta: {
        dataType: "string",
        isSelectable: true,
        isStatus: true,
      },
    },
    {
      id: "action",
      header: "Action",
      cell: (info) => <RowActions info={info} />,
      footer: (props) => props.column.id,
      size: 150,
      enableHiding: false,
      enableColumnFilter: false,
      enableGlobalFilter: false,
      enableSorting: false,
      enableResizing: false,
      enablePinning: true,
      meta: {
        dataType: "string",
      },
    },
  ];

  return defaultColumns;
};
