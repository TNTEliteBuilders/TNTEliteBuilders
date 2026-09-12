// Shared line icons — a single refined two-tone family.
// System: 24x24 grid, ~1.7 stroke set on the tile (.fv-card__ico svg), round
// caps/joins, fill:none by default. Each icon = one tinted accent mass
// (fill currentColor, low opacity) behind clean strokes, so colour comes from
// the tile (TNT red = currentColor). No emoji.

export const SERVICE_ICONS = {
  // Custom Home Construction — clean gable house + arched door.
  home: (
    <>
      <path d="M12 3.4 3 10.8 21 10.8 Z" fill="currentColor" fillOpacity="0.16" stroke="none" />
      <path d="M2.6 11 12 3.4 21.4 11" />
      <path d="M5.4 10.6 V20.4 M18.6 10.6 V20.4 M3.8 20.4 H20.2" />
      <path d="M9.9 20.4 V15.8 A2.1 2.1 0 0 1 14.1 15.8 V20.4" />
    </>
  ),
  // Remodeling & Renovation — a single confident wrench.
  wrench: (
    <>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" fill="currentColor" fillOpacity="0.16" stroke="none" />
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </>
  ),
  // Outdoor Living & Additions — pergola: beam, rafters, posts, patio line.
  deck: (
    <>
      <path d="M3.4 7 H20.6 V9 H3.4 Z" fill="currentColor" fillOpacity="0.16" stroke="none" />
      <path d="M3.4 7 H20.6 V9 H3.4 Z" />
      <path d="M7 7 V4.8 M10.3 7 V4.8 M13.7 7 V4.8 M17 7 V4.8" />
      <path d="M6.2 9 V18.4 M17.8 9 V18.4" />
      <path d="M3.8 18.4 H20.2" />
    </>
  ),
  // Commercial Build-Outs — main tower (ribbon windows) + tinted annex.
  building: (
    <>
      <path d="M13.5 9 H19 V20.4 H13.5 Z" fill="currentColor" fillOpacity="0.16" stroke="none" />
      <path d="M5.5 20.4 V3.8 H13.5 V20.4" />
      <path d="M13.5 9 H19 V20.4" />
      <path d="M3.6 20.4 H20.4" />
      <path d="M7.7 7.2 H11.3 M7.7 10.4 H11.3 M7.7 13.6 H11.3" />
      <path d="M15 12.4 H17.5 M15 15.8 H17.5" />
    </>
  ),
  // Exterior & Structural Repair — roof gable with fascia + shingle course.
  roof: (
    <>
      <path d="M12 4 2.4 13 21.6 13 Z" fill="currentColor" fillOpacity="0.16" stroke="none" />
      <path d="M2 13.2 12 4 22 13.2" />
      <path d="M4 13.2 V16 H20 V13.2" />
      <path d="M6.6 12.4 12 7.4 17.4 12.4" />
    </>
  ),
  // Construction Management — clipboard, tinted clip, one checked list item.
  clipboard: (
    <>
      <path d="M9.6 3 H14.4 A1.3 1.3 0 0 1 15.7 4.3 V5.4 H8.3 V4.3 A1.3 1.3 0 0 1 9.6 3 Z" fill="currentColor" fillOpacity="0.16" stroke="none" />
      <path d="M15.8 4.4 H17.2 A1.8 1.8 0 0 1 19 6.2 V19.4 A1.8 1.8 0 0 1 17.2 21.2 H6.8 A1.8 1.8 0 0 1 5 19.4 V6.2 A1.8 1.8 0 0 1 6.8 4.4 H8.2" />
      <path d="M9.6 3 H14.4 A1.3 1.3 0 0 1 15.7 4.3 V5.4 H8.3 V4.3 A1.3 1.3 0 0 1 9.6 3 Z" />
      <path d="M8 10.4 9.4 11.8 12 9" />
      <path d="M13.4 10.8 H16" />
      <path d="M8 14.2 H16" />
      <path d="M8 17 H13.2" />
    </>
  )
};

export function CardIcon({ name }) {
  return (
    <div className="fv-card__ico">
      <svg viewBox="0 0 24 24" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">
        {SERVICE_ICONS[name] || SERVICE_ICONS.home}
      </svg>
    </div>
  );
}

export function CheckIcon() {
  // Two-tone tick: a soft red disc behind a crisp accent check.
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9.4" fill="var(--accent)" fillOpacity="0.14" stroke="none" />
      <path d="M7.6 12.2 10.7 15.2 16.4 8.8" />
    </svg>
  );
}
