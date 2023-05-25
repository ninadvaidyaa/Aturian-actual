import { type ColumnDef } from "@tanstack/react-table";
import RowActions from "./RowActions";
import { Link } from "react-router-dom";
import { type SupplierList } from "validators/supplier.validators";
import { type UserViews } from "types/userViews";
import { selectedRowIdActions } from "./useTable";

export const useDefaultColumns = () => {
  const { setRowIds, resetAll } = selectedRowIdActions();

  const defaultColumns: Array<ColumnDef<SupplierList>> = [
    {
      accessorKey: "number",
      id: "number",
      header: "Vendor #",
      cell: ({ row, getValue, table }) => (
        <Link
          className={`inline-block h-full w-full text-primary-500 ${
            row.getIsSelected()
              ? "underline decoration-2 underline-offset-2"
              : ""
          }`}
          to={`/suppliers/${getValue() as string}`}
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
      size: 200,
      enablePinning: true,
      enableHiding: false,
      enableSorting: true,
      meta: {
        dataType: "string",
      },
    },

    {
      accessorKey: "name",
      id: "name",
      header: "Vendor Name",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
      size: 200,
      enableSorting: true,
      meta: {
        dataType: "string",
      },
    },

    {
      accessorKey: "aliases",
      id: "alias",
      header: "Aliases",
      cell: (info) => (info.getValue() as string[]).join(", "),
      footer: (props) => props.column.id,
      size: 200,
      enableSorting: true,
      meta: {
        dataType: "string",
      },
    },
    {
      accessorFn: (value) => value.contact.general.name,
      id: "contact-name",
      header: "Contact",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
      size: 220,
      enableSorting: true,
      meta: {
        dataType: "string",
      },
    },
    {
      accessorFn: (value) => value.contact.general.phone,
      id: "contact-phone",
      header: "Phone#",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
      size: 220,
      enableSorting: true,
      meta: {
        dataType: "string",
      },
    },
    {
      accessorFn: (value) => value.contact.general.email,
      id: "contact-email",
      header: "Email",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
      size: 220,
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
      size: 160,
      enableHiding: false,
      enableColumnFilter: false,
      enableGlobalFilter: false,
      enableSorting: false,
      enableResizing: false,
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
        id: "number",
        index: 0,
      },
      {
        id: "name",
        index: 1,
      },
      {
        id: "alias",
        index: 2,
      },
      {
        id: "contact-name",
        index: 4,
      },
      {
        id: "contact-email",
        index: 5,
      },
      {
        id: "contact-phone",
        index: 6,
      },
      {
        id: "action",
        index: 7,
      },
    ],
  },
  view2: {
    name: "view 2",
    id: 2,
    columns: [
      {
        id: "number",
        index: 6,
      },
      {
        id: "name",
        index: 5,
      },
      {
        id: "alias",
        index: 4,
      },
      {
        id: "contact-name",
        index: 2,
      },
      {
        id: "contact-email",
        index: 1,
      },
      {
        id: "contact-phone",
        index: 0,
      },
      {
        id: "action",
        index: 7,
      },
    ],
  },
};
