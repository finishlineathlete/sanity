// This function determines the URL for a given document when it's published
export default function resolveProductionUrl(document) {
  // Handle different document types
  switch (document._type) {
    case 'shorts':
      return `https://finishlineathlete.com/preview/shorts/${document._id}?secret=preview-secret-2024`
    case 'longForm':
      return `https://finishlineathlete.com/preview/longForm/${document._id}?secret=preview-secret-2024`
    default:
      return null
  }
}