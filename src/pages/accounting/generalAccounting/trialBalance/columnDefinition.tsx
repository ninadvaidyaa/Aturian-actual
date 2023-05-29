import { type ColumnDef } from "@tanstack/react-table";
import { type TrailBalance } from 'validators/accounting.displayGLDetails.validators';

import { getUSCurrency } from 'utils/number';


export const defaultColumns : Array<ColumnDef<TrailBalance>> = [
   
  {
    accessorKey: "GLAccNum",
    id: "GLAccNum",
    header: "GL",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    size: 70,
    enableHiding: false,
    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableSorting: false,
    meta: {
      dataType: "string",
    },
  },
  {
        accessorKey: "GLAccdecs",
        id: "GLAccdecs",
        header: "GL Description",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        enableHiding: false,
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableSorting: false,
        meta: {
          dataType: "string",
        },
      },
     
    
     
      {
        accessorKey: "beginningBalance",
        id: "beginningBalance",
        header: "Beg. Bal ",
        cell: (info) => getUSCurrency(info.getValue() as number),
        footer: (props) => props.column.id,
        size: 80,
        enableSorting: false,
        enableColumnFilter: false,
        meta: {
          dataType: "string",
          isCurrency: true,
        },
      },
      {
        accessorKey: "endingBalance",
        id: "endingBalance",
        header: "Ending Bal ",
        cell: (info) => getUSCurrency(info.getValue() as number),
        footer: (props) => props.column.id,
        size: 80,
        enableSorting: false,
        enableColumnFilter: false,
        meta: {
          dataType: "string",
          isCurrency: true,
        },
      },
      {
        accessorKey: "amount",
        id: "amount",
        header: "Change ",
        cell: (info) => getUSCurrency(info.getValue() as number),
        footer: (props) => props.column.id,
        size: 80,
        enableSorting: false,
        enableColumnFilter: false,
        meta: {
          dataType: "string",
          isCurrency: true,
        },
      },
      {
        accessorKey: "details",
        id: "details",
        header: "Details ",
        cell: (info) => (
          <i className="fal fa-plus-circle -ml-1 mr-2 text-blue-600 font-bold w-full text-center"></i>
        ),
        
        size: 50,
        enableSorting: false,
        enableColumnFilter: false,
        meta: {
          dataType: "string",
          
        },
      }
];
