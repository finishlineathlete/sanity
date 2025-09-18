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
    
    // Add preview action
    actions: (prev, context) => {
      console.log('=== DOCUMENT ACTIONS CALLED ===');
      console.log('Context:', context);
      console.log('Schema type:', context.schemaType);
      console.log('Previous actions count:', prev.length);
      
      // Create preview action
      const previewAction = {
        label: '👁️ Preview',
        onHandle: () => {
          console.log('Preview action clicked!');
          const { published, draft } = context;
          const document = published || draft;
          if (document) {
            const previewUrl = `https://finishlineathlete.com/preview/${context.schemaType}/${document._id}?secret=preview-secret-2024`;
            console.log('Opening preview URL:', previewUrl);
            window.open(previewUrl, '_blank');
          } else {
            console.log('No document found for preview');
            alert('No document found for preview');
          }
        }
      };
      
      // Only add preview action for content types
      if (['shorts', 'longForm'].includes(context.schemaType)) {
        console.log('Adding preview action for:', context.schemaType);
        return [...prev, previewAction];
      }
      
      console.log('Not adding preview action for:', context.schemaType);
      return prev;
    }
  }
})
