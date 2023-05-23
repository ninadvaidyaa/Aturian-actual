import { z } from "zod";
export interface ManageProposalList {
  proposalNumber: number;
  proposalJobId: string;
  custName: string;
  contactName: string;
  dateCreated: string;
  closeDate: string;
  expirationDate: string;
  proposalValues: number;
  notes: string;
  proposalStatus: string;
}


export const manageQuotesListSchema = z.object({
  quoteNumber: z.number(),
  custName: z.string(),
  custNumber: z.string(),
  jobId: z.array(z.string()),
  
  ProposalCommentCount: z.string(),
  salesmanName: z.string(),
  CSRName: z.string(),
  dateCreated: z.array(z.string()),

  expirationDate: z.number(),
  newQuoteStatus: z.string(),
  totalAmount: z.string(),
  
});
export type ManageQuotesList = z.infer<typeof manageQuotesListSchema>;