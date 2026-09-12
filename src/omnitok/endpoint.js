// The OmniTok trigger. One line to swap when the platform API / SWA takes over.
// This is the same live Power Automate flow the site has used for over a year.
// A single flow serves both the quote request and the review submit, dispatched
// by the `act` field. DO NOT change this URL or the flow logic.
export const ISSUE_OMNITOK =
  "https://default6eda43f3fbf04e2b9978b543d9dd31.e3.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/21684b9b539d4493bae228eb248acc30/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=bYNkIm5UzKA3f3NNa-1Em788bH0LVLCir_nuVIvBKps";
