# Preview Backend Implementation Examples

## Frontend Requirements for finishlineathlete.com

You need to add **ONE new route** to your frontend to handle previews:

### Route Structure
```
https://finishlineathlete.com/preview/[contentType]/[documentId]?secret=[secret]
```

Examples:
- `https://finishlineathlete.com/preview/shorts/abc123?secret=preview-secret-2024`
- `https://finishlineathlete.com/preview/longForm/def456?secret=preview-secret-2024`

## Implementation Examples

### 1. Next.js Implementation

Create file: `pages/preview/[type]/[id].js`

```javascript
import {getClient} from '../lib/sanity'
import fs from 'fs'
import path from 'path'

const PREVIEW_SECRET = 'preview-secret-2024' // Use environment variable in production

export default function PreviewPage({data, contentType, error}) {
  if (error) {
    return (
      <div style={{padding: '20px', textAlign: 'center'}}>
        <h1>Preview Not Available</h1>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div dangerouslySetInnerHTML={{__html: renderPreviewHTML(data, contentType)}} />
  )
}

export async function getServerSideProps(context) {
  const {type, id} = context.params
  const {secret} = context.query
  
  // Validate secret
  if (secret !== PREVIEW_SECRET) {
    return {
      props: {
        error: 'Invalid preview secret',
        data: null,
        contentType: type
      }
    }
  }

  try {
    // Fetch document from Sanity
    const client = getClient()
    const data = await client.getDocument(id)
    
    if (!data) {
      return {
        props: {
          error: 'Document not found',
          data: null,
          contentType: type
        }
      }
    }

    return {
      props: {
        data,
        contentType: type,
        error: null
      }
    }
  } catch (error) {
    return {
      props: {
        error: 'Failed to load preview',
        data: null,
        contentType: type
      }
    }
  }
}

function renderPreviewHTML(data, contentType) {
  // Load the HTML template
  const templatePath = path.join(process.cwd(), 'preview-template.html')
  const template = fs.readFileSync(templatePath, 'utf8')
  
  // Replace placeholders with actual data
  return template
    .replace('{{previewData}}', JSON.stringify(data))
    .replace('{{contentType}}', contentType)
    .replace('{{title}}', data.title || 'Untitled')
}
```

### 2. React/Vite Implementation

Create file: `src/pages/Preview.jsx`

```javascript
import {useParams, useSearchParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {client} from '../lib/sanity'

const PREVIEW_SECRET = 'preview-secret-2024'

export default function PreviewPage() {
  const {type, id} = useParams()
  const [searchParams] = useSearchParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const secret = searchParams.get('secret')
    
    if (secret !== PREVIEW_SECRET) {
      setError('Invalid preview secret')
      setLoading(false)
      return
    }

    async function fetchPreview() {
      try {
        const document = await client.getDocument(id)
        if (!document) {
          setError('Document not found')
        } else {
          setData(document)
        }
      } catch (err) {
        setError('Failed to load preview')
      } finally {
        setLoading(false)
      }
    }

    fetchPreview()
  }, [id, searchParams])

  if (loading) {
    return <div>Loading preview...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <div style={{
        background: '#ff6b35',
        color: 'white',
        padding: '12px 20px',
        textAlign: 'center',
        fontWeight: 'bold'
      }}>
        🚧 PREVIEW MODE - This content is not yet published
      </div>
      
      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '20px'}}>
        {type === 'shorts' && <ShortsPreview data={data} />}
        {type === 'longForm' && <LongFormPreview data={data} />}
      </div>
    </div>
  )
}

function ShortsPreview({data}) {
  return (
    <article>
      <header style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '60px 40px',
        textAlign: 'center'
      }}>
        {data.featuredImage && (
          <img 
            src={data.featuredImage.asset.url} 
            alt={data.title}
            style={{
              width: '100%',
              maxWidth: '800px',
              height: '400px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '30px'
            }}
          />
        )}
        <h1 style={{fontSize: '2.5rem', marginBottom: '20px'}}>
          {data.title || 'Untitled'}
        </h1>
        <p style={{fontSize: '1.2rem', marginBottom: '30px'}}>
          {data.excerpt || ''}
        </p>
        <div style={{display: 'flex', justifyContent: 'center', gap: '30px'}}>
          <span>👤 By {data.author?.name || 'Unknown Author'}</span>
          <span>📅 {new Date(data.publishDate).toLocaleDateString()}</span>
          <span>⏱️ {data.readingTime || 0} min read</span>
        </div>
      </header>
      
      <div style={{padding: '40px', lineHeight: '1.8'}}>
        <p>{data.body || ''}</p>
      </div>
      
      {data.tags && data.tags.length > 0 && (
        <div style={{padding: '0 40px 40px', display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
          {data.tags.map((tag, index) => (
            <span key={index} style={{
              background: '#f0f0f0',
              color: '#333',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '0.9rem'
            }}>
              #{tag.title || tag}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}

function LongFormPreview({data}) {
  return (
    <article>
      <header style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '60px 40px',
        textAlign: 'center'
      }}>
        {data.featuredImage && (
          <img 
            src={data.featuredImage.asset.url} 
            alt={data.title}
            style={{
              width: '100%',
              maxWidth: '800px',
              height: '400px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '30px'
            }}
          />
        )}
        <h1 style={{fontSize: '2.5rem', marginBottom: '20px'}}>
          {data.title || 'Untitled'}
        </h1>
        <p style={{fontSize: '1.2rem', marginBottom: '20px'}}>
          {data.excerpt || ''}
        </p>
        {data.cardSummary && (
          <p style={{fontSize: '1.1rem', marginBottom: '30px', fontStyle: 'italic'}}>
            {data.cardSummary}
          </p>
        )}
        <div style={{display: 'flex', justifyContent: 'center', gap: '30px'}}>
          <span>👤 By {data.author?.name || 'Unknown Author'}</span>
          <span>📅 {new Date(data.publishDate).toLocaleDateString()}</span>
          <span>⏱️ {data.readingTime || 0} min read</span>
          <span>📊 {data.wordCount || 0} words</span>
        </div>
      </header>
      
      <div style={{padding: '40px', lineHeight: '1.8'}}>
        <p>{data.body || ''}</p>
      </div>
      
      {data.tags && data.tags.length > 0 && (
        <div style={{padding: '0 40px 40px', display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
          {data.tags.map((tag, index) => (
            <span key={index} style={{
              background: '#f0f0f0',
              color: '#333',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '0.9rem'
            }}>
              #{tag.title || tag}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}
```

### 3. Vanilla JavaScript Implementation

