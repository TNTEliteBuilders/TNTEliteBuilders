export default function NotFound() {
  return (
    <section className="fv-section">
      <div className="fv-wrap" style={{ textAlign: "center", maxWidth: 560 }}>
        <span className="fv-eyebrow" style={{ justifyContent: "center" }}>Error 404</span>
        <h1 className="fv-h2" style={{ marginTop: 10 }}>Page not found</h1>
        <p className="fv-lead" style={{ margin: "0 auto 22px" }}>
          This page is still under construction, or it never existed.
        </p>
        <a className="btn btn--primary" href="/">Return home</a>
      </div>
    </section>
  );
}
