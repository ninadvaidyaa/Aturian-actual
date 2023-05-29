import { type ColumnDef } from "@tanstack/react-table";
import { type MultiGLDetails } from 'validators/accounting.displayGLDetails.validators';
import { getFormattedDate } from 'utils/date';
import { getUSCurrency } from 'utils/number';


export const defaultColumns : Array<ColumnDef<MultiGLDetails>> = [
   
  {
    accessorKey: "type",
    id: "type",
    header: "Type",
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
        accessorKey: "invoicenum",
        id: "invoicenum",
        header: "Invoice #",
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
        accessorKey: "invoicedate",
        id: "invoicedate",
        header: "Invoice Date",
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
        accessorKey: "journal",
        id: "journal",
        header: "Journal",
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
        accessorKey: "itemName",
        id: "itemName",
        header: "Item Name",
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
        accessorKey: "memo",
        id: "memo",
        header: "Memo",
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
        accessorKey: "amount",
        id: "amount",
        header: "Amount",
        cell: (info) => getUSCurrency(info.getValue() as number),
        footer: (props) => props.column.id,
        size: 100,
        enableSorting: true,
        meta: {
          dataType: "string",
          isCurrency: true,
        },
      }
];
