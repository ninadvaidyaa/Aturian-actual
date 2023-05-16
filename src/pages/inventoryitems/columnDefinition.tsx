import { type ColumnDef } from "@tanstack/react-table";
import { type UserViews } from "types/userViews";


import StatusCell from "components/lib/ReactTable/StatusCell";
import { type InventoryItemsList } from "validators/inventoryItems.validators";
import RowActions from "./RowActions";
import { Link } from "react-router-dom";




export const defaultColumns: Array<ColumnDef<InventoryItemsList>> = [

  {
    accessorKey: "itemNumber",
    id: "itemNumber",
    header: "Cust Item #",
    // cell: (info) => info.getValue(),
    cell: (info) => {
      const { table, row } = info;
      return (
        <Link
          to={`/items/${info.getValue() as string}`}
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
    enableHiding: false,
    enableSorting: true,
    meta: {
      dataType: "string",
    },
  },

  {
    accessorKey: "externalItemNumber",
    id: "externalItemNumber",
    header: "Ext. Item #",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    size: 180,
    enableSorting: true,
    meta: {
      dataType: "string",
    },
  },
  {
   
    accessorKey: "alias1",
    id: "alias1",
    header: "Alias(es)",
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
  
    accessorKey: "supplierItemNumber",
    id: "supplierItemNumber",
    header: "Vendor Item #",
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
    accessorKey: "custNumber",
    
    id: "custNumber",
    header: "Customer #",
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
    accessorKey: "primaryDesc",
    id: "primaryDesc",
    header: "Item Description",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    size: 180,
    enableSorting: true,
    meta: {
      dataType: "string",
      
    },
  },
  {
    accessorKey: "categoryDesc",
    id: "categoryDesc",
    header: "Item Category",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    size: 180,
    enableSorting: true,
    meta: {
      dataType: "string",
      isSelectable: true,
    },
  },

  {
    accessorKey: "typeItemDesc",
    id: "typeItemDesc",
    header: "Item Type",
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
    accessorKey: "itemStatus",
    id: "itemStatus",
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
        id: "itemNumber",
        index: 0,
      },
      {
        id: "externalItemNumber",
        index: 1,
      },
      {
        id: "alias1",
        index: 2,
      },
      {
        id: "supplierItemNumber",
        index: 3,
      },
      {
        id: "custNumber",
        index: 4,
      },
      {
        id: "custName",
        index: 5,
      },
      {
        id: "primaryDesc",
        index: 6,
      },
      {
        id: "categoryDesc",
        index: 7,
      },
      {
        id: "typeItemDesc",
        index: 8,
      },
      {
        id: "itemStatus",
        index: 9,
      },
      {
        id: "action",
        index: 10,
      },
    ],
  },
  view2: {
    name: "view 2",
    id: 2,
    columns: [
      {
        id: "supplierItemNumber",
        index: 0,
      },

      {
        id: "itemNumber",
        index: 1,
      },
      {
        id: "alias1",
        index: 2,
      },

      {
        id: "custNumber",
        index: 3,
      },
      {
        id: "custName",
        index: 4,
      },


      {
        id: "externalItemNumber",
        index: 5,
      },
     
     
    
      {
        id: "primaryDesc",
        index: 6,
      },
      {
        id: "categoryDesc",
        index: 7,
      },
      {
        id: "typeItemDesc",
        index: 8,
      },
      {
        id: "itemStatus",
        index: 9,
      },
      {
        id: "action",
        index: 10,
      },
    ],
  },
};
