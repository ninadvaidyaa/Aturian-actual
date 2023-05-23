


import { z } from "zod";

export const managePrebillsListSchema = z.object({
    invoiceNum: z.number(),
    orderNumber: z.number(),
    custName: z.string(),
    custNumber: z.string(),
    amount: z.string(),
    amountPaid: z.string(),
    dueDate: z.array(z.string()),
    emailAddress: z.array(z.string()),
    invoiceDate: z.string(),
    preBillStatus: z.string(),
  });
  export type ManagePrebillsList = z.infer<typeof managePrebillsListSchema>;

