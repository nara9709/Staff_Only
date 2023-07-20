export default {
  title: 'Calendars',
  name: 'calendars',
  type: 'document',
  fields: [
    {title: 'User', name: 'user', type: 'reference', to: [{type: 'user'}]},
    {
      title: 'Days',
      name: 'days',
      type: 'array',
      of: [
        {
          title: 'Day',
          name: 'day',
          type: 'document',
          fields: [
            {title: 'FullDate', name: 'fullDate', type: 'string'},
            {
              title: 'WorkingHours',
              name: 'workingHours',
              type: 'number',
            },
            {
              title: 'ExtraWorkingHours',
              name: 'extraWorkingHours',
              type: 'number',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'user.name',
    },
  },
}
