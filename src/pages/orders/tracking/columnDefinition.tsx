import { type ColumnDef } from "@tanstack/react-table";
import type { OrderPO } from "validators/orders.validators";
import { type UserViews } from "types/userViews";

import RowActions from "./RowActions";
import { getFormattedDate } from "utils/date";
import StatusCell from "components/lib/ReactTable/StatusCell";
import { Link } from "react-router-dom";
import FlagComponent from "components/lib/ReactTable/RowFlags";
import { selectedRowIdActions } from "./useTable";
import { useMemo } from "react";
import CheckBox from "components/CheckBox";

export const useDefaultColumns = () => {
  const { resetAll, setRowIds, setAll } = selectedRowIdActions();
  const defaultColumns: Array<ColumnDef<OrderPO>> = useMemo(
    () => [
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
        accessorKey: "orderId",
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
              setRowIds(row.original.orderId);
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
        accessorKey: "supplierPONum",
        id: "supplierPONum",
        header: "PO #",
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
        accessorKey: "custName",
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
        accessorKey: "followupDate",
        id: "followupDate",
        header: "Followup Date",
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
        accessorKey: "inHandDate",
        id: "inHandDate",
        header: "In-Hand Date",
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
        accessorKey: "PoStatus",
        id: "PoStatus",
        header: "PoStatus",
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
        accessorKey: "dol",
        id: "dol",
        header: "DoL",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        size: 100,
        enablePinning: true,
        enableHiding: true,
        enableSorting: true,
        meta: {
          dataType: "number",
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
        id: "flags",
        index: 1,
      },
      {
        id: "orderId",
        index: 2,
      },
      {
        id: "supplierPONum",
        index: 3,
      },
      {
        id: "jobID",
        index: 4,
      },
      {
        id: "custName",
        index: 5,
      },
      {
        id: "inHandDate",
        index: 6,
      },
      {
        id: "followupDate",
        index: 7,
      },
      {
        id: "dol",
        index: 8,
      },
      {
        id: "shipDate",
        index: 9,
      },
      {
        id: "PoStatus",
        index: 10,
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
        id: "flags",
        index: 1,
      },
      {
        id: "orderId",
        index: 2,
      },
      {
        id: "supplierPONum",
        index: 3,
      },
      {
        id: "jobID",
        index: 4,
      },
      {
        id: "custName",
        index: 5,
      },
      {
        id: "inHandDate",
        index: 6,
      },
      {
        id: "followupDate",
        index: 7,
      },
      {
        id: "dol",
        index: 8,
      },
      {
        id: "shipDate",
        index: 9,
      },
      {
        id: "PoStatus",
        index: 10,
      },
      {
        id: "action",
        index: 14,
      },
    ],
  },
};
