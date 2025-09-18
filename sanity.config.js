import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import resolveProductionUrl from './resolveProductionUrl'

export default defineConfig({
  name: 'default',
  title: 'finish-line-athlete-blog',

  projectId: 'ouvbyhmf',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Shorts')
              .schemaType('shorts')
              .child(S.documentTypeList('shorts').title('Shorts')),
            S.listItem()
              .title('Long Form Articles')
              .schemaType('longForm')
              .child(S.documentTypeList('longForm').title('Long Form Articles')),
            S.divider(),
            ...S.documentTypeListItems().filter(listItem => !['shorts', 'longForm'].includes(listItem.getId()))
          ])
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
    },
    
    // Enable preview functionality
    productionUrl: resolveProductionUrl
  }
})
