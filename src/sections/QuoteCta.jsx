export default function QuoteCta({ data, contact }) {
  return (
    <section className="fv-section fv-section--tight" id="quote">
      <div className="fv-wrap">
        <div className="fv-cta-band fv-reveal">
          <span className="fv-eyebrow">{data.eyebrow}</span>
          <h2>{data.title}</h2>
          <p>{data.lead}</p>
          <div className="fv-actions">
            <a className="btn btn--primary" href={contact.phoneHref}>Call {contact.phone}</a>
            <a className="btn btn--ghost" href={contact.emailHref}>Email Us</a>
          </div>
        </div>
      </div>
    </section>
  );
}
