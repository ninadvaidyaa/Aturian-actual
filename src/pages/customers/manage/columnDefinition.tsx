import { type ColumnDef } from "@tanstack/react-table";
import RowActions from "./RowActions";
import { Link } from "react-router-dom";
import { type CustomerList } from "validators/customer.validators";
import { type UserViews } from "types/userViews";
import { selectedRowIdActions } from "./useTable";

export const useDefaultColumns = () => {
  const { setRowIds, resetAll } = selectedRowIdActions();

  const defaultColumns: Array<ColumnDef<CustomerList>> = [
    {
      accessorKey: "id",
      id: "number",
      header: "Cust #",
      cell: ({ table, row, getValue }) => (
        <Link
          className={`inline-block h-full w-full text-primary-500 ${
            row.getIsSelected()
              ? "underline decoration-2 underline-offset-2"
              : ""
          }`}
          to={`/customers/${getValue() as string}`}
          onClick={(e) => {
            e.stopPropagation();
            table.toggleAllRowsSelected(false);
            row.toggleSelected(!row.getIsSelected());
            resetAll();
            setRowIds(row.original.id);
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
      header: "Customer Name",
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
      id: "aliases",
      header: "Alias(es)",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
      size: 200,
      enableSorting: true,
      meta: {
        dataType: "string",
      },
    },
    {
      accessorFn: (value) => value.salesperson.name,
      id: "salesperson",
      header: "Sales Person",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
      size: 220,
      enableSorting: true,
      meta: {
        dataType: "string",
      },
    },
    {
      accessorFn: (value) => value.contact.name,
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
      accessorFn: (value) => value.contact.email,
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
      accessorFn: (value) => value.contact.phone,
      id: "contact-phone",
      header: "Phone",
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
        id: "id",
        index: 0,
      },
      {
        id: "name",
        index: 1,
      },
      {
        id: "aliases",
        index: 2,
      },
      {
        id: "salesperson",
        index: 3,
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
        id: "id",
        index: 6,
      },
      {
        id: "name",
        index: 5,
      },
      {
        id: "aliases",
        index: 4,
      },
      {
        id: "salesperson",
        index: 3,
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
