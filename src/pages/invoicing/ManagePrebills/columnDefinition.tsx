import { type ColumnDef } from "@tanstack/react-table";

import { type UserViews } from "types/userViews";

import { getFormattedDate } from "utils/date";
import StatusCell from "components/lib/ReactTable/StatusCell";
import RowActions from "./RowActions";

import { Link } from "react-router-dom";
import { type ManagePrebillsList } from "validators/invoicing.validator";
import { getUSCurrency } from "utils/number";
import { selectedRowIdActions } from "./useTable";

export const useDefaultColumns = () => {
  const { setRowIds, resetAll } = selectedRowIdActions();
  const defaultColumns: Array<ColumnDef<ManagePrebillsList>> = [
    {
      accessorKey: "invoiceNum",
      id: "invoiceNum",
      header: "PreBill #",
      cell: ({ table, row, getValue }) => (
        // TODO: change 'invoices' to 'prebills' when the route is ready
        <Link
          to={`/invoices/${getValue() as string}`}
          onClick={(e) => {
            e.stopPropagation();
            table.toggleAllRowsSelected(false);
            row.toggleSelected(!row.getIsSelected());
            resetAll();
            setRowIds(row.original.invoiceNum);
          }}
          className={`inline-block h-full w-full text-primary-500 ${
            row.getIsSelected()
              ? "underline decoration-2 underline-offset-2"
              : ""
          }`}
        >
          {getValue() as string}
        </Link>
      ),
      footer: (props) => props.column.id,
      size: 160,

      enableHiding: false,
      enableSorting: true,
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
    size: 180,
    enableSorting: true,
    meta: {
      dataType: "string",
    },
  },
  {
    // accessorFn: (value) => value.customer, // option to keep all data
    // accessorFn: (value) => value.customer.name,
    accessorKey: "custNumber",
      id: "custNumber_prebills",
    header: "Customer #",
    // cell: (info) => info.getValue().name, // option to keep all data
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    size: 180,
    enableSorting: true,
    meta: {
      dataType: "number",
    },
  },
  {
    accessorKey: "amount",
    id: "amount",
    header: "Amount",
    cell: (info) => getUSCurrency(info.getValue() as number),
    footer: (props) => props.column.id,
    size: 180,
    enableSorting: true,
    meta: {
      dataType: "number",
    },
  },

  {
    accessorKey: "amountPaid",
    id: "amountPaid",
    header: "Amt Paid",
    cell: (info) => getUSCurrency(info.getValue() as number),
    footer: (props) => props.column.id,
    size: 180,
    enableSorting: true,
    meta: {
      dataType: "number",
    },
  },

    {
      accessorKey: "orderNumber",
      id: "orderNumber",
      header: "Order #",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
      size: 180,
      enableSorting: true,
      meta: {
        dataType: "number",
      },
    },

    {
      accessorKey: "custName",
      id: "custName_prebills",
      header: "Customer Name",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
      size: 180,
      enableSorting: true,
      meta: {
        dataType: "string",
      },
    },
    {
      // accessorFn: (value) => value.customer, // option to keep all data
      // accessorFn: (value) => value.customer.name,
      accessorKey: "custNumber",
      id: "custNumber",
      header: "Customer #",
      // cell: (info) => info.getValue().name, // option to keep all data
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
      size: 180,
      enableSorting: true,
      meta: {
        dataType: "number",
      },
    },
    {
      accessorKey: "amount",
      id: "amount_prebills",
      header: "Amount",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
      size: 180,
      enableSorting: true,
      meta: {
        dataType: "number",
      },
    },

    {
      accessorKey: "amountPaid",
      id: "amountPaid_prebills",
      header: "Amt Paid",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
      size: 180,
      enableSorting: true,
      meta: {
        dataType: "number",
      },
    },

    {
      accessorKey: "dueDate",
      id: "dueDate",
      header: "Due Date",
      cell: (info) =>
        `${getFormattedDate(info.getValue() as string, "M/D/YYYY h:mm:ss A")}`,
      footer: (props) => props.column.id,
      size: 180,
      enableSorting: true,
      meta: {
        dataType: "date",
        dateFormate: "M/D/YYYY h:mm:ss A",
      },
    },

    {
      accessorKey: "emailAddress",
      id: "emailAddress",
      header: "Email",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
      size: 180,
      enableSorting: true,
      meta: {
        dataType: "string",
      },
    },
    {
      accessorKey: "invoiceDate",
      id: "invoiceDate",
      header: "Sent Date",
      cell: (info) =>
        `${getFormattedDate(info.getValue() as string, "M/D/YYYY h:mm:ss A")}`,
      footer: (props) => props.column.id,
      size: 180,
      enableSorting: true,
      meta: {
        dataType: "date",
        dateFormate: "M/D/YYYY h:mm:ss A",
      },
    },

    {
      accessorKey: "preBillStatus",
      id: "preBillStatus",
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
export const views: UserViews = {
  view1: {
    name: "view1",
    id: 1,
    columns: [
      {
        id: "invoiceNum",
        index: 0,
      },
      {
        id: "orderNumber",
        index: 1,
      },
      {
        id: "custName_prebills",
        index: 2,
      },
      {
        id: "custNumber_prebills",
        index: 3,
      },
      {
        id: "amount_prebills",
        index: 4,
      },
      {
        id: "amountPaid_prebills",
        index: 5,
      },
      {
        id: "dueDate",
        index: 6,
      },
      {
        id: "emailAddress",
        index: 7,
      },
      {
        id: "invoiceDate",
        index: 8,
      },

      {
        id: "preBillStatus",
        index: 9,
      },

      {
        id: "action",
        index: 10,
      },
    ],
  },
  view2: {
    name: "view 2",
    id: 2,
    columns: [
      {
        id: "custNumber_prebills",
        index: 0,
      },
      {
        id: "custName_prebills",
        index: 1,
      },

      {
        id: "invoiceDate",
        index: 2,
      },
      {
        id: "invoiceNum",
        index: 3,
      },

      {
        id: "dueDate",
        index: 4,
      },
      {
        id: "emailAddress",
        index: 5,
      },
      {
        id: "amount_prebills",
        index: 6,
      },

      {
        id: "amountPaid_prebills",
        index: 7,
      },

      {
        id: "orderNumber",
        index: 8,
      },
      {
        id: "preBillStatus",
        index: 9,
      },

      {
        id: "action",
        index: 10,
      },
    ],
  },
};
