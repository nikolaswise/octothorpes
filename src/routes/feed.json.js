let sources = [
  'https://nikolas.ws/octothorpes.json/'
]

const fetchFromSources = async () => {
  let promises = sources.map(async (source) => await fetch(source))
  let resolve = await Promise.all(promises)
  let json = await Promise.all(resolve.map(async (res) => res.json()))

  let records = json.reduce((acc, val) => {
    acc['@graph'] = [...acc['@graph'], ...val['@graph'].flat()]
    return acc
  }, {
    '@context': {
      "octothorpes": {
        "@id": "https://vocab.octothorp.es/#octothorpes",
        "@type": "@id"
      },
      "octothorpedBy": {
        "@id": "https://vocab.octothorp.es/#octothorpedBy",
        "@type": "@id",
        "@reverse": "octothorpes"
      },
    },
    '@graph': []
  })

  return records
}

export async function get() {
  let records = await fetchFromSources()
  return {
    status: 200,
    body: records
  }
}