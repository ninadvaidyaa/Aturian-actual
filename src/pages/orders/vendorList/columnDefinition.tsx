import { type ColumnDef } from "@tanstack/react-table";
import { type OrdersList } from "validators/orders.validators";
import { type UserViews } from "types/userViews";

import RowActions from "./RowActions";
import { getFormattedDate } from "utils/date";
import StatusCell from "components/lib/ReactTable/StatusCell";
import { Link } from "react-router-dom";
import { getUSCurrency } from "utils/number";
import FlagComponent from "components/lib/ReactTable/RowFlags";
import { selectedRowIdActions } from "./useTable";
import { useMemo } from "react";

export const useDefaultColumns = () => {
  const { resetAll, setRowIds } = selectedRowIdActions();
  const defaultColumns: Array<ColumnDef<OrdersList>> = useMemo(
    () => [
      {
        accessorKey: "number",
        id: "number",
        header: "Order #",
        cell: ({ table, row, getValue }) => (
          <Link
            to={`/orders/${getValue() as string}`}
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
              setRowIds(row.original.number);
            }}
          >
            {getValue() as string}
          </Link>
        ),
        footer: (props) => props.column.id,
        size: 100,
        enablePinning: true,
        enableHiding: false,
        enableSorting: true,
        meta: {
          dataType: "string",
        },
      },
      {
        accessorKey: "flags",
        id: "flags",
        header: "Flags",
        cell: (info) => <FlagComponent info={info} />,
        footer: (props) => props.column.id,
        size: 180,
        enableHiding: true,
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableSorting: false,
        meta: {
          dataType: "string",
        },
      },
      {
        accessorKey: "jobId",
        id: "jobId",
        header: "Job Id",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        size: 100,
        enableSorting: true,
        meta: {
          dataType: "string",
        },
      },
      {
        // accessorFn: (value) => value.customer, // option to keep all data
        accessorFn: (value) => value.customer.name,
        id: "customer",
        header: "Customer Name",
        // cell: (info) => info.getValue().name, // option to keep all data
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        size: 120,
        enableSorting: true,
        meta: {
          dataType: "string",
        },
      },
      {
        accessorKey: "date",
        id: "date",
        header: "Order Date",
        cell: (info) =>
          `${getFormattedDate(
            info.getValue() as string,
            "M/D/YYYY h:mm:ss A"
          )}`,
        footer: (props) => props.column.id,
        size: 100,
        enableSorting: true,
        meta: {
          dataType: "date",
          dateFormate: "M/D/YYYY h:mm:ss A",
        },
      },
      {
        accessorKey: "shipDate",
        id: "shipDate",
        header: "Ship Date",
        cell: (info) =>
          `${getFormattedDate(
            info.getValue() as string,
            "M/D/YYYY h:mm:ss A"
          )}`,
        footer: (props) => props.column.id,
        size: 100,
        enableSorting: true,
        meta: {
          dataType: "date",
          dateFormate: "M/D/YYYY h:mm:ss A",
        },
      },
      {
        accessorFn: (value) => value.salesperson.name,
        id: "salesperson",
        header: "Sales Person",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        size: 100,
        enableSorting: true,
        meta: {
          dataType: "string",
        },
      },
      {
        accessorKey: "csr",
        id: "csr",
        header: "Admin/CSR",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        size: 100,
        enableSorting: true,
        meta: {
          dataType: "string",
          isSelectable: true,
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
        accessorKey: "types",
        id: "types",
        header: "Type",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        size: 100,
        enableSorting: true,
        meta: {
          dataType: "string",
        },
      },
      {
        accessorKey: "createdBy",
        id: "createdBy",
        header: "By",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        size: 100,
        enableSorting: true,
        meta: {
          dataType: "string",
        },
      },
      {
        accessorKey: "cost",
        id: "cost",
        header: "Cost",
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
        accessorKey: "total",
        id: "total",
        header: "Total",
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
        id: "select",
        index: 0,
      },
      {
        id: "number",
        index: 1,
      },
      {
        id: "jobId",
        index: 2,
      },
      {
        id: "customer",
        index: 3,
      },
      {
        id: "shipDate",
        index: 4,
      },
      {
        id: "salesperson",
        index: 5,
      },
      {
        id: "csr",
        index: 6,
      },
      {
        id: "status",
        index: 7,
      },
      {
        id: "types",
        index: 8,
      },
      {
        id: "createdBy",
        index: 9,
      },
      {
        id: "cost",
        index: 10,
      },
      {
        id: "total",
        index: 11,
      },
      {
        id: "flags",
        index: 12,
      },
      {
        id: "date",
        index: 13,
      },
      {
        id: "action",
        index: 14,
      },
    ],
  },
  view2: {
    name: "view 2",
    id: 2,
    columns: [
      {
        id: "select",
        index: 0,
      },
      {
        id: "number",
        index: 1,
      },
      {
        id: "jobId",
        index: 10,
      },
      {
        id: "customer",
        index: 9,
      },
      {
        id: "shipDate",
        index: 8,
      },
      {
        id: "salesperson",
        index: 5,
      },
      {
        id: "csr",
        index: 6,
      },
      {
        id: "status",
        index: 7,
      },
      {
        id: "types",
        index: 4,
      },
      {
        id: "createdBy",
        index: 3,
      },
      {
        id: "cost",
        index: 2,
      },
      {
        id: "total",
        index: 11,
      },
      {
        id: "flags",
        index: 12,
      },
      {
        id: "date",
        index: 13,
      },
      {
        id: "action",
        index: 14,
      },
    ],
  },
};
