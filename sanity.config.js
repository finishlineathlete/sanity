import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'finish-line-athlete-blog',

  projectId: 'ouvbyhmf',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Add preview configuration for content types
    preview: {
      select: {
        title: 'title',
        subtitle: 'excerpt',
        media: 'featuredImage'
      },
      prepare(selection) {
        const {title, subtitle, media} = selection
        return {
          title: title || 'Untitled',
          subtitle: subtitle || 'No excerpt',
          media: media
        }
      }
    },
    
    // Add preview action button
    actions: (prev, context) => {
      if (context.schemaType === 'shorts' || context.schemaType === 'longForm') {
        return [
          ...prev,
          {
            title: 'Preview',
            name: 'preview',
            icon: () => '👁️',
            onHandle: () => {
              // Create a preview modal or panel
              const docId = context.document._id
              const docTitle = context.document.title || 'Untitled'
              const docExcerpt = context.document.excerpt || 'No excerpt'
              const docImage = context.document.featuredImage?.asset?.url || ''
              
              // Show preview in a simple alert for now
              const previewContent = `
                PREVIEW: ${docTitle}
                
                ${docExcerpt}
                
                ${docImage ? `Image: ${docImage}` : 'No image'}
                
                Document ID: ${docId}
                Type: ${context.schemaType}
              `
              
              alert(previewContent)
            }
          }
        ]
      }
      return prev
    }
  }
})
