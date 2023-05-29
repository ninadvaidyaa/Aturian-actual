import { type NavItemType } from "types/menu";

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages: NavItemType = {
  id: "group-pages",
  title: "Orders",
  type: "group",
  children: [
    {
      id: "orders",
      title: "Orders",
      type: "collapse",
      icon: "orderIcon",
      children: [
        {
          id: "order-list",

          title: "Orders List",
          type: "item",
          url: "/orders",
          target: true,
          breadcrumbsArray: ["Sales", "Order List"],
        },
      ],
    },

    {
      id: "customer",
      title: "Customers",
      type: "collapse",
      icon: "customerIcon",
      children: [
        {
          id: "customer-list",

          title: "Customers List",
          type: "item",
          url: "/customers",
          target: true,
          breadcrumbsArray: ["Customers", "Customers List"],
        },
      ],
    },

    {
      id: "inventory",
      title: "Inventory",
      type: "collapse",
      icon: "inventoryIcon",
      children: [
        {
          id: "item-list",

          title: "Item List",
          type: "item",
          url: "/items",
          target: true,
          breadcrumbsArray: ["Inventory", "Inventory Items", "Items List"],
        },
        {
          id: "pick-pack-list",

          title: "Pick Pack",
          type: "item",
          url: "/pick-packs",
          target: true,
          breadcrumbsArray: ["Inventory", "Pick Pack", "Pick List"],
        },
      ],
    },

    {
      id: "proposals",
      title: "PROposals",
      type: "collapse",
      icon: "proposalIcon",
      children: [
        {
          id: "manager-proposal-list",
          title: "Proposal List",
          type: "item",
          url: "/proposals",
          target: true,
          breadcrumbsArray: ["Sales", "Proposal List"],
        },
        {
          id: "manager-quote-list",
          title: "Manage Quotes",
          type: "item",
          url: "/proposals/quotes",
          target: true,
          breadcrumbsArray: ["Sales", "Quotes List"],
        },
      ],
    },

    {
      id: "a/p",
      title: "A/P",
      type: "collapse",
      icon: "a/pIcon",
      children: [
        {
          id: "supplier-invoice",
          title: "Supplier Invoice",
          type: "collapse",
          children: [
            {
              id: "manage-supplier-invoice",
              title: "Manage Supplier Invoice",
              type: "item",
              url: "/supplier-invoices",
              breadcrumbsArray: [
                "Accounting",
                "A/P",
                "Invoice & Purchase",
                "Invoice List",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "suppliers",
      title: "Suppliers",
      type: "collapse",
      icon: "supplierIcon",
      children: [
        {
          id: "supplier-list",
          title: "Manage Suppliers",
          type: "item",
          url: "/suppliers",
          target: true,
          breadcrumbsArray: ["Vendor List"],
        },
      ],
    },
    {
      id: "invoicing",
      title: "Invoicing",
      type: "collapse",
      icon: "supplierIcon",
      children: [
        {
          id: "manage-prebills-list",
          title: "Manage Prebills",
          type: "item",
          url: "/invoices",
          target: true,
          breadcrumbsArray: [
            "Accounting",
            "Customer Invoicing",
            "Manage Cust Invoices",
            "Invoice List",
          ],
        },
        {
          id: "manage-cust-invoice-list",
          title: "Manage Cust Invoice",
          type: "item",
          url: "invoices/cust-invoices",
          target: true,
          breadcrumbsArray: [
            "Accounting",
            "Customer Invoicing",
            "Manage Cust Invoices",
            "Invoice List",
          ],
        },
      ],
    },
    {
      id: "accounting",
      title: "Accounting",
      type: "collapse",
      icon: "a/pIcon",
      children: [
        {
          id: "general-accounting",
          title: "General Accounting",
          type: "collapse",
          children: [
            {
              id: "display-gl-details",
              title: "Display G/L Details",
              type: "item",
              url: "/accounting/ga",
              breadcrumbsArray: [
                "Accounting",
                "General Accounting",
                "Display G/L Details",
              ],
            },
            {
              id: "single-gl-line-details",
              title: "Single G/L Line Item Details",
              type: "item",
              url: "/accounting/ga/single",
              breadcrumbsArray: [
                "Accounting",
                "General Accounting",
                "Single G/L Line Item Details",
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default pages;
