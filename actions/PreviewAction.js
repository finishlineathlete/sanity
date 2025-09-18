// Test with exact working example structure
export function PreviewAction({onComplete}) {
  console.log('PreviewAction called with onComplete:', onComplete);
  
  return {
    label: '👁️ Preview',
    onHandle: () => {
      console.log('Preview button clicked!');
      alert('Preview button works!');
      onComplete();
    }
  };
}