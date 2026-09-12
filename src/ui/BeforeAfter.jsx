import { useRef, useState } from "react";

// Drag / keyboard wipe to compare the after and before photos.
export default function BeforeAfter({ after, before, alt = "" }) {
  const root = useRef(null);
  const dragging = useRef(false);
  const [pos, setPos] = useState(50);

  function setFromClientX(clientX) {
    const el = root.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (!r.width) return;
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  }
  function onPointerDown(e) { dragging.current = true; root.current?.setPointerCapture?.(e.pointerId); setFromClientX(e.clientX); }
  function onPointerMove(e) { if (dragging.current) setFromClientX(e.clientX); }
  function endDrag(e) { dragging.current = false; root.current?.releasePointerCapture?.(e.pointerId); }
  function onKeyDown(e) {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") { e.preventDefault(); setPos((p) => Math.max(0, p - step)); }
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") { e.preventDefault(); setPos((p) => Math.min(100, p + step)); }
    else if (e.key === "Home") { e.preventDefault(); setPos(0); }
    else if (e.key === "End") { e.preventDefault(); setPos(100); }
  }

  return (
    <div
      ref={root}
      className="tnt-ba"
      style={{ "--pos": pos + "%" }}
      role="slider"
      tabIndex={0}
      aria-label="Drag to compare before and after"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      aria-valuetext={`Before ${Math.round(pos)} percent`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={onKeyDown}
    >
      <img className="tnt-ba__img" src={after} alt={alt ? alt + " — after" : "After"} draggable="false" loading="lazy" />
      <img className="tnt-ba__img tnt-ba__before" src={before} alt={alt ? alt + " — before" : "Before"} draggable="false" loading="lazy" />
      <span className="tnt-ba__tag tnt-ba__tag--before" aria-hidden="true">Before</span>
      <span className="tnt-ba__tag tnt-ba__tag--after" aria-hidden="true">After</span>
      <div className="tnt-ba__divider" aria-hidden="true">
        <span className="tnt-ba__grip">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 8 6 12l4 4" /><path d="M14 8l4 4-4 4" />
          </svg>
        </span>
      </div>
    </div>
  );
}
