import oxigraph from 'oxigraph'

const db = new oxigraph.Store();

const s = oxigraph.namedNode("http://example/");
const p = oxigraph.namedNode("http://schema.org/name");
const o = oxigraph.literal("example")

db.add(
  oxigraph.triple(s, p, o)
)

export async function get() {
  return {
    status: 200,
    body: 'records'
  }
}