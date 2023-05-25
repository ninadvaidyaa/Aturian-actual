import { type ColumnDef } from "@tanstack/react-table";

import { type UserViews } from "types/userViews";

import { getFormattedDate } from "utils/date";
import StatusCell from "components/lib/ReactTable/StatusCell";
import RowActions from "./RowActions";
import { type ManageQuotesList } from "validators/manageProposal.validator";
import { Link } from "react-router-dom";
import { selectedRowIdActions } from "./useTable";

export const useDefaultColumns = () => {
  const { setRowIds, resetAll } = selectedRowIdActions();
  const defaultColumns: Array<ColumnDef<ManageQuotesList>> = [
    {
      accessorKey: "quoteNumber",
      id: "quoteNumber",
      header: "Quote #",
      cell: ({ table, row, getValue }) => (
        <Link
          to={`/proposals/quotes/${getValue() as string}`}
          onClick={(e) => {
            e.stopPropagation();
            table.toggleAllRowsSelected(false);
            row.toggleSelected(!row.getIsSelected());
            resetAll();
            setRowIds(row.original.quoteNumber);
          }}
          className={`inline-block h-full w-full text-skin-primary ${
            row.getIsSelected()
              ? "underline decoration-2 underline-offset-2"
              : ""
          }`}
        >
          {getValue() as string}
        </Link>
      ),
      footer: (props) => props.column.id,
      size: 160,

      enableHiding: false,
      enableSorting: true,
      meta: {
        dataType: "string",
      },
    },

    {
      accessorKey: "custName",
      id: "custName",
      header: "Customer Name",
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
      // accessorFn: (value) => value.customer, // option to keep all data
      // accessorFn: (value) => value.customer.name,
      accessorKey: "jobId",
      id: "jobId",
      header: "Job ID",
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
      // accessorFn: (value) => value.customer, // option to keep all data
      // accessorFn: (value) => value.customer.name,
      accessorKey: "ProposalCommentCount",
      id: "ProposalCommentCount",
      header: "Proposal #",
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
      accessorKey: "salesmanName",
      id: "salesmanName",
      header: "Sales Person",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
      size: 180,
      enableSorting: true,
      meta: {
        dataType: "string",
      },
    },
    {
      accessorKey: "CSRName",
      id: "CSRName",
      header: "Admin/CRS",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
      size: 180,
      enableSorting: true,
      meta: {
        dataType: "string",
      },
    },

    {
      accessorKey: "dateCreated",
      id: "dateCreated",
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
      accessorKey: "expirationDate",
      id: "expirationDate",
      header: "Expiration Date",
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
      accessorKey: "newQuoteStatus",
      id: "newQuoteStatus",
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
      accessorKey: "totalAmount",
      id: "totalAmount",
      header: "Amount",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
      size: 180,
      enableSorting: true,
      meta: {
        dataType: "number",
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

  return defaultColumns;
};
export const views: UserViews = {
  view1: {
    name: "view1",
    id: 1,
    columns: [
      {
        id: "quoteNumber",
        index: 0,
      },
      {
        id: "custName",
        index: 1,
      },
      {
        id: "custNumber",
        index: 2,
      },
      {
        id: "jobId",
        index: 3,
      },
      {
        id: "ProposalCommentCount",
        index: 4,
      },
      {
        id: "salesmanName",
        index: 5,
      },
      {
        id: "CSRName",
        index: 6,
      },
      {
        id: "dateCreated",
        index: 7,
      },

      {
        id: "expirationDate",
        index: 8,
      },
      {
        id: "newQuoteStatus",
        index: 9,
      },
      {
        id: "totalAmount",
        index: 10,
      },
      {
        id: "action",
        index: 11,
      },
    ],
  },
  view2: {
    name: "view 2",
    id: 2,
    columns: [
      {
        id: "custNumber",
        index: 0,
      },
      {
        id: "jobId",
        index: 1,
      },

      {
        id: "dateCreated",
        index: 2,
      },
      {
        id: "quoteNumber",
        index: 3,
      },
      {
        id: "custName",
        index: 4,
      },

      {
        id: "ProposalCommentCount",
        index: 5,
      },
      {
        id: "salesmanName",
        index: 6,
      },
      {
        id: "CSRName",
        index: 7,
      },

      {
        id: "expirationDate",
        index: 8,
      },
      {
        id: "newQuoteStatus",
        index: 9,
      },
      {
        id: "totalAmount",
        index: 10,
      },
      {
        id: "action",
        index: 11,
      },
    ],
  },
};
