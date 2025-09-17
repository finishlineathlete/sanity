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
          // Simple preview configuration for content list
          preview: {
            select: {
              title: 'title',
              subtitle: 'excerpt',
              media: 'featuredImage'
            }
          },
          
          // Add preview action button
          actions: (prev, context) => {
            const {schemaType} = context
            const isContentType = ['shorts', 'longForm'].includes(schemaType)
            
            if (!isContentType) return prev
            
            return [
              ...prev,
              {
                name: 'preview',
                title: '👁️ Preview',
                icon: () => '👁️',
                onHandle: () => {
                  const docId = context.documentId
                  const baseUrl = 'https://finishlineathlete.com/preview'
                  const previewUrl = `${baseUrl}/${schemaType}/${docId}?secret=preview-secret-2024`
                  window.open(previewUrl, '_blank')
                }
              }
            ]
          }
        }
})
