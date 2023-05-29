import { type ColumnDef } from "@tanstack/react-table";
import { type GLDetails } from "validators/accounting.validators";
import { getFormattedDate } from "utils/date";
import { getUSCurrency } from "utils/number";

export const useDefaultColumns = () => {
  const defaultColumns: Array<ColumnDef<GLDetails>> = [
    {
      accessorKey: "accountNo",
      id: "accountNo",
      header: "Accounts #",
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
      accessorKey: "description",
      id: "description",
      header: "Accounts Description",
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
      accessorKey: "bookPeriod",
      id: "bookPeriod",
      header: "Book Period",
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
      accessorKey: "dateClosed",
      id: "dateClosed",
      header: "Posted Date",
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
      accessorKey: "source",
      id: "source",
      header: "Journal Source",
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
      accessorKey: "transactionAmount",
      id: "transactionAmount",
      header: "Transaction Amount",
      cell: (info) => {
        if (info.row.index === 0) {
          return info.getValue();
        }
        return getUSCurrency(info.getValue() as number);
      },
      footer: (props) => props.column.id,
      size: 100,
      enableSorting: true,
      meta: {
        dataType: "string",
        isCurrency: true,
      },
    },
    {
      accessorKey: "debit",
      id: "debit",
      header: "Debit",
      cell: (info) => {
        if (info.row.index === 0) {
          return info.getValue();
        }
        return getUSCurrency(info.getValue() as number);
      },
      footer: (props) => props.column.id,
      size: 100,
      enableSorting: true,
      meta: {
        dataType: "string",
        isCurrency: true,
      },
    },
    {
      accessorKey: "credit",
      id: "credit",
      header: "Credit",
      cell: (info) => {
        if (info.row.index === 0) {
          return info.getValue();
        }
        return getUSCurrency(info.getValue() as number);
      },
      footer: (props) => props.column.id,
      size: 100,
      enableSorting: true,
      meta: {
        dataType: "string",
        isCurrency: true,
      },
    },
  ];

  return defaultColumns;
};
