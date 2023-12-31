import { z } from "zod";

export const supplierListSchema = z.object({
  id: z.number(),
  number: z.string(),
  name: z.string(),
  aliases: z.array(z.string()),
  contact: z.object({
    general: z.object({
      name: z.string(),
      email: z.array(z.string()),
      phone: z.string(),
    }),
  }),
  preferred: z.object({
    isPreferred: z.boolean(),
    dealInformation: z.string(),
  }),
});
export type SupplierList = z.infer<typeof supplierListSchema>;

/**
 * {
            "id": 5,
            "number": "000005",
            "name": "365 Wholesale",
            "aliases": [
                "3651",
                "wholesale",
                "bhi"
            ],
            "contact": {
                "general": {
                    "name": "",
                    "email": [
                        "vendor@aturian.com",
                        "romar@aturian.com"
                    ],
                    "phone": "631-667-6664"
                }
            },
            "preferred": {
                "isPreferred": true,
                "dealInformation": "EQP Pricing, Free Priority Shipping"
            },
            "raw": {
                "vendorId": 5,
                "vendorNumber": "000005",
                "name": "365 Wholesale",
                "line": null,
                "isThisSupplier": true,
                "alias1": "3651",
                "alias2": "wholesale",
                "alias3": "bhi",
                "message": null,
                "emailAddressGeneral": "vendor@aturian.com,romar@aturian.com",
                "telephone1": "631-667-6664",
                "contactName": "",
                "vendorPayment": {
                    "vendorId": 0,
                    "vendorYTDPayment": null,
                    "vendorPayHistory": null,
                    "message": "No Record Found",
                    "vendorNumber": null,
                    "name": null,
                    "line": null,
                    "isThisSupplier": false,
                    "termDesc": null,
                    "termType": 0,
                    "termDueDay": 0,
                    "termDiscount": 0,
                    "termDiscntDay": 0,
                    "isAcknowledgeOrder": false,
                    "isOfferRebate": false,
                    "isForm1099": false,
                    "isCreditCard": false,
                    "isPromptedAddress": false,
                    "accountNo": null,
                    "taxId": null,
                    "vendorMessageCodeId": 0,
                    "paymentTypeId": 0,
                    "paymentType": 0,
                    "paymentTypeDesc": null,
                    "UPIC": null,
                    "EPSANum": null,
                    "alias1": null,
                    "alias2": null,
                    "alias3": null,
                    "vendorMsgCode": null,
                    "vendorMsgDesc": null,
                    "vendorAccNo": null,
                    "vendorSelection": null,
                    "vendorAddress": null,
                    "vendorContact": null,
                    "invoiceGLAccount": null,
                    "vendorCommMethod": null,
                    "orderType": null,
                    "decoratorId": 0,
                    "venDecoId": null,
                    "vendorDtls": null,
                    "decoratorDtls": null,
                    "orderItem": null,
                    "isDecoratorEmail": 0,
                    "lastUpdatedDate": null,
                    "updatedBy": null,
                    "orderItemAddress": null,
                    "defaultDiscount": 0,
                    "vendorChart": null,
                    "vendorChartDetails": null,
                    "vendorChartMonthlyDetails": null,
                    "APCheckNumE": null,
                    "APCheckNumD": null,
                    "APCheckNumW": null,
                    "APCheckNumC": null,
                    "lastClientCheckNum": null,
                    "isPreferred": 0,
                    "preferredLevel": 0,
                    "dealGroup": 0,
                    "dealInformation": null,
                    "vendorSecretKey": null,
                    "vendorType": null,
                    "APCheckNumACH": null,
                    "APCheckNumBP": null,
                    "APCheckNumPP": null,
                    "vendorRebatesId": 0,
                    "ItemErrorMargin": 0,
                    "OrderErrorMargin": 0,
                    "suppShipViaId": 0,
                    "shipViaCode": null,
                    "shipViaDesc": null,
                    "shipViaCarrierCodeId": 0,
                    "custShipViaId": 0,
                    "custShipViaCode": null,
                    "custShipViaDesc": null,
                    "custShipViaCarrierCodeId": 0,
                    "brandingId": 0,
                    "isPODefaultShippingMsg": 0,
                    "isDecoPODefaultShippingMsg": 0
                },
                "vendorAddress": [
                    {
                        "vendorId": 0,
                        "vendorAddressId": 13,
                        "attention": "nikhil ent",
                        "companyName": "365 Wholesale",
                        "streetLine1": "60 South, 2nd St, Ste K",
                        "streetLine2": "",
                        "city": "Deer Park",
                        "stateId": 35,
                        "postalCode": "11729",
                        "countryId": 232,
                        "addConatctInfo": "Additional Contact Information",
                        "APVendorId": -1,
                        "addressType": 1,
                        "addressTypeDesc": null,
                        "vendorName": "",
                        "vendorNumber": "",
                        "stateCode": "NY",
                        "stateDesc": "New York",
                        "countryCode": "USA",
                        "countryDesc": "United States of America",
                        "message": null,
                        "telephone1": null,
                        "telephone2": null,
                        "fax": null,
                        "contactName": null,
                        "isInternational": 0,
                        "emailAddress": null,
                        "streetLine3": null,
                        "streetLine4": null
                    },
                    {
                        "vendorId": 0,
                        "vendorAddressId": 14,
                        "attention": "",
                        "companyName": "365 Wholesale",
                        "streetLine1": "60 South, 2nd St, Ste K",
                        "streetLine2": "",
                        "city": "Deer Park",
                        "stateId": 35,
                        "postalCode": "11729",
                        "countryId": -1,
                        "addConatctInfo": "",
                        "APVendorId": -1,
                        "addressType": 2,
                        "addressTypeDesc": null,
                        "vendorName": "",
                        "vendorNumber": "",
                        "stateCode": "NY",
                        "stateDesc": "New York",
                        "countryCode": "",
                        "countryDesc": "",
                        "message": null,
                        "telephone1": null,
                        "telephone2": null,
                        "fax": null,
                        "contactName": null,
                        "isInternational": 0,
                        "emailAddress": null,
                        "streetLine3": null,
                        "streetLine4": null
                    },
                    {
                        "vendorId": 0,
                        "vendorAddressId": 15,
                        "attention": "",
                        "companyName": "365 Wholesale",
                        "streetLine1": "60 South, 2nd St, Ste K",
                        "streetLine2": "",
                        "city": "Deer Park",
                        "stateId": 35,
                        "postalCode": "11729",
                        "countryId": -1,
                        "addConatctInfo": "",
                        "APVendorId": -1,
                        "addressType": 3,
                        "addressTypeDesc": null,
                        "vendorName": "",
                        "vendorNumber": "",
                        "stateCode": "NY",
                        "stateDesc": "New York",
                        "countryCode": "",
                        "countryDesc": "",
                        "message": null,
                        "telephone1": null,
                        "telephone2": null,
                        "fax": null,
                        "contactName": null,
                        "isInternational": 0,
                        "emailAddress": null,
                        "streetLine3": null,
                        "streetLine4": null
                    }
                ],
                "defaultDiscount": 0,
                "ispreferred": 1,
                "dealInformation": "EQP Pricing, Free Priority Shipping",
                "Title": null,
                "Titledescription": null,
                "taskType": 0,
                "userEventId": 0,
                "isNoteExist": 1
            }
        }
  */
