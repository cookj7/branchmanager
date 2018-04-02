export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'primary',
        text: 'NEW'
      }
    },
    {
      title: true,
      name: 'Bookings',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Van hire',
      url: '/vanhire',
      icon: 'fa fa-truck',
      children: [
        {
          name: 'Dashboard',
          url: '/vanhire',
          icon: 'icon-speedometer'
        },
        {
          name: 'Check-out',
          url: '/vanhire/checkout',
          icon: 'fa fa-chevron-circle-right'
        },
        {
          name: 'Check-in',
          url: '/vanhire/checkin',
          icon: 'fa fa-chevron-circle-left'
        },
        {
          name: 'Refund',
          url: '/vanhire/refund',
          icon: 'icon-calculator'
        }
      ]
    },
    {
      title: true,
      name: 'Compliance',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Overview',
      url: '/compliance',
      icon: 'icon-speedometer'
    },
    {
      name: 'Approve Documents',
      url: '/compliance/approve-documents',
      icon: 'icon-layers'
    },
    {
      name: 'Refund Approval',
      url: '/compliance/approve-refund',
      icon: 'fa fa-check-square-o'
    },

    {
      title: true,
      name: 'Account'
    },
    {
      name: 'Settings',
      url: '/account/settings',
      icon: 'fa fa-wrench'
    },
    {
      name: 'Logout',
      url: '/security/login',
      icon: 'icon-lock'
    },
  ]
}
