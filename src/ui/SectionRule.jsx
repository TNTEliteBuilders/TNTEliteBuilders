// Branded chapter divider between sections (ember hairline + mono index).
export default function SectionRule({ index, label }) {
  return (
    <div className="fv-wrap fv-rule-wrap" aria-hidden="true">
      <div className="fv-rule fv-reveal">
        <span className="fv-rule__line" />
        <span className="fv-rule__tag">
          {index && <span className="fv-rule__n">{index}</span>}
          <span className="fv-rule__dot" />
          {label && <span className="fv-rule__label">{label}</span>}
        </span>
        <span className="fv-rule__line fv-rule__line--r" />
      </div>
    </div>
  );
}
