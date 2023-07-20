export default {
  title: 'User',
  name: 'user',
  type: 'document',
  fields: [
    {title: 'username', name: 'username', type: 'string'},
    {title: 'Name', name: 'name', type: 'string'},
    {
      title: 'Email',
      name: 'email',
      type: 'string',
    },
    {
      title: 'UserProfileImage',
      name: 'userProfileImage',
      type: 'string',
    },
    {
      title: 'Calendar',
      name: 'calendar',
      type: 'reference',
      to: [{type: 'calendars'}],
    },
    {
      title: 'Bookmarks',
      name: 'bookmarks',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'post'}]}],
      validation: (Rule) => Rule.unique(),
    },
    {title: 'WagePerHour', name: 'wagePerHour', type: 'number'},
    {title: 'wagePerExtraHour', name: 'wagePerExtraHour', type: 'number'},
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'username',
    },
  },
}
