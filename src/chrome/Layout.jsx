import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

// Reveal .fv-reveal children as they scroll in. Anything already on screen
// shows at once; a safety timer guarantees nothing is ever left hidden.
function useReveal(dep) {
  const root = useRef(null);
  useEffect(() => {
    const nodes = [...(root.current?.querySelectorAll(".fv-reveal") ?? [])];
    if (!nodes.length) return;
    const show = (n) => n.classList.add("in");
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) { nodes.forEach(show); return; }

    const vh = window.innerHeight || 800;
    nodes.forEach((n) => { if (n.getBoundingClientRect().top < vh * 0.95) show(n); });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });
    nodes.forEach((n) => { if (!n.classList.contains("in")) io.observe(n); });

    const safety = setTimeout(() => nodes.forEach(show), 2000);
    return () => { io.disconnect(); clearTimeout(safety); };
  }, [dep]);
  return root;
}

export default function Layout({ children }) {
  const { pathname, hash } = useLocation();
  const main = useReveal(pathname);

  useEffect(() => { if (!hash) window.scrollTo(0, 0); }, [pathname, hash]);

  return (
    <>
      <a className="fv-skip" href="#fv-main">Skip to content</a>
      <div className="bg" aria-hidden="true" />
      <Header />
      <main id="fv-main" tabIndex={-1} ref={main}>
        {children}
      </main>
      <Footer />
    </>
  );
}
