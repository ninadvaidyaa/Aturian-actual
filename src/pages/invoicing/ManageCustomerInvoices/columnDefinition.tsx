import { type ColumnDef } from "@tanstack/react-table";

import { type UserViews } from "types/userViews";

import { getFormattedDate } from "utils/date";
import StatusCell from "components/lib/ReactTable/StatusCell";
import RowActions from "./RowActions";

import { Link } from "react-router-dom";
import { type ManageCustInvoiceList } from "validators/invoicing.validator";
import { useMemo } from "react";
import { selectedRowIdActions } from "./useTable";

export const useDefaultColumns = () => {
  const { setRowIds, resetAll } = selectedRowIdActions();
  const defaultColumns: Array<ColumnDef<ManageCustInvoiceList>> = useMemo(
    () => [
      {
        accessorKey: "invoiceNum",
        id: "invoiceNum",
        header: "Invoice #",
        cell: ({ table, row, getValue }) => (
          <Link
            to={`${getValue() as string}`}
            className={`inline-block h-full w-full text-skin-primary ${
              row.getIsSelected()
                ? "underline decoration-2 underline-offset-2"
                : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              table.toggleAllRowsSelected(false);
              row.toggleSelected(!row.getIsSelected());
              resetAll();
              setRowIds(row.original.invoiceNum);
            }}
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
        id: "amount_invoice",
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
        accessorKey: "invoiceDate",
        id: "invoiceDate",
        header: "Invoice Date",
        cell: (info) =>
          `${getFormattedDate(
            info.getValue() as string,
            "M/D/YYYY h:mm:ss A"
          )}`,
        footer: (props) => props.column.id,
        size: 180,
        enableSorting: true,
        meta: {
          dataType: "date",
          dateFormate: "M/D/YYYY h:mm:ss A",
        },
      },

      {
        accessorKey: "dueDate",
        id: "dueDate",
        header: "Due Date",
        cell: (info) =>
          `${getFormattedDate(
            info.getValue() as string,
            "M/D/YYYY h:mm:ss A"
          )}`,
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
        accessorKey: "sentEmailLastDate",
        id: "sentEmailLastDate",
        header: "Sent Date",
        cell: (info) =>
          `${getFormattedDate(
            info.getValue() as string,
            "M/D/YYYY h:mm:ss A"
          )}`,
        footer: (props) => props.column.id,
        size: 180,
        enableSorting: true,
        meta: {
          dataType: "date",
          dateFormate: "M/D/YYYY h:mm:ss A",
        },
      },

      {
        accessorKey: "invoiceStatus",
        id: "invoiceStatus",
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
        accessorKey: "avalaraMsg",
        id: "avalaraMsg",
        header: "Avalara",
        cell: (info) => {
          switch (info.getValue() as string) {
            case "success":
              return (
                <i className="fal fa-check-circle -ml-1 mr-2 w-full text-center font-bold text-emerald-500"></i>
              );
            case "":
              return <span></span>;
            default:
              return (
                <i className="fal fa-times-circle -ml-1 mr-2 w-full text-center font-bold text-rose-500"></i>
              );
          }
        },
        footer: (props) => props.column.id,
        size: 180,
        enableSorting: true,
        meta: {
          dataType: "string",
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
    ],
    []
  );

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
        id: "custName",
        index: 2,
      },
      {
        id: "custNumber",
        index: 3,
      },
      {
        id: "amount_invoice",
        index: 4,
      },
      {
        id: "invoiceDate",
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
        id: "sentEmailLastDate",
        index: 8,
      },

      {
        id: "invoiceStatus",
        index: 9,
      },
      {
        id: "avalaraMsg",
        index: 10,
      },

      {
        id: "action",
        index: 11,
      },
    ],
  },
  view2: {
    name: "view 2",
    id: 2,
    columns: [
      {
        id: "custNumber",
        index: 0,
      },
      {
        id: "custName",
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
        id: "amount_invoice",
        index: 6,
      },

      {
        id: "sentEmailLastDate",
        index: 7,
      },

      {
        id: "orderNumber",
        index: 8,
      },
      {
        id: "invoiceStatus",
        index: 9,
      },

      {
        id: "avalaraMsg",
        index: 10,
      },

      {
        id: "action",
        index: 11,
      },
    ],
  },
};
