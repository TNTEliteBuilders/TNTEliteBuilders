export default function Stats({ items }) {
  return (
    <section className="fv-section--tight">
      <div className="fv-wrap">
        <div className="fv-stats fv-reveal">
          {items.map((s) => (
            <div className="fv-stat" key={s.k}>
              <div className="v"><em>{s.v}</em></div>
              <div className="k">{s.k}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
