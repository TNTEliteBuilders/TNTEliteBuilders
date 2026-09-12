import { CheckIcon } from "../ui/icons.jsx";

export default function Why({ data }) {
  return (
    <section className="fv-section fv-section--tight">
      <div className="fv-wrap fv-split">
        <div className="fv-head fv-reveal" style={{ marginBottom: 0 }}>
          <span className="fv-eyebrow"><span className="n">/</span> {data.eyebrow}</span>
          <h2 className="fv-h2">{data.title}</h2>
          <p className="fv-lead">{data.lead}</p>
        </div>
        <div className="fv-checks fv-reveal">
          {data.checks.map((c) => (
            <div className="fv-check" key={c.b}>
              <CheckIcon />
              <div><b>{c.b}</b><span>{c.span}</span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
