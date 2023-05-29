
import { z } from "zod";
export interface GLDetails {
    accountNo: string,
    description: string,
    bookPeriod : string,
    dateClosed: string,
    source: string,
    transactionAmount: number,
    debit: number,
    credit:number,
}

export const multiGLDetailsSchema = z.object({

    type: z.string(),
    invoicenum: z.string(),
    journal : z.string(),
    invoicedate: z.string(),
    source: z.string(),
    amount: z.number(),
    itemName: z.string(),
    memo: z.string(),
});
    

export type MultiGLDetails = z.infer<typeof multiGLDetailsSchema>;


export const trialBalanceSchema = z.object({
    GLAccNum: z.number(),
    GLAccdecs: z.string(),
    beginningBalance: z.string(),
    endingBalance: z.string(),
    amount: z.string(),
    });
  
  export type TrailBalance = z.infer<typeof trialBalanceSchema>;


