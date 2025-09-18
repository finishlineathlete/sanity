// React component approach (as Sanity expects)
import React from 'react';

export function PreviewAction(props) {
  console.log('PreviewAction props:', props);
  
  return {
    label: '👁️ Preview',
    onHandle: () => {
      console.log('Preview button clicked!');
      alert('Preview button works!');
      props.onComplete();
    }
  };
}