import { type ColumnDef } from "@tanstack/react-table";
import { type OrdersList } from "validators/orders.validators";
import RowActions from "components/lib/ReactTable/RowActions";
import { getFormattedDate } from "utils/date";
import StatusCell from "components/lib/ReactTable/StatusCell";
import { Link } from "react-router-dom";
import MUILink from "@mui/material/Link";
import { getUSCurrency } from "utils/number";
import FlagComponent from "components/lib/ReactTable/RowFlags";
export const defaultColumns: Array<ColumnDef<OrdersList>> = [
  {
    accessorKey: "number",
    id: "number",
    header: "Order Number",
    cell: (info) => (
      <MUILink
        component={Link}
        underline="none"
        to={"#"}
      >
        {info.getValue() as string}
      </MUILink>
    ),
    footer: (props) => props.column.id,
    size:20,
    enablePinning: true,
    enableHiding: false,
    enableSorting: true,
    meta: {
      dataType: "string",
    },
  },
  {
    id: "flags",
    header: "Flags",
    cell: (info) => <FlagComponent info={info} />,
    footer: (props) => props.column.id,
    size:20,
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
    size:20,
    enableSorting: true,
    meta: {
      dataType: "string",
    },
  },
  {
    accessorKey: "status",
    id: "status",
    header: "Status",
    cell: (info) => {
      const value = info.getValue();

      switch (value) {
        case "In Production":
          return (
            <StatusCell
              color="#006979"
              label="In Production"
            />
          );
        case "In Process":
          return (
            <StatusCell
              color="#DB9409"
              label="In Process"
            />
          );
        case "Partially Shipped":
          return (
            <StatusCell
              color="#951395"
              label="Partially Shipped"
            />
          );
        case "Shipped":
          return (
            <StatusCell
              color="#00840F"
              label="Shipped"
            />
          );
        case "Finalized":
          return (
            <StatusCell
              color="#00840F"
              label="Finalized"
            />
          );
        case "On-Hold":
          return (
            <StatusCell
              color="#0728A4"
              label="On-Hold"
            />
          );
        default:
          return (
            <StatusCell
              color="#517806"
              label="Open"
            />
          );
      }
    },
    footer: (props) => props.column.id,
    size:20,
    enableSorting: true,
    meta: {
      dataType: "string",
      isSelectable: true,
      isStatus: true,
    },
  },
  {
    accessorKey: "csr",
    id: "csr",
    header: "Admin/CSR",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    size:20,
    enableSorting: true,
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
    size:20,
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
      `${getFormattedDate(info.getValue() as string, "M/D/YYYY h:mm:ss A")}`,
    footer: (props) => props.column.id,
    size:20,
    enableSorting: true,
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
    size:20,
    enableSorting: true,
    meta: {
      dataType: "string",
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
    size:20,
    enableSorting: true,
    meta: {
      dataType: "string",
      isCurrency: true,
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
    size:20,
    enableSorting: true,
    meta: {
      dataType: "string",
      isCurrency: true,
    },
  },

  {
    accessorKey: "createdBy",
    id: "createdBy",
    header: "Created By",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    size:20,
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
    size:20,
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
