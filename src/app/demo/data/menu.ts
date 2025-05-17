import { Navigation } from 'src/app/@theme/types/navigation';

export const menus: Navigation[] = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'Dashboard',
        title: 'Dashboard',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard',
        icon: '#custom-status-up'
      }
    ]
  },
  {
    id: 'features',
    title: 'Features',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'senders',
        title: 'Senders',
        type: 'collapse',
        icon: '#custom-level',
        children: [
          {
            id: 'senderlist',
            title: 'Sender List',
            type: 'item',
            url: '/sender'
          },
          {
            id: 'createsender',
            title: 'Create Sender',
            type: 'item',
            url: '/sender/create'
          }
        ]
      },
      {
        id: 'templates',
        title: 'templates',
        type: 'collapse',
        icon: '#custom-level',
        children: [
          {
            id: 'templatelist',
            title: 'template List',
            type: 'item',
            url: '/template'
          },
          {
            id: 'createtemplate',
            title: 'Create Template',
            type: 'item',
            url: '/template/create'
          }
        ]
      }
    ]
  },
];
