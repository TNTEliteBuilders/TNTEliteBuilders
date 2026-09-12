import { CardIcon } from "../ui/icons.jsx";

export default function Services({ data }) {
  return (
    <section className="fv-section" id="services">
      <div className="fv-wrap">
        <div className="fv-head fv-reveal">
          <span className="fv-eyebrow"><span className="n">/</span> {data.eyebrow}</span>
          <h2 className="fv-h2">{data.title}</h2>
          <p className="fv-lead">{data.lead}</p>
        </div>
        <div className="fv-grid fv-grid--3">
          {data.items.map((s, i) => (
            <div className="fv-card fv-reveal" key={s.name}>
              <span className="fv-card__no">/ {String(i + 1).padStart(2, "0")}</span>
              <CardIcon name={s.icon} />
              <h3>{s.name}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
