import { useState } from "react";
import { NAV, PRIMARY_CTA } from "../site.js";

function Brand({ onClick }) {
  return (
    <a className="fv-brand" href="#top" onClick={onClick}>
      <span className="fv-brand__mark" style={{ backgroundImage: "url(/images/logo.png)" }} />
      <span className="fv-brand__name"><span>TNT</span> Elite Builders</span>
    </a>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const items = (klass) =>
    NAV.map((n) => (
      <a key={n.href} className={klass} href={n.href} onClick={close}>{n.name}</a>
    ));

  return (
    <header className={"fv-header" + (open ? " open" : "")}>
      <div className="fv-wrap fv-nav">
        <Brand onClick={close} />
        <nav className="fv-links" aria-label="Primary">
          {items("fv-link")}
          <a className="btn btn--primary btn--sm" href={PRIMARY_CTA.href} onClick={close}>{PRIMARY_CTA.name}</a>
        </nav>
        <button
          className="fv-burger"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="fv-mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>
      <div className="fv-mobile" id="fv-mobile-menu">
        {items("")}
        <a className="btn btn--primary" href={PRIMARY_CTA.href} onClick={close}>{PRIMARY_CTA.name}</a>
      </div>
    </header>
  );
}
