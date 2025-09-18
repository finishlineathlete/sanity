import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {PreviewAction} from './actions/PreviewAction'

export default defineConfig({
  name: 'default',
  title: 'finish-line-athlete-blog',

  projectId: 'ouvbyhmf',
  dataset: 'production',

  plugins: [
    deskTool({
      resolveDocumentActions: (prev, context) => {
        console.log('resolveDocumentActions called for:', context.schemaType);
        if (['shorts', 'longForm'].includes(context.schemaType)) {
          return [...prev, PreviewAction];
        }
        return prev;
      }
    }), 
    visionTool()
  ],

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
    }
  }
})
