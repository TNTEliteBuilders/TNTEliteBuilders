import { getOmniTok } from "../omnitok/client.js";

// Reviews read from a static JSON file. Submits go through the OmniTok flow
// (createReview), the same path the site has always used.

export async function loadReviews() {
  const res = await fetch("/reviews/reviews.json", { cache: "no-store" });
  if (!res.ok) throw new Error("failed to load reviews");
  return res.json();
}

export async function submitReview({ name, rating, comment }) {
  const { endpoint, authToken, OmniTok, sid } = await getOmniTok("createReview");
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": authToken,
      "X-OmniTok": OmniTok,
      "X-SID": sid
    },
    body: JSON.stringify({
      id: `r-${Date.now()}`,
      name: name.trim(),
      rating: Number(rating),
      comment: comment.trim(),
      created_at: new Date().toISOString()
    })
  });
  if (!res.ok) throw new Error("review submit failed");
  return true;
}