Create file: `preview.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>Preview | Finish Line Athlete</title>
    <script src="https://unpkg.com/@sanity/client@latest/dist/index.js"></script>
</head>
<body>
    <div id="preview-container">
        <div id="loading">Loading preview...</div>
        <div id="error" style="display: none;">Preview not available</div>
        <div id="content" style="display: none;"></div>
    </div>

    <script>
        const PREVIEW_SECRET = 'preview-secret-2024'
        
        // Initialize Sanity client
        const client = sanityClient({
            projectId: 'ouvbyhmf',
            dataset: 'production',
            useCdn: false, // Always fetch fresh data for previews
            apiVersion: '2024-01-01'
        })

        async function loadPreview() {
            const urlParams = new URLSearchParams(window.location.search)
            const secret = urlParams.get('secret')
            const pathParts = window.location.pathname.split('/')
            const contentType = pathParts[2] // preview/[type]/[id]
            const documentId = pathParts[3]

            if (secret !== PREVIEW_SECRET) {
                showError('Invalid preview secret')
                return
            }

            try {
                const data = await client.getDocument(documentId)
                if (!data) {
                    showError('Document not found')
                    return
                }

                renderPreview(data, contentType)
            } catch (error) {
                showError('Failed to load preview')
                console.error(error)
            }
        }

        function showError(message) {
            document.getElementById('loading').style.display = 'none'
            document.getElementById('error').textContent = message
            document.getElementById('error').style.display = 'block'
        }

        function renderPreview(data, contentType) {
            const content = document.getElementById('content')
            
            if (contentType === 'shorts') {
                content.innerHTML = renderShortsPreview(data)
            } else if (contentType === 'longForm') {
                content.innerHTML = renderLongFormPreview(data)
            }

            document.getElementById('loading').style.display = 'none'
            content.style.display = 'block'
        }

        function renderShortsPreview(data) {
            return `
                <div style="background: #ff6b35; color: white; padding: 12px; text-align: center; font-weight: bold;">
                    🚧 PREVIEW MODE - This content is not yet published
                </div>
                <article style="max-width: 1200px; margin: 0 auto; padding: 20px;">
                    <header style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 60px 40px; text-align: center; border-radius: 8px;">
                        ${data.featuredImage ? `<img src="${data.featuredImage.asset.url}" alt="${data.title}" style="width: 100%; max-width: 800px; height: 400px; object-fit: cover; border-radius: 8px; margin-bottom: 30px;">` : ''}
                        <h1 style="font-size: 2.5rem; margin-bottom: 20px;">${data.title || 'Untitled'}</h1>
                        <p style="font-size: 1.2rem; margin-bottom: 30px;">${data.excerpt || ''}</p>
                        <div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap;">
                            <span>👤 By ${data.author?.name || 'Unknown Author'}</span>
                            <span>📅 ${new Date(data.publishDate).toLocaleDateString()}</span>
                            <span>⏱️ ${data.readingTime || 0} min read</span>
                        </div>
                    </header>
                    <div style="padding: 40px; line-height: 1.8; font-size: 1.1rem;">
                        <p>${data.body || ''}</p>
                    </div>
                    ${data.tags && data.tags.length > 0 ? `
                        <div style="padding: 0 40px 40px; display: flex; flex-wrap: wrap; gap: 10px;">
                            ${data.tags.map(tag => `<span style="background: #f0f0f0; color: #333; padding: 6px 12px; border-radius: 20px; font-size: 0.9rem;">#${tag.title || tag}</span>`).join('')}
                        </div>
                    ` : ''}
                </article>
            `
        }

        function renderLongFormPreview(data) {
            return `
                <div style="background: #ff6b35; color: white; padding: 12px; text-align: center; font-weight: bold;">
                    🚧 PREVIEW MODE - This content is not yet published
                </div>
                <article style="max-width: 1200px; margin: 0 auto; padding: 20px;">
                    <header style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 60px 40px; text-align: center; border-radius: 8px;">
                        ${data.featuredImage ? `<img src="${data.featuredImage.asset.url}" alt="${data.title}" style="width: 100%; max-width: 800px; height: 400px; object-fit: cover; border-radius: 8px; margin-bottom: 30px;">` : ''}
                        <h1 style="font-size: 2.5rem; margin-bottom: 20px;">${data.title || 'Untitled'}</h1>
                        <p style="font-size: 1.2rem; margin-bottom: 20px;">${data.excerpt || ''}</p>
                        ${data.cardSummary ? `<p style="font-size: 1.1rem; margin-bottom: 30px; font-style: italic;">${data.cardSummary}</p>` : ''}
                        <div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap;">
                            <span>👤 By ${data.author?.name || 'Unknown Author'}</span>
                            <span>📅 ${new Date(data.publishDate).toLocaleDateString()}</span>
                            <span>⏱️ ${data.readingTime || 0} min read</span>
                            <span>📊 ${data.wordCount || 0} words</span>
                        </div>
                    </header>
                    <div style="padding: 40px; line-height: 1.8; font-size: 1.1rem;">
                        <p>${data.body || ''}</p>
                    </div>
                    ${data.tags && data.tags.length > 0 ? `
                        <div style="padding: 0 40px 40px; display: flex; flex-wrap: wrap; gap: 10px;">
                            ${data.tags.map(tag => `<span style="background: #f0f0f0; color: #333; padding: 6px 12px; border-radius: 20px; font-size: 0.9rem;">#${tag.title || tag}</span>`).join('')}
                        </div>
                    ` : ''}
                </article>
            `
        }

        // Load preview when page loads
        loadPreview()
    </script>
</body>
</html>
```

## Environment Variables

Add to your `.env` file:

```bash
SANITY_PREVIEW_SECRET=preview-secret-2024
SANITY_PROJECT_ID=ouvbyhmf
SANITY_DATASET=production
```

## Security Notes

1. **Change the preview secret** to something secure
2. **Use environment variables** for secrets
3. **Add rate limiting** to prevent abuse
4. **Consider IP whitelisting** for preview access
5. **Add expiration** to preview links (optional)

## Testing

1. Start your Sanity Studio: `npm run dev`
2. Open a document (shorts or longForm)
3. Click the "👁️ Preview" button
4. Verify the preview opens correctly
5. Test with different content types and field combinations