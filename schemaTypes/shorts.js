export default {
  name: 'shorts',
  title: 'Shorts',
  type: 'document',
  fieldsets: [
    {
      name: 'seoPhase1',
      title: 'SEO – Phase 1'
    }
  ],
  fields: [
    // Content Fields – All Required
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().error('Title is required')
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required().error('Slug is required')
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text'
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image'
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }]
    },
    {
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: Rule => Rule.required().error('Publish Date is required')
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: Rule => Rule.required().error('Category is required')
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }]
    },
    {
      name: 'wordCount',
      title: 'Word Count',
      type: 'number',
      readOnly: true,
      hidden: true
    },
    {
      name: 'readingTime',
      title: 'Reading Time (mins)',
      type: 'number',
      readOnly: true,
      hidden: true
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'}
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Number', value: 'number'}
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'}
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url'
                  }
                ]
              }
            ]
          }
        }
      ],
      validation: Rule => Rule.required().error('Body content is required')
    },

    // SEO Phase 1 Fields – All Required
    {
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      fieldset: 'seoPhase1',
      hidden: true
    },
    {
      name: 'titleTag',
      title: 'Title Tag',
      type: 'string',
      fieldset: 'seoPhase1',
      hidden: true
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      fieldset: 'seoPhase1',
      hidden: true
    },
    {
      name: 'urlSlug',
      title: 'URL Slug',
      type: 'string',
      fieldset: 'seoPhase1',
      hidden: true
    },
    {
      name: 'focusKeyword',
      title: 'Focus Keyword',
      type: 'string',
      fieldset: 'seoPhase1',
      hidden: true
    },
    {
      name: 'primaryKeyword',
      title: 'Primary Keyword',
      type: 'string',
      fieldset: 'seoPhase1',
      hidden: true
    },
    {
      name: 'secondaryKeywords',
      title: 'Secondary Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      fieldset: 'seoPhase1',
      hidden: true
    },
    {
      name: 'h1Tag',
      title: 'H1 Tag',
      type: 'string',
      fieldset: 'seoPhase1',
      hidden: true
    },
    {
      name: 'primaryTopicCategory',
      title: 'Primary Topic/Category',
      type: 'string',
      fieldset: 'seoPhase1',
      hidden: true
    },
    {
      name: 'contentTags',
      title: 'Content Tags',
      type: 'array',
      of: [{ type: 'string' }],
      fieldset: 'seoPhase1',
      hidden: true
    },
    {
      name: 'contentLength',
      title: 'Content Length',
      type: 'number',
      fieldset: 'seoPhase1',
      hidden: true
    },
    {
      name: 'authorBioDetails',
      title: 'Author Bio/Details',
      type: 'text',
      fieldset: 'seoPhase1',
      hidden: true
    },
    {
      name: 'lastUpdatedDate',
      title: 'Last Updated Date',
      type: 'datetime',
      fieldset: 'seoPhase1',
      readOnly: true,
      hidden: true
    },

    

  ]
}
