import { type ColumnDef } from "@tanstack/react-table";
import { type UserViews } from "types/userViews";


import { getFormattedDate } from "utils/date";
import StatusCell from "components/lib/ReactTable/StatusCell";



import RowActions from "./RowActions";
import { type PickPackOthersList } from "validators/inventory.validators";
import { Link } from "react-router-dom";





export const defaultColumns: Array<ColumnDef<PickPackOthersList>> = [

  
  
 
  {
    accessorKey: "orderNumber",
    id: "orderNumber",
    header: "PL #",
    cell: (info) => {
      const { table, row } = info;
      return (
        <Link
          to={`/pick-packs/${info.getValue() as string}`}
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
        id: "orderNumber",
        index: 0,
      },
      {
        id: "custName",
        index: 1,
      },
      {
        id: "orderDate",
        index: 2,
      },
      {
        id: "inHandDate",
        index: 3,
      },
      {
        id: "daysOnList",
        index: 4,
      },
      {
        id: "noOfItems",
        index: 5,
      },
      {
        id: "pickPackStatus",
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
        id: "orderDate",
        index: 0,
      },
      {
        id: "inHandDate",
        index: 1,
      },
      {
        id: "noOfItems",
        index: 2,
      },
     
      {
        id: "orderNumber",
        index: 3,
      },
      {
        id: "custName",
        index: 4,
      },
      
      {
        id: "daysOnList",
        index: 5,
      },
     
      {
        id: "pickPackStatus",
        index: 6,
      },
      {
        id: "action",
        index: 7,
      },
    ],
  },
};
