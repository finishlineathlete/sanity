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
            onHandle: (params) => {
              const documentId = params.draft?._id || params.published?._id
              if (!documentId) {
                alert('Document ID not found')
                return
              }
              const previewSecret = 'preview-secret-2024'
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
