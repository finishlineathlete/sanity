import React from 'react';

export const PreviewAction = (props) => {
  const { published, draft, type } = props;
  
  // Only show for content types
  if (!['shorts', 'longForm'].includes(type)) {
    return null;
  }
  
  // Use published document if available, otherwise use draft
  const document = published || draft;
  
  if (!document) {
    return null; // Don't show action if no document
  }
  
  const { _id } = document;
  const previewUrl = `https://finishlineathlete.com/preview/${type}/${_id}?secret=preview-secret-2024`;
  
  return {
    label: '👁️ Preview',
    onHandle: () => {
      window.open(previewUrl, '_blank');
      props.onComplete();
    },
  };
};