import { type ColumnDef } from "@tanstack/react-table";


import StatusCell from "components/lib/ReactTable/StatusCell";
import { type ReceivedOrder } from "validators/inventory.validators";
import RowActions from "./RowActions";
import { Link } from "react-router-dom";
import { selectedRowIdActions } from "./useTable";
import { getFormattedDate } from "utils/date";
export const useDefaultColumns = () => {
  const { setRowIds, resetAll } = selectedRowIdActions();

  const defaultColumns: Array<ColumnDef<ReceivedOrder>> = [
    {
      accessorKey: "number",
      id: "number",
      header: "Order #",
      cell: ({ table, row, getValue }) => (
        <Link
          to={`/items/${getValue() as string}`}
          onClick={(e) => {
            e.stopPropagation();
            table.toggleAllRowsSelected(false);
            row.toggleSelected(!row.getIsSelected());
            resetAll();
            setRowIds(row.original.number);
          }}
          className={`inline-block h-full w-full text-skin-primary ${
            row.getIsSelected()
              ? "underline decoration-2 underline-offset-2"
              : ""
          }`}
        >
          {getValue() as string}
        </Link>
      ),
      footer: (props) => props.column.id,
      size: 180,
      enableHiding: false,
      enableSorting: true,
      enablePinning: true,
      meta: {
        dataType: "string",
      },
    },

    {
      accessorKey: "jobID",
      id: "jobID",
      header: "JobID",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
      size: 180,
      enableSorting: true,
      meta: {
        dataType: "string",
      },
    },
    {
      accessorFn: (value) => value.customer.name,
      id: "customer",
      header: "Customer Name",
      // cell: (info) => info.getValue().name, // option to keep all data
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
      size: 180,
      enableSorting: true,
      meta: {
        dataType: "string",
      },
    },
    {
      accessorFn: (value) => value.salesman.name,
      id: "supplierItemNumber",
      header: "Sales Person",
      // cell: (info) => info.getValue().name, // option to keep all data
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
      size: 180,
      enableSorting: true,
      meta: {
        dataType: "string",
      },
    },

    {
      accessorFn: (value) => value.CSR.name,

      id: "CSR",
      header: "Admin/CSR",
      // cell: (info) => info.getValue().name, // option to keep all data
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
      size: 180,
      enableSorting: true,
      meta: {
        dataType: "string",
      },
    },
    {
      accessorKey: "orderDate",
      id: "orderDate",
      header: "Order Date",
      // cell: (info) => info.getValue().name, // option to keep all data
      cell: (info) =>
          `${getFormattedDate(
            info.getValue() as string,
            "M/D/YYYY h:mm:ss A"
          )}`,
      footer: (props) => props.column.id,
      size: 180,
      enableSorting: true,
      meta: {
        dataType: "string",
      },
    },

   
    {
      accessorKey: "status",
      id: "status",
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

