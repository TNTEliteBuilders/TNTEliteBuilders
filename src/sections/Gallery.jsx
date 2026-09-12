import BeforeAfter from "../ui/BeforeAfter.jsx";

export default function Gallery({ data }) {
  return (
    <section className="fv-section" id="projects">
      <div className="fv-wrap">
        <div className="fv-head fv-reveal">
          <span className="fv-eyebrow"><span className="n">/</span> {data.eyebrow}</span>
          <h2 className="fv-h2">{data.title}</h2>
          <p className="fv-lead">{data.intro}</p>
        </div>
        <div className="tnt-gallery fv-reveal">
          {data.compare.map((c, i) => (
            <div className="tnt-tile" key={"c" + i}><BeforeAfter after={c.after} before={c.before} /></div>
          ))}
          {data.images.map((im, i) => (
            <div className="tnt-tile" key={"i" + i}><img src={im.src} alt={im.alt} loading="lazy" /></div>
          ))}
          {data.video && (
            <div className="tnt-tile">
              <video controls preload="none" playsInline poster={data.video.poster}>
                <source src={data.video.src} type="video/quicktime" />
              </video>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
