import { useEffect, useState } from "react";
import { StaticRating, RatingPicker } from "./Stars.jsx";
import SubmitSlider from "./SubmitSlider.jsx";
import { loadReviews, submitReview } from "./api.js";
import { CONTACT } from "../site.js";
import "./reviews.css";

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function Card({ r }) {
  return (
    <div className="review-item">
      <StaticRating value={r.rating} />
      <div className="review-name">{r.name}</div>
      {r.created_at && <div className="review-date">{formatDate(r.created_at)}</div>}
      <p className="review-text">{r.comment}</p>
    </div>
  );
}

function Modal({ onClose }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState(null);

  const valid = name.trim() && comment.trim() && rating >= 1;

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.documentElement.classList.add("body-lock");
    return () => { document.removeEventListener("keydown", onKey); document.documentElement.classList.remove("body-lock"); };
  }, [onClose]);

  async function send() {
    if (!valid || busy) return;
    setBusy(true);
    setToast({ text: "Submitting review…", ok: true });
    try {
      await submitReview({ name, rating, comment });
      setToast({ text: "Review submitted. Thank you. Please allow a moment for it to appear.", ok: true });
      setTimeout(onClose, 1800);
    } catch {
      setBusy(false);
      setToast({ text: `That did not go through. Please try again, or email ${CONTACT.email}.`, ok: false });
    }
  }

  return (
    <div className="review-popup" role="dialog" aria-modal="true" aria-label="Leave a review">
      <div className="review-overlay" onClick={onClose} />
      <div className="review-card" role="document">
        <button className="review-close-x" type="button" aria-label="Close" onClick={onClose}>✕</button>
        <h2>Leave <span>a Review</span></h2>

        <label className="review-label">
          Business name or first name and last initial
          <input className="review-input" type="text" maxLength={40} value={name}
            placeholder="Business Co or John D." autoComplete="off"
            onChange={(e) => setName(e.target.value)} disabled={busy} />
        </label>

        <label className="review-label">
          Rating
          <RatingPicker value={rating} onChange={setRating} />
        </label>

        <label className="review-label">
          Review
          <textarea className="review-input" rows={4} maxLength={250} value={comment}
            placeholder="Tell us what the work was and how it went." onChange={(e) => setComment(e.target.value)} disabled={busy} />
        </label>

        <SubmitSlider disabled={!valid || busy} onComplete={send} />

        {toast && (
          <div className={"review-toast-inline " + (toast.ok ? "ok" : "bad")} role="status" aria-live="polite">
            {toast.text}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => { loadReviews().then((r) => setReviews(Array.isArray(r) ? r : [])).catch(() => setReviews([])); }, []);

  return (
    <section className="fv-section fv-section--tight reviews" id="reviews">
      <div className="fv-wrap">
        <div className="fv-head fv-reveal">
          <span className="fv-eyebrow"><span className="n">/</span> Reviews</span>
          <h2 className="fv-h2">What our clients say</h2>
          <p className="fv-lead">Real names, real projects. Here is what people say after the work is done.</p>
        </div>

        <div className="review-rail">
          {reviews.map((r, i) => <Card key={r.id || i} r={r} />)}
        </div>

        <div className="review-actions">
          <button className="btn btn--primary" type="button" onClick={() => setOpen(true)}>Leave a Review</button>
        </div>
      </div>

      {open && <Modal onClose={() => setOpen(false)} />}
    </section>
  );
}
