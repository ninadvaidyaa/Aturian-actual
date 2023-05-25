import api from "./axios";
import {
  MANAGE_PROPOSAL_GET_ALL_API,
  MANAGE_QUOTES_GET_ALL_API,
} from "constants/api.constants";
import {
  type ManageQuotesList,
  type ManageProposalList,
} from "validators/manageProposal.validator";

export const fetchAllManageProposal = async (
  offset: number = 0,
  limit: number = 50,
  q: string = ""
) => {
  const resp = await api.get<{ data: ManageProposalList[]; total: number }>(
    `${MANAGE_PROPOSAL_GET_ALL_API}?offset=${offset}&limit=${limit}${
      q ? `&${q}` : ""
    }`
  );
  return resp.data;
};

export const fetchAllManageQuotes = async (
  offset: number = 0,
  limit: number = 50,
  q: string = ""
) => {
  const resp = await api.get<{ data: ManageQuotesList[]; total: number }>(
    `${MANAGE_QUOTES_GET_ALL_API}?offset=${offset}&limit=${limit}${
      q ? `&${q}` : ""
    }`
  );
  return resp.data;
};
