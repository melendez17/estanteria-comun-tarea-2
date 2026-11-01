export default function Campo({ id, etiqueta, error, children }) {
  return <div className="col-sm-6"><label htmlFor={id} className="form-label">{etiqueta}</label>{children}<span id={`error-${id}`} className="error-campo" aria-live="polite">{error || ''}</span></div>;
}
