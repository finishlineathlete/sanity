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
    actions: (prev, context) => {
      // Add preview action for content types
      if (context.schemaType === 'shorts' || context.schemaType === 'longForm') {
        return [
          ...prev,
          {
            title: 'Preview',
            name: 'preview',
            icon: () => '👁️',
            onHandle: () => {
              const documentId = context.document._id
              const previewSecret = 'preview-secret-2024' // In production, use environment variable
              const previewUrl = `https://finishlineathlete.com/preview/${context.schemaType}/${documentId}?secret=${previewSecret}`
              window.open(previewUrl, '_blank')
            }
          }
        ]
      }
      return prev
    }
  }
})
