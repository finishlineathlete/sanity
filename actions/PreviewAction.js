// Follow the working example pattern
export function PreviewAction(props) {
  const { draft, published } = props;
  const doc = draft || published;
  
  console.log('PreviewAction props:', props);
  console.log('Document:', doc);
  
  // Only show action if document exists
  if (!doc) {
    return null;
  }
  
  return {
    label: '👁️ Preview',
    onHandle: () => {
      console.log('Preview button clicked!');
      const previewUrl = `https://finishlineathlete.com/preview/${props.type}/${doc._id}?secret=preview-secret-2024`;
      console.log('Opening preview URL:', previewUrl);
      window.open(previewUrl, '_blank');
      props.onComplete();
    }
  };
}