import { type ColumnDef } from "@tanstack/react-table";
import { type UserViews } from "types/userViews";


import { getFormattedDate } from "utils/date";
import StatusCell from "components/lib/ReactTable/StatusCell";

import FlagComponent from "components/lib/ReactTable/RowFlags";

import RowActions from "./RowActions";
import { type PickPackOthersList } from "validators/inventory.validators";





export const defaultColumns: Array<ColumnDef<PickPackOthersList>> = [

  
  
  {
    accessorKey: "linksFlag",
    id: "linksFlag",
    header: "Linkes",
    cell: (info) => <FlagComponent info={info} />,
    footer: (props) => props.column.id,
    size: 80,
    enableHiding: true,
    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableSorting: false,
    meta: {
      dataType: "string",
    },
  },
  {
    accessorKey: "orderNumber",
    id: "orderNumber",
    header: "PL #",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    size: 180,
    
    enableSorting: true,
    meta: {
      dataType: "string",
    },
  },

  {
    accessorKey: "custName",
    id: "custName",
    header: "Customer Name",
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
    accessorKey: "orderDate",
    id: "orderDate",
    header: "Order Date",
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
    accessorKey: "inHandDate",
    id: "inHandDate",
    header: "Create Date",
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
    accessorKey: "daysOnList",
    
    id: "daysOnList",
    header: "Day on List",
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
    accessorKey: "noOfItems",
    
    id: "noOfItems",
    header: "# of Items",
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
    accessorKey: "pickPackStatus",
    id: "pickPackStatus",
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
        id: "linksFlag",
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
        id: "orderDate",
        index: 3,
      },
      {
        id: "inHandDate",
        index: 4,
      },
      {
        id: "daysOnList",
        index: 5,
      },
      {
        id: "noOfItems",
        index: 6,
      },
      {
        id: "pickPackStatus",
        index: 7,
      },
      {
        id: "action",
        index: 8,
      },
    ],
  },
  view2: {
    name: "view 2",
    id: 2,
    columns: [
      {
        id: "cost",
        index: 10,
      },
      {
        id: "createdBy",
        index: 9,
      },
      {
        id: "types",
        index: 8,
      },
      {
        id: "total",
        index: 11,
      },
     
    
      {
        id: "status",
        index: 7,
      },
      {
        id: "csr",
        index: 6,
      },
      {
        id: "salesperson",
        index: 5,
      },
      {
        id: "shipDate",
        index: 4,
      },
      {
        id: "customer",
        index: 3,
      },
      {
        id: "jobId",
        index: 2,
      },
      {
        id: "flags",
        index: 1,
      },
      {
        id: "number",
        index: 0,
      },
      {
        id: "action",
        index: 12,
      },
    ],
  },
};
