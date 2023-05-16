
import api from "./axios";
import { MANAGE_PROPOSAL_GET_ALL_API } from "constants/api.constants";
import { type ManageProposalList } from "validators/manageProposal.validator";


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

