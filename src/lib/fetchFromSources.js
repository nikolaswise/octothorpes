import context from "$lib/context"
import fs from 'fs'

let sources = [
  'https://nikolas.ws/octothorpes.json/'
]

export const fetchFromSources = async () => {
  const thorpMap = new Map()

  let promises = sources.map(async (source) => await fetch(source))
  let resolve = await Promise.all(promises)
  let json = await Promise.all(resolve.map(async (res) => res.json()))

  // fake record
  json = [...json, {'@graph': [{
    uri: 'https://nikolas.ws/thinking-about-octothorpes',
    "octothorpedBy": [
      "https://octothorp.es/testing"
    ]
  }]}]

  // oh god dont look
  json.forEach(doc => {
    doc['@graph'].forEach(node => {
      let extantNode = thorpMap.get(node.uri)
      if (extantNode) {
        if (node.octothorpes) {
          extantNode.octothorpes = node.octothorpes.length ? [...node.octothorpes] : node.octothorpes
        }
        if (node.octothorpedBy) {
          extantNode.octothorpedBy = node.octothorpedBy.length ? [...node.octothorpedBy] : node.octothorpedBy
        }
        thorpMap.set(node.uri, extantNode)
      } else {
        let thorpNode = {
          uri: node.uri
        }
        if (node.octothorpes) {
          thorpNode.octothorpes = node.octothorpes.length ? [...node.octothorpes] : node.octothorpes
        }
        if (node.octothorpedBy) {
          thorpNode.octothorpedBy = node.octothorpedBy.length ? [...node.octothorpedBy] : node.octothorpedBy
        }
        thorpMap.set(node.uri, thorpNode)
      }
    })
  })

  let records = {
    '@context': context,
    '@graph': [...thorpMap.values()]
  }

  fs.writeFileSync('src/lib/graph.json', JSON.stringify([...thorpMap.values()]))

  return records
}
