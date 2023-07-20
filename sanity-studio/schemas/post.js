export default {
  title: 'Post',
  name: 'post',
  type: 'document',
  fields: [
    {
      title: 'Author',
      name: 'author',
      type: 'reference',
      to: [{type: 'user'}],
    },
    {
      title: 'Subject',
      name: 'subject',
      type: 'string',
    },
    {
      title: 'Category',
      name: 'category',
      type: 'reference',
      to: [{type: 'categories'}],
    },
    {
      title: 'ViewCount',
      name: 'viewCount',
      type: 'number',
    },
    {title: 'Image', name: 'image', type: 'image'},
    {
      title: 'Likes',
      name: 'likes',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'user'}],
          vaildation: (Rule) => Rule.unique,
        },
      ],
    },
    {
      title: 'Commnets',
      name: 'comments',
      type: 'array',
      of: [
        {
          title: 'Comment',
          name: 'comment',
          type: 'document',
          fields: [
            {
              title: 'Author',
              name: 'author',
              type: 'reference',
              to: [{type: 'user'}],
            },
            {
              title: 'Comment',
              name: 'comment',
              type: 'string',
            },
            {
              title: 'SubComments',
              name: 'subComments',
              type: 'array',
              of: [
                {
                  titie: 'SubComment',
                  name: 'subComment',
                  type: 'document',
                  fields: [
                    {
                      title: 'Author',
                      name: 'author',
                      type: 'reference',
                      to: [{type: 'user'}],
                    },
                    {title: 'subComment', name: 'subComment', type: 'string'},
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'subject',
      authorName: 'author.name',
      authorUsername: 'author.username',
      media: 'image',
    },
    prepare(selection) {
      const {title, authorName, authorUsername, media} = selection
      return {
        title,
        subtitle: `by ${authorUsername} (${authorName})`,
      }
    },
  },
}
