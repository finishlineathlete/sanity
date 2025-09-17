import React from 'react';

export const PreviewAction = (props) => {
  const { published, draft } = props;
  
  // Use published document if available, otherwise use draft
  const document = published || draft;
  
  if (!document) {
    return null; // Don't show action if no document
  }
  
  const { _type, _id } = document;
  
  // Only show for content types
  if (!['shorts', 'longForm'].includes(_type)) {
    return null;
  }
  
  const previewUrl = `https://finishlineathlete.com/preview/${_type}/${_id}?secret=preview-secret-2024`;
  
  return {
    label: '👁️ Preview',
    onHandle: () => {
      window.open(previewUrl, '_blank');
      props.onComplete();
    },
  };
};