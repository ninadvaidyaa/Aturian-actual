import { type ColumnDef } from "@tanstack/react-table";
import { type OrdersList } from "validators/orders.validators";
import RowActions from "components/lib/ReactTable/RowActions";
import { getFormattedDate } from "utils/date";

export const defaultColumns: Array<ColumnDef<OrdersList>> = [
  {
    accessorKey: "number",
    id: "number",
    header: "Order Number",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    enablePinning: true,
    enableHiding: false,
    meta: {
      dataType: "number",
    },
  },
  {
    accessorKey: "jobId",
    id: "jobId",
    header: "Job Id",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    meta: {
      dataType: "string",
    },
  },
  {
    accessorKey: "status",
    id: "status",
    header: "Status",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    meta: {
      dataType: "string",
      isSelectable: true,
    },
  },
  {
    accessorKey: "csr",
    id: "csr",
    header: "Admin/CSR",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    meta: {
      dataType: "string",
      isSelectable: true,
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
    meta: {
      dataType: "string",
    },
  },
  {
    accessorKey: "date",
    id: "date",
    header: "Order Date",
    cell: (info) =>
      `${getFormattedDate(info.getValue() as string, "M/D/YYYY h:mm:ss A")}`,
    footer: (props) => props.column.id,
    meta: {
      dataType: "date",
      dateFormate: "M/D/YYYY h:mm:ss A",
    },
  },
  {
    accessorKey: "salesperson",
    id: "salesperson",
    header: "Sales Person",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    meta: {
      dataType: "string",
    },
  },
  {
    accessorKey: "total",
    id: "total",
    header: "Total",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    meta: {
      dataType: "string",
    },
  },
  {
    accessorKey: "cost",
    id: "cost",
    header: "Cost",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    meta: {
      dataType: "string",
    },
  },
  {
    accessorKey: "createdBy",
    id: "createdBy",
    header: "Created By",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    meta: {
      dataType: "string",
    },
  },
  {
    id: "action",
    header: "Action",
    cell: (info) => <RowActions info={info} />,
    footer: (props) => props.column.id,
    enableHiding: false,
    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableSorting: false,
    meta: {
      dataType: "string",
    },
  },
];
