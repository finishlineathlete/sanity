export const PreviewAction = (props) => {
  const { published, draft, type } = props;
  
  console.log('PreviewAction props:', props); // Debug log
  
  // Only show for content types
  if (!['shorts', 'longForm'].includes(type)) {
    console.log('Not showing preview for type:', type);
    return null;
  }
  
  // Use published document if available, otherwise use draft
  const document = published || draft;
  
  if (!document) {
    console.log('No document found for preview');
    return null; // Don't show action if no document
  }
  
  const { _id } = document;
  const previewUrl = `https://finishlineathlete.com/preview/${type}/${_id}?secret=preview-secret-2024`;
  
  console.log('Generating preview URL:', previewUrl);
  
  return {
    label: '👁️ Preview',
    onHandle: () => {
      console.log('Opening preview URL:', previewUrl);
      window.open(previewUrl, '_blank');
      props.onComplete();
    },
  };
};