export default function Panel({ titulo, id, children }) {
  return <section className="seccion" aria-labelledby={id}><h2 id={id}>{titulo}</h2>{children}</section>;
}
