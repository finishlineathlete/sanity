export default {
  name: 'longForm',
  title: 'Long Form Articles',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 }
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text'
    },
    {
      name: 'cardSummary',
      title: 'Card Summary',
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
      type: 'datetime'
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
      type: 'number'
    },
    {
      name: 'readingTime',
      title: 'Reading Time (mins)',
      type: 'number'
    },
    {
      name: 'body',
      title: 'Body',
      type: 'text'
    },
    // Optional SEO fields
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Optional: override the page title for SEO'
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'Optional: summary for search engines'
    },
    {
      name: 'ogTitle',
      title: 'Open Graph Title',
      type: 'string',
      description: 'Optional: title for social sharing'
    },
    {
      name: 'ogDescription',
      title: 'Open Graph Description',
      type: 'text',
      description: 'Optional: description for social sharing'
    },
    {
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Optional: image for social sharing'
    },
    {
      name: 'twitterTitle',
      title: 'Twitter Card Title',
      type: 'string'
    },
    {
      name: 'twitterDescription',
      title: 'Twitter Card Description',
      type: 'text'
    },
    {
      name: 'twitterImage',
      title: 'Twitter Card Image',
      type: 'image'
    }
  ]
}
