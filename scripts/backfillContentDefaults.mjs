import {createClient} from '@sanity/client'

const projectId = process.env.SANITY_PROJECT_ID || 'ouvbyhmf'
const dataset = process.env.SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN
const isWriteMode = process.argv.includes('--write')
const defaultCategory = process.env.DEFAULT_CATEGORY || 'General'

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function run() {
  const query = `*[
    _type in ["longForm", "shorts"] &&
    (!defined(category) || category == "" || !defined(publishDate))
  ]{
    _id,
    _type,
    title,
    category,
    publishDate
  }`

  const docs = await client.fetch(query)
  console.log(`Found ${docs.length} document(s) needing backfill.`)

  if (docs.length === 0) return

  for (const doc of docs) {
    const patch = {}

    if (!doc.category || doc.category.trim() === '') {
      patch.category = defaultCategory
    }

    if (!doc.publishDate) {
      patch.publishDate = new Date().toISOString()
    }

    if (Object.keys(patch).length === 0) continue

    console.log(
      `${isWriteMode ? 'PATCH' : 'DRY RUN'} ${doc._type}/${doc._id} (${doc.title || 'Untitled'}) ->`,
      patch,
    )

    if (isWriteMode) {
      await client.patch(doc._id).set(patch).commit()
    }
  }

  if (!isWriteMode) {
    console.log('\nDry run only. Re-run with --write to apply changes.')
  } else {
    console.log('\nBackfill complete.')
  }
}

run().catch((error) => {
  console.error('Backfill failed:', error.message)
  process.exit(1)
})
