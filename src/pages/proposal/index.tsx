import Loadable from "components/Loadable";
import { lazy } from "react";

export const ManageProposalPage = Loadable(
  lazy(async () => await import("./ManageProposal"))
);
export const ManageQuotePage = Loadable(
  lazy(async () => await import("./ManageQuotes"))
);
export const ProposalDetailPage = Loadable(
  lazy(async () => await import("./ProposalDetalisPage"))
);

export const QuoteDetailPage = Loadable(
  lazy(async () => await import("./ManageQuotes/QuotesDetailPage"))
);
