/* eslint-disable @typescript-eslint/restrict-template-expressions */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { rest } from "msw";
import * as apiConstants from "constants/api.constants";
import { orderData } from "./orders";
import { settings } from "config";
import { customerData } from "./customers";
import { opsStatusData } from "./ops.status";
import { flagsData } from "./flags";
import { inventoryItemsListData } from "./inventoryItems";
import { managePraposalListData } from "./manageroposal";
import { pickPackOtherListData } from "./pickPackOthers";
import { manageSupplierInvoiceListData } from "./manageSupplierInvoice";
import { supplierListData } from "./supliers";

const baseApiUrl = import.meta.env.VITE_BASE_URL;
export const handlers = [
  rest.post(`${baseApiUrl}${apiConstants.LOGIN_API}`, async (req, res, ctx) => {
    const data = await req.json();
    if (data.username === "demo@email.com" && data.password === "demo") {
      return await res(
        ctx.status(200),
        ctx.json({
          access_token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Im94elp0a29YSTdnT1E5WE5XOFNBS1lKdXBiTTJhYV9neG9FZGNBeHpoQ0kifQ.eyJjbHQiOiJkZW1vIiwic3ViIjoiZDY4M2I1MTItZmY3NC00YWY0LWFjNjctYjJhOGY1YjVjODQxIiwiaXNzIjoiaHR0cHM6Ly9taWxreXdheS5lcnAubmV0d29yayIsImp0aSI6IjQ1Y2E5NDlkLTFkZjctNDYzZC04NGQxLTcxNjIwNDM3ZjY0NCIsImlhdCI6MTY4MTg3ODMxOCwiZXhwIjoxNjgxODgwMTE4fQ.LQu4QpcMXKcH_WowHCW1cZCxMkkTcj5EtH7-JEd_9qKfagSi7xD5GCVprQb8LUiH27XR1VuXHm5azCg2EiL66DMS5dtG_fc5sSWG2GFjG3ufT0ZtCg70He1GqOaVJaHySSyif0H1ooWOXURjGcnYxt675H0Dv0XsK70uSLtqD-Q",
          refresh_token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Im94elp0a29YSTdnT1E5WE5XOFNBS1lKdXBiTTJhYV9neG9FZGNBeHpoQ0kifQ.eyJpc3MiOiJodHRwczovL21pbGt5d2F5LmVycC5uZXR3b3JrIiwic3ViIjoiZDY4M2I1MTItZmY3NC00YWY0LWFjNjctYjJhOGY1YjVjODQxIiwiY2x0IjoiZGVtbyIsInNjb3BlIjpbInJlZnJlc2hUb2tlbiJdLCJqdGkiOiJmMGRlMmNkZC05NDRmLTQ0NWMtYjRmOS1lMmQ3NWUzNGJhMDciLCJpYXQiOjE2ODE4NzgzMTgsImV4cCI6MTY4MTkyODcxOH0.bHf-2PR_agd4WKQmfBMCEYpQQdcRu8udf0jUm_3GT468LxS2pKjk2IUQOcYEaKBEle-xiUEC29rlYi2_Aphr7GO9VobVRaWnXCozHwK5o6hqHSfzUkJ57pTxiV1Esf5_W_AvRgCdhkeLgk4LZgQ-pKD5nk0uxYY8kYOHwHFuaXY",
        })
      );
    }
    return await res(ctx.status(401));
  }),
  rest.post(
    `${baseApiUrl}${apiConstants.REFRESH_API}`,
    async (req, res, ctx) =>
      await res(
        ctx.status(200),
        ctx.json({
          access_token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Im94elp0a29YSTdnT1E5WE5XOFNBS1lKdXBiTTJhYV9neG9FZGNBeHpoQ0kifQ.eyJjbHQiOiJkZW1vIiwic3ViIjoiZDY4M2I1MTItZmY3NC00YWY0LWFjNjctYjJhOGY1YjVjODQxIiwiaXNzIjoiaHR0cHM6Ly9taWxreXdheS5lcnAubmV0d29yayIsImp0aSI6IjQ1Y2E5NDlkLTFkZjctNDYzZC04NGQxLTcxNjIwNDM3ZjY0NCIsImlhdCI6MTY4MTg3ODMxOCwiZXhwIjoxNjgxODgwMTE4fQ.LQu4QpcMXKcH_WowHCW1cZCxMkkTcj5EtH7-JEd_9qKfagSi7xD5GCVprQb8LUiH27XR1VuXHm5azCg2EiL66DMS5dtG_fc5sSWG2GFjG3ufT0ZtCg70He1GqOaVJaHySSyif0H1ooWOXURjGcnYxt675H0Dv0XsK70uSLtqD-Q",
          refresh_token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Im94elp0a29YSTdnT1E5WE5XOFNBS1lKdXBiTTJhYV9neG9FZGNBeHpoQ0kifQ.eyJpc3MiOiJodHRwczovL21pbGt5d2F5LmVycC5uZXR3b3JrIiwic3ViIjoiZDY4M2I1MTItZmY3NC00YWY0LWFjNjctYjJhOGY1YjVjODQxIiwiY2x0IjoiZGVtbyIsInNjb3BlIjpbInJlZnJlc2hUb2tlbiJdLCJqdGkiOiJmMGRlMmNkZC05NDRmLTQ0NWMtYjRmOS1lMmQ3NWUzNGJhMDciLCJpYXQiOjE2ODE4NzgzMTgsImV4cCI6MTY4MTkyODcxOH0.bHf-2PR_agd4WKQmfBMCEYpQQdcRu8udf0jUm_3GT468LxS2pKjk2IUQOcYEaKBEle-xiUEC29rlYi2_Aphr7GO9VobVRaWnXCozHwK5o6hqHSfzUkJ57pTxiV1Esf5_W_AvRgCdhkeLgk4LZgQ-pKD5nk0uxYY8kYOHwHFuaXY",
        })
      )
  ),
  rest.get(
    `${settings.apiBase}${apiConstants.ORDERS_GET_ALL_API}`,
    async (req, res, ctx) => {
      const offset: number = req.url.searchParams.get("offset")
        ? parseInt(req.url.searchParams.get("offset"))
        : 0;
      const limit: number = req.url.searchParams.get("limit")
        ? parseInt(req.url.searchParams.get("limit"))
        : 1;
      return await res(
        ctx.status(200),
        ctx.json({
          data: orderData.slice(offset * limit, offset * limit + limit),
          results: orderData.length,
        })
      );
    }
  ),
  rest.get(
    `${settings.apiBase}${apiConstants.SETTINGS_GET_ALL_STATUS}`,
    async (req, res, ctx) =>
      await res(
        ctx.status(200),
        ctx.json({
          data: opsStatusData,
          results: opsStatusData.length,
        })
      )
  ),
  rest.get(
    `${settings.apiBase}${apiConstants.SETTINGS_GET_ALL_FLAG}`,
    async (req, res, ctx) =>
      await res(
        ctx.status(200),
        ctx.json({
          data: flagsData,
          results: flagsData.length,
        })
      )
  ),
  rest.get(
    `${settings.apiBase}${apiConstants.CUSTOMER_GET_ALL_API}`,
    async (req, res, ctx) => {
      const offset: number = req.url.searchParams.get("offset")
        ? parseInt(req.url.searchParams.get("offset"))
        : 0;
      const limit: number = req.url.searchParams.get("limit")
        ? parseInt(req.url.searchParams.get("limit"))
        : 1;
      return await res(
        ctx.status(200),
        ctx.json({
          data: customerData.slice(offset * limit, offset * limit + limit),
          total: customerData.length,
        })
      );
    }
  ),

  rest.get(
    `${settings.apiBase}${apiConstants.INVENTORY_ITEMS_GET_ALL_API}`,
    async (req, res, ctx) => {
      const offset: number = req.url.searchParams.get("offset")
        ? parseInt(req.url.searchParams.get("offset"))
        : 0;
      const limit: number = req.url.searchParams.get("limit")
        ? parseInt(req.url.searchParams.get("limit"))
        : 1;
      return await res(
        ctx.status(200),
        ctx.json({
          data: inventoryItemsListData.slice(
            offset * limit,
            offset * limit + limit
          ),
          total: inventoryItemsListData.length,
        })
      );
    }
  ),

  rest.get(
    `${settings.apiBase}${apiConstants.SUPPLIERS_GET_ALL_API}`,
    async (req, res, ctx) => {
      const offset: number = req.url.searchParams.get("offset")
        ? parseInt(req.url.searchParams.get("offset"))
        : 0;
      const limit: number = req.url.searchParams.get("limit")
        ? parseInt(req.url.searchParams.get("limit"))
        : 1;
      return await res(
        ctx.status(200),
        ctx.json({
          data: supplierListData.slice(offset * limit, offset * limit + limit),
          total: supplierListData.length,
        })
      );
    }
  ),

  rest.get(
    `${settings.apiBase}${apiConstants.MANAGE_PROPOSAL_GET_ALL_API}`,
    async (req, res, ctx) => {
      const offset: number = req.url.searchParams.get("offset")
        ? parseInt(req.url.searchParams.get("offset"))
        : 0;
      const limit: number = req.url.searchParams.get("limit")
        ? parseInt(req.url.searchParams.get("limit"))
        : 1;
      return await res(
        ctx.status(200),
        ctx.json({
          data: managePraposalListData.slice(
            offset * limit,
            offset * limit + limit
          ),
          total: managePraposalListData.length,
        })
      );
    }
  ),

  rest.get(
    `${settings.apiBase}${apiConstants.PICK_PACK_OTHERS_GET_ALL_API}`,
    async (req, res, ctx) => {
      const offset: number = req.url.searchParams.get("offset")
        ? parseInt(req.url.searchParams.get("offset"))
        : 0;
      const limit: number = req.url.searchParams.get("limit")
        ? parseInt(req.url.searchParams.get("limit"))
        : 1;
      return await res(
        ctx.status(200),
        ctx.json({
          data: pickPackOtherListData.slice(
            offset * limit,
            offset * limit + limit
          ),
          total: pickPackOtherListData.length,
        })
      );
    }
  ),
  rest.get(
    `${settings.apiBase}${apiConstants.MANAGE_SUPPLIER_INVOICES_GET_ALL_API}`,
    async (req, res, ctx) => {
      const offset: number = req.url.searchParams.get("offset")
        ? parseInt(req.url.searchParams.get("offset"))
        : 0;
      const limit: number = req.url.searchParams.get("limit")
        ? parseInt(req.url.searchParams.get("limit"))
        : 1;
      return await res(
        ctx.status(200),
        ctx.json({
          data: manageSupplierInvoiceListData.slice(
            offset * limit,
            offset * limit + limit
          ),
          total: manageSupplierInvoiceListData.length,
        })
      );
    }
  ),
];
