import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {PreviewAction} from './actions/PreviewAction'

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
    
    // Add preview action
    actions: (prev, context) => {
      console.log('Document actions context:', context); // Debug log
      
      // Only add preview action for content types
      if (['shorts', 'longForm'].includes(context.schemaType)) {
        console.log('Adding preview action for:', context.schemaType);
        return [...prev, PreviewAction];
      }
      
      console.log('Not adding preview action for:', context.schemaType);
      return prev;
    }
  }
})
