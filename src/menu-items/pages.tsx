

import { type NavItemType } from 'types/menu';

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages: NavItemType = {
  id: 'group-pages',
  title: "Orders",
  type: 'group',
  children: [
    {
      id: 'orders',
      title: "Orders",
      type: 'collapse',
      icon: 'orderIcon',
      children: [
        {
          id: 'order-list',
          
          title: 'Orders List',
          type: 'item',
          url: '/orders',
          target: true,
          breadcrumbsArray:[
            'Sales', 'Order List' 
          ]
        },
       
      ]
    },

    {
      id: 'customer',
      title: "Customers",
      type: 'collapse',
      icon: 'customerIcon',
      children: [
        {
          id: 'customer-list',
          
          title: 'Customers List',
          type: 'item',
          url: '/customers',
          target: true,
          breadcrumbsArray:[
            'Customers', 'Customers List'
          ]
        },
       
      ]
    },
   
  ]
};

export default pages;
