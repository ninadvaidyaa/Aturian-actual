import { type ColumnDef } from "@tanstack/react-table";

import { type UserViews } from "types/userViews";


import { getFormattedDate } from "utils/date";
import StatusCell from "components/lib/ReactTable/StatusCell";
import RowActions from "./RowActions";

import { Link } from "react-router-dom";
import {type  ManageSupplierInvoiceList } from "validators/manageSupplierInvoice.validator";

export const defaultColumns: Array<ColumnDef<ManageSupplierInvoiceList>> = [

  {
    accessorKey: "orderNumber",
    id: "orderNumber",
    header: "Invoice #",
    cell: (info) => {
      const { table, row } = info;
      return (
        <Link
          to={`/supplier-invoices/${info.getValue() as string}`}
          onClick={() => {
            table.toggleAllRowsSelected(false);
            row.toggleSelected(!row.getIsSelected());
          }}
          className={`inline-block h-full w-full text-skin-primary ${
            row.getIsSelected()
              ? "underline decoration-2 underline-offset-2"
              : ""
          }`}
        >
          {info.getValue() as string}
        </Link>
      );
    },
    footer: (props) => props.column.id,
    size: 160,
    
    enableHiding: false,
    enableSorting: true,
    meta: {
      dataType: "string",
    },
  },
 
  {
    accessorKey: "vendorName",
    id: "vendorName",
    header: "Vendor Name",
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
    accessorKey: "vendorNumber",
    id: "vendorNumber",
    header: "Vendor #",
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
    // accessorFn: (value) => value.customer, // option to keep all data
    // accessorFn: (value) => value.customer.name,
    accessorKey: "invoiceNum",
    id: "invoiceNum",
    header: "Order #",
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
    // accessorFn: (value) => value.customer, // option to keep all data
    // accessorFn: (value) => value.customer.name,
    accessorKey: "DoL",
    id: "DoL",
    header: "DoL #",
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
    // accessorFn: (value) => value.customer, // option to keep all data
    // accessorFn: (value) => value.customer.name,
    accessorKey: "amount",
    id: "amount",
    header: "Amount",
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
    // accessorFn: (value) => value.customer, // option to keep all data
    // accessorFn: (value) => value.customer.name,
    accessorKey: "amountDue",
    id: "amountDue",
    header: "Amount Due #",
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
    // accessorFn: (value) => value.customer, // option to keep all data
    // accessorFn: (value) => value.customer.name,
    accessorKey: "amountPaid",
    id: "amountPaid",
    header: "Amount Paid",
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
    accessorKey: "invoiceDate",
    id: "invoiceDate",
    header: "Invoice Date",
    cell: (info) =>
    info.getValue() ? ` ${getFormattedDate(info.getValue() as string, "M/D/YYYY h:mm:ss A")}` : '-',
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
    accessorKey: "source",
    id: "source",
    header: "Source",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    size: 100,
    enableSorting: true,
    meta: {
      dataType: "string",
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
export const views: UserViews = {
  view1: {
    name: "view1",
    id: 1,
    columns: [
      {
        id: "orderNumber",
        index: 0,
      },
      {
        id: "vendorName",
        index: 1,
      },
      {
        id: "vendorNumber",
        index: 2,
      },
      {
        id: "invoiceNum",
        index: 3,
      },
      {
        id: "DoL",
        index: 4,
      },
      {
        id: "amount",
        index: 5,
      },
      {
        id: "amountDue",
        index: 6,
      },
      {
        id: "amountPaid",
        index: 7,
      },
     
      {
        id: "invoiceDate",
        index: 8,
      },
      {
        id: "dueDate",
        index: 9,
      },
      {
        id: "source",
        index: 10,
      },
      {
        id: "invoiceStatus",
        index: 11,
      },
      {
        id: "action",
        index: 12,
      },
    ],
  },
  view2: {
    name: "view 2",
    id: 2,
    columns: [
      {
        id: "orderNumber",
        index: 0,
      },

      {
        id: "DoL",
        index: 1,
      },
      {
        id: "amount",
        index: 2,
      },


      {
        id: "vendorName",
        index: 3,
      },

      {
        id: "invoiceNum",
        index: 4,
      },
      
      {
        id: "amountDue",
        index: 5,
      },


      {
        id: "vendorNumber",
        index: 6,
      },

    
      {
        id: "amountPaid",
        index: 7,
      },


      
      
     
      {
        id: "invoiceDate",
        index: 8,
      },
      {
        id: "dueDate",
        index: 9,
      },
      {
        id: "source",
        index: 10,
      },
      {
        id: "invoiceStatus",
        index: 11,
      },
      {
        id: "action",
        index: 12,
      },
    ],
  },
};
