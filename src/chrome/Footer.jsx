import { SITE_NAME, TAGLINE, CONTACT, NAV } from "../site.js";

export default function Footer() {
  return (
    <footer className="fv-footer">
      <div className="fv-wrap fv-footer__top">
        <div className="fv-footer__brand">
          <a className="fv-brand" href="#top">
            <span className="fv-brand__mark" style={{ backgroundImage: "url(/images/logo.png)" }} />
            <span className="fv-brand__name"><span>TNT</span> Elite Builders</span>
          </a>
          <p>
            General contractor serving the greater Houston, Texas area and surrounding communities. Custom
            homes, remodeling, and commercial construction, with insurance coordination handled from start
            to finish.
          </p>
        </div>
        <div className="fv-fcol">
          <h3>Explore</h3>
          {NAV.map((n) => <a key={n.href} href={n.href}>{n.name}</a>)}
        </div>
        <div className="fv-fcol">
          <h3>Contact</h3>
          <a href={CONTACT.phoneHref} style={{ color: "var(--accent)", fontWeight: 700 }}>{CONTACT.phone}</a>
          <a href={CONTACT.emailHref}>{CONTACT.email}</a>
          <a href={PRIMARY_CTA_HREF}>Request a Quote</a>
        </div>
      </div>
      <div className="fv-wrap fv-footer__bottom">
        <span>© {new Date().getFullYear()} {SITE_NAME} LLC. {TAGLINE}</span>
      </div>
    </footer>
  );
}

const PRIMARY_CTA_HREF = "#quote";
