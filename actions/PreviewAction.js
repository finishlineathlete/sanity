// Simple action object approach (no React hooks needed)
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