import { ISSUE_OMNITOK } from "./endpoint.js";

// The OmniTok preflight, shared by reviews and the quote form. Step 1: mint a
// single-use token for an action. Callers then POST their payload to the
// returned endpoint with the returned auth headers. Same flow the site has
// always used; behavior is unchanged, just isolated to one module.

function sid() {
  let s = sessionStorage.getItem("sid");
  if (!s) {
    s = crypto.randomUUID();
    sessionStorage.setItem("sid", s);
  }
  return s;
}

export async function getOmniTok(act) {
  const body = typeof act === "string" ? { act, sid: sid() } : { sid: sid(), ...act };
  const res = await fetch(ISSUE_OMNITOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`OmniTok preflight failed for ${body.act || act}`);
  const data = await res.json();
  return { ...data, sid: sid() };
}
