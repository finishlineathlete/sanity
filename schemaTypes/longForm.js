export default {
  name: 'longForm',
  title: 'Long Form Articles',
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
      type: 'text',
      validation: Rule => Rule.required().error('Excerpt is required')
    },
    {
      name: 'cardSummary',
      title: 'Card Summary',
      type: 'text',
      validation: Rule => Rule.required().error('Card Summary is required')
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      validation: Rule => Rule.required().error('Featured Image is required')
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: Rule => Rule.required().error('Author is required')
    },
    {
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
      validation: Rule => Rule.required().error('Publish Date is required')
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
      validation: Rule => Rule.required().error('At least one tag is required')
    },
    {
      name: 'wordCount',
      title: 'Word Count',
      type: 'number',
      validation: Rule => Rule.required().error('Word Count is required')
    },
    {
      name: 'readingTime',
      title: 'Reading Time (mins)',
      type: 'number',
      validation: Rule => Rule.required().error('Reading Time is required')
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

    // SEO Phase 1 Fields – Also Required
    {
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      fieldset: 'seoPhase1',
      validation: Rule => Rule.required().error('Content Type is required')
    },
    {
      name: 'titleTag',
      title: 'Title Tag',
      type: 'string',
      fieldset: 'seoPhase1',
      validation: Rule => Rule.required().error('Title Tag is required')
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      fieldset: 'seoPhase1',
      validation: Rule => Rule.required().error('Meta Description is required')
    },
    {
      name: 'urlSlug',
      title: 'URL Slug',
      type: 'string',
      fieldset: 'seoPhase1',
      validation: Rule => Rule.required().error('URL Slug is required')
    },
    {
      name: 'focusKeyword',
      title: 'Focus Keyword',
      type: 'string',
      fieldset: 'seoPhase1',
      validation: Rule => Rule.required().error('Focus Keyword is required')
    },
    {
      name: 'primaryKeyword',
      title: 'Primary Keyword',
      type: 'string',
      fieldset: 'seoPhase1',
      validation: Rule => Rule.required().error('Primary Keyword is required')
    },
    {
      name: 'secondaryKeywords',
      title: 'Secondary Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      fieldset: 'seoPhase1',
      validation: Rule => Rule.required().error('At least one secondary keyword is required')
    },
    {
      name: 'h1Tag',
      title: 'H1 Tag',
      type: 'string',
      fieldset: 'seoPhase1',
      validation: Rule => Rule.required().error('H1 Tag is required')
    },
    {
      name: 'primaryTopicCategory',
      title: 'Primary Topic/Category',
      type: 'string',
      fieldset: 'seoPhase1',
      validation: Rule => Rule.required().error('Primary Topic/Category is required')
    },
    {
      name: 'contentTags',
      title: 'Content Tags',
      type: 'array',
      of: [{ type: 'string' }],
      fieldset: 'seoPhase1',
      validation: Rule => Rule.required().error('At least one content tag is required')
    },
    {
      name: 'contentLength',
      title: 'Content Length',
      type: 'number',
      fieldset: 'seoPhase1',
      validation: Rule => Rule.required().error('Content Length is required')
    },
    {
      name: 'authorBioDetails',
      title: 'Author Bio/Details',
      type: 'text',
      fieldset: 'seoPhase1',
      validation: Rule => Rule.required().error('Author Bio/Details are required')
    },
    {
      name: 'lastUpdatedDate',
      title: 'Last Updated Date',
      type: 'datetime',
      fieldset: 'seoPhase1',
      validation: Rule => Rule.required().error('Last Updated Date is required')
    },

    // Preview Instructions
    {
      name: 'previewInstructions',
      title: '👁️ Preview Instructions',
      type: 'text',
      initialValue: 'To preview this content:\n\n1. Copy this URL: https://finishlineathlete.com/preview/longForm/{DOCUMENT_ID}?secret=preview-secret-2024\n\n2. Replace {DOCUMENT_ID} with your document ID\n\n3. Paste in browser to preview'
    }

  ]
}
