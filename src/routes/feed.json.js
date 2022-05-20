import { fetchFromSources } from '$lib/fetchFromSources'

export async function get() {
  let records = await fetchFromSources()
  return {
    status: 200,
    body: records
  }
}