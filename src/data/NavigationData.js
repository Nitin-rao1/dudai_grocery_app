const NavigationData = [
  {
    my_profile: [
      {
        icon_type: 'Feather',
        left_icon_name: 'edit-3',
        label: 'Edit Profile',
        navigation:'EditProfile'
      },
      {
        icon_type: 'MaterialIcons',
        left_icon_name: 'keyboard-control',
        label: 'Change Password',
        navigation:'ChangePassword'

      },
      {
        icon_type: 'Entypo',
        left_icon_name: 'mobile',
        label: 'Change Mobile Number',
        navigation:'ChangeMobileNumber'
      },
      {
        icon_type: 'Feather',
        left_icon_name: 'mail',
        label: 'Change Email Address',
        navigation:'ChangeEmail'
      },
      {
        icon_type: 'Feather',
        left_icon_name: 'mail',
        label: 'Notification',
        navigation:'NotificationList'
      },
      // {
      //   left_icon_name: 'shopping-bag',
      //   label: 'Orders',
      // },
      // {
      //   left_icon_name: 'heart',
      //   label: 'Wishlist',
      // },
      // {
      //   left_icon_name: 'dollar-sign',
      //   label: 'My Wallet',
      // },
      // {
      //   left_icon_name: 'credit-card',
      //   label: 'Payment Methods',
      // },
      // {
      //   left_icon_name: 'percent',
      //   label: 'Coupons',
      // },
      // {
      //   left_icon_name: 'bell',
      //   label: 'Notifications',
      // },
      // {
      //   left_icon_name: 'settings',
      //   label: 'Settings',
      // },
      {
        icon_type: 'Feather',
        left_icon_name: 'map-pin',
        label: 'Add Address',
        navigation:'DeliveryAddress'
      },
    ],
  },
  {
    settings: [
      {
        section_title: 'Messaging',
        labels: [
          {
            label: 'Notification Preferences',
            has_route: true,
            type: 'Link',
          },
          {
            label: 'Email',
            has_route: false,
            type: 'Link',
          },
          {
            label: 'SMS & Alert',
            has_route: false,
            type: 'Link',
          },
        ],
      },
      {
        section_title: 'Appearance',
        labels: [
          {
            label: 'Theme',
            type: 'Switch',
          },
        ],
      },
      {
        section_title: 'Other',
        labels: [
          {
            label: 'Languages',
            has_route: true,
            type: 'Link',
          },
          {
            label: 'Currency',
            has_route: false,
            type: 'Link',
          },
        ],
      },
    ],
  },
];

// Exporting
export default NavigationData;
