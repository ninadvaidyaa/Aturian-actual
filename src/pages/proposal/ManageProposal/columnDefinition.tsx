import { type ColumnDef } from "@tanstack/react-table";

import { type UserViews } from "types/userViews";

import { getFormattedDate } from "utils/date";
import StatusCell from "components/lib/ReactTable/StatusCell";
import RowActions from "./RowActions";
import { type ManageProposalList } from "validators/manageProposal.validator";
import { Link } from "react-router-dom";
import { selectedRowIdActions } from "./useTable";

export const useDefaultColumns = () => {
  const { setRowIds, resetAll } = selectedRowIdActions();
  const defaultColumns: Array<ColumnDef<ManageProposalList>> = [
    {
      accessorKey: "proposalNumber",
      id: "proposalNumber",
      header: "Proposal #",
      cell: ({ table, row, getValue }) => (
        <Link
          to={`/proposals/${getValue() as string}`}
          className={`inline-block h-full w-full text-primary-500 ${
            row.getIsSelected()
              ? "underline decoration-2 underline-offset-2"
              : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            table.toggleAllRowsSelected(false);
            row.toggleSelected(!row.getIsSelected());
            resetAll();
            setRowIds(row.original.proposalNumber);
          }}
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
      accessorKey: "proposalJobId",
      id: "proposalJobId",
      header: "Proposal Id",
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
      // accessorFn: (value) => value.customer, // option to keep all data
      // accessorFn: (value) => value.customer.name,
      accessorKey: "contactName",
      id: "contactName",
      header: "contact Name",
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
      accessorKey: "closeDate",
      id: "closeDate",
      header: "Close Date",
      cell: (info) =>
        info.getValue()
          ? ` ${getFormattedDate(
              info.getValue() as string,
              "M/D/YYYY h:mm:ss A"
            )}`
          : "-",
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
      accessorKey: "proposalValues",
      id: "proposalValues",
      header: "Value",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
      size: 100,
      enableSorting: true,
      meta: {
        dataType: "number",
      },
    },

    {
      accessorKey: "proposalStatus",
      id: "proposalStatus",
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
  return defaultColumns;
};
export const views: UserViews = {
  view1: {
    name: "view1",
    id: 1,
    columns: [
      {
        id: "proposalNumber",
        index: 0,
      },
      {
        id: "proposalJobId",
        index: 1,
      },
      {
        id: "custName",
        index: 2,
      },
      {
        id: "contactName",
        index: 3,
      },
      {
        id: "dateCreated",
        index: 4,
      },
      {
        id: "closeDate",
        index: 5,
      },
      {
        id: "expirationDate",
        index: 6,
      },
      {
        id: "proposalValues",
        index: 7,
      },

      {
        id: "proposalStatus",
        index: 8,
      },
      {
        id: "action",
        index: 9,
      },
    ],
  },
  view2: {
    name: "view 2",
    id: 2,
    columns: [
      {
        id: "custName",
        index: 0,
      },
      {
        id: "contactName",
        index: 1,
      },

      {
        id: "proposalValues",
        index: 2,
      },
      {
        id: "proposalNumber",
        index: 3,
      },
      {
        id: "proposalJobId",
        index: 4,
      },

      {
        id: "dateCreated",
        index: 5,
      },
      {
        id: "closeDate",
        index: 6,
      },
      {
        id: "expirationDate",
        index: 7,
      },

      {
        id: "proposalStatus",
        index: 8,
      },
      {
        id: "action",
        index: 9,
      },
    ],
  },
};
