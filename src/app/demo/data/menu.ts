import { Navigation } from 'src/app/@theme/types/navigation';

export const menus: Navigation[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'item',
    classes: 'nav-item',
    url: '/dashboard',
    icon: '#custom-status-up'
  },
  {
    id: 'reports',
    title: 'Reports',
    type: 'collapse',
    classes: 'edge',
    url: '/reports',
    icon: '#custom-status-up',
    children: [
      {
        id: 'message',
        title: 'Messages',
        type: 'item',
        classes: 'nav-item',
        url: '/message',
      }
    ]
  },
  {
    id: 'tenants-or-users',
    title: 'Tenants / Users',
    type: 'collapse',
    icon: '#custom-status-up',
    classes: 'edge',
    children: [
      {
        id: 'usermangement',
        title: 'User Management',
        type: 'item',
        url: '/user'
      },
      {
        id: 'apiKeyManagement',
        title: 'API Key Management',
        type: 'item',
        url: '/user/api-key'
      },
      {
        id: 'webhookRegistry',
        title: 'Webhook Registry',
        type: 'item',
        url: '/user/webhook/registry'
      },
      {
        id: 'userSMSCMapping',
        title: 'User-SMSC Mapping',
        type: 'item',
        url: '/user/smsc-mapping'
      }
    ]
  },
  {
    id: 'messaging-setup',
    title: 'Messaging Setup',
    type: 'collapse',
    icon: '#custom-status-up',
    classes: 'edge',
    children: [
      {
        id: 'providers',
        title: 'Providers (Global)',
        type: 'item',
        url: '/providers'
      },
      {
        id: 'serviceTypes',
        title: 'Service Types (Global)',
        type: 'item',
        url: '/service-types'
      },
      {
        id: 'smscs',
        title: 'SMSCs (Global)',
        type: 'item',
        url: '/smscs'
      }
    ]
  },
  {
    id: 'messaging-entities',
    title: 'Messaging Entities',
    type: 'group',
    icon: '#icon-navigation',
    classes: 'edge',
    children: [
      {
        id: 'senders',
        title: 'Senders',
        type: 'collapse',
        icon: '#custom-status-up',
        classes: 'edge',
        children: [
          {
            id: 'sender-list',
            title: 'Sender List',
            type: 'item',
            url: '/sender'
          },
          {
            id: 'create-sender',
            title: 'Create Sender',
            type: 'item',
            url: '/sender/create'
          }
        ]
      },
      {
        id: 'templates',
        title: 'Templates',
        type: 'collapse',
        icon: '#custom-status-up',
        classes: 'edge',
        children: [
          {
            id: 'template-list',
            title: 'Template List',
            type: 'item',
            url: '/template'
          },
          {
            id: 'create-template',
            title: 'Create Template',
            type: 'item',
            url: '/template/create'
          }
        ]
      },
    ]
  },
  // {
  //   id: 'manage',
  //   title: 'MANAGE',
  //   type: 'collapse',
  //   icon: '#custom-setting-outline',
  //   children: [
  //     {
  //       id: 'senders',
  //       title: 'Senders',
  //       type: 'collapse',
  //       icon: '#custom-level',
  //       children: [
  //         {
  //           id: 'senderlist',
  //           title: 'Sender List',
  //           type: 'item',
  //           url: '/sender'
  //         },
  //         {
  //           id: 'createsender',
  //           title: 'Create Sender',
  //           type: 'item',
  //           url: '/sender/create'
  //         }
  //       ]
  //     },
  //     {
  //       id: 'templates',
  //       title: 'templates',
  //       type: 'collapse',
  //       icon: '#custom-level',
  //       children: [
  //         {
  //           id: 'templatelist',
  //           title: 'template List',
  //           type: 'item',
  //           url: '/template'
  //         },
  //         {
  //           id: 'createtemplate',
  //           title: 'Create Template',
  //           type: 'item',
  //           url: '/template/create'
  //         }
  //       ]
  //     }
  //   ]
  // }

];
