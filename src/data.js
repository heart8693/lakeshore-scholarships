/* Fixture data for the prototype. In production this comes from the fund service. */

export const GAP = 6800; // unmet need for the year, after Pell and MAP

export const REVIEW_FUNDS = [
  { id: "chicago-nurses", name: "Chicago Nurses Auxiliary Fund", amount: 4000, donor: "the Chicago Nurses Auxiliary" },
  { id: "foundation", name: "Lakeshore Foundation General Scholarship", amount: 2000, donor: "the Lakeshore College Foundation" },
  { id: "south-shore", name: "South Shore Alumni Fund", amount: 1500, donor: "the South Shore alumni chapter" },
  { id: "health-access", name: "Health Careers Access Grant", amount: 1250, donor: "the Beattie family" },
  { id: "commuter", name: "Commuter Student Fund", amount: 600, donor: "Lakeshore student government" },
  { id: "evening", name: "Evening Learner Award", amount: 400, donor: "the Ruiz family" }
];

export const INSTRUCTORS = [
  { id: "alvarez", name: "Prof. Alvarez", course: "Anatomy & Physiology II", email: "m.alvarez@lakeshore.edu" },
  { id: "nguyen", name: "Prof. Nguyen", course: "Pharmacology", email: "t.nguyen@lakeshore.edu" },
  { id: "okafor", name: "Dr. Okafor", course: "Clinical Practicum", email: "a.okafor@lakeshore.edu" }
];

export const APP_SECTIONS = [
  { id: "personal", name: "Personal information", summary: "Danielle Reyes · Chicago, IL · first-generation student" },
  { id: "academic", name: "Academic information", summary: "Nursing, part-time · 34 credits earned · GPA 3.4" },
  { id: "financial", name: "Financial information", summary: "FAFSA on file · unmet need $6,800 for the year" },
  { id: "qualification", name: "Qualification questions", summary: "12 of 12 answered" },
  { id: "essays", name: "Essay responses", summary: "2 of 2 submitted" },
  { id: "recommendation", name: "Letters of recommendation", summary: "1 requested, not yet returned" }
];

export const CHARGES = [
  ["Tuition · 24 credits at $182.50", 4380],
  ["Fees", 520],
  ["Books and supplies", 900],
  ["Transportation", 1600],
  ["Living allowance", 5200]
];

export const EXISTING_AID = [
  ["Federal Pell Grant", 3800],
  ["Illinois MAP Grant", 2000]
];

export const FUND_DETAILS = {
  "Nursing Book Grant": { donor: "the Lakeshore nursing faculty", awards: 20, applicants: 96, deadline: "Closed Jun 1", criteria: ["Enrolled in the nursing program", "Any credit load"] },
  "Ellison Family Scholarship": { donor: "Margaret Ellison, class of 1974", awards: 2, applicants: 58, deadline: "Closed Jul 20", criteria: ["Half-time enrollment", "Cumulative GPA 2.5", "Illinois resident"] },
  "Nursing Excellence Fund": { donor: "the Lakeshore nursing faculty", awards: 4, applicants: 61, deadline: "Aug 29", criteria: ["Half-time enrollment", "Nursing major", "One short answer"] },
  "Lakeshore Alumni Grant": { donor: "the Lakeshore alumni association", awards: 6, applicants: 140, deadline: "Sept 12", criteria: ["Any program", "300-word essay", "GPA 2.0"] },
  "Chicago Nurses Auxiliary Fund": { donor: "the Chicago Nurses Auxiliary", awards: 3, applicants: 88, deadline: "Closed Aug 1", criteria: ["Nursing major", "Cook County resident", "Letter of recommendation"] },
  "Lakeshore Foundation General Scholarship": { donor: "the Lakeshore College Foundation", awards: 25, applicants: 310, deadline: "Closed Aug 1", criteria: ["Any program", "Demonstrated need"] },
  "South Shore Alumni Fund": { donor: "the South Shore alumni chapter", awards: 5, applicants: 47, deadline: "Closed Aug 1", criteria: ["South Shore high school graduate", "Any program"] },
  "Health Careers Access Grant": { donor: "the Beattie family", awards: 8, applicants: 120, deadline: "Closed Aug 1", criteria: ["Health sciences program", "First-generation student"] },
  "Commuter Student Fund": { donor: "Lakeshore student government", awards: 30, applicants: 210, deadline: "Closed Aug 1", criteria: ["Lives more than 5 miles from campus"] },
  "Evening Learner Award": { donor: "the Ruiz family", awards: 12, applicants: 64, deadline: "Closed Aug 1", criteria: ["Two or more evening courses", "Employed 20+ hours a week"] },
  "Lakeshore Trustees Award": { donor: "the Lakeshore board of trustees", awards: 1, applicants: 212, deadline: "Reopens Mar 2", criteria: ["Cumulative GPA 3.5", "Leadership record", "Two recommendations"] },
  "Bilingual Health Workers Fund": { donor: "Sofia and Raul Medina", awards: 6, applicants: 74, deadline: "Reopens Mar 2", criteria: ["Health sciences program", "Fluent in a second language"] },
  "Second-Year Persistence Grant": { donor: "the Lakeshore College Foundation", awards: 40, applicants: 260, deadline: "Reopens Mar 2", criteria: ["Completed 24 credits", "Returning next term"] }
};

export const SEED_NOTES = [
  { id: "letter", title: "Your thank-you letter is due in 6 days", body: "Ellison Family Scholarship, $2,500. The offer is withdrawn without it.", when: "Aug 5", read: false, go: "action" },
  { id: "rec", title: "Prof. Alvarez has not returned your letter", body: "Requested 9 days ago. It blocks 3 awards worth $6,750. You can send a reminder.", when: "Aug 4", read: false, go: "action" },
  { id: "paid", title: "$600 was paid to your student account", body: "Nursing Book Grant. Nothing else is needed.", when: "Aug 1", read: true, go: "statement" }
];

export const DISBURSED = 600; // Nursing Book Grant, already in her student account
export const WON_PENDING = 2500; // Ellison, contingent on the thank-you letter

export const money = (n) => "$" + n.toLocaleString("en-US");

export const odds = (name) => {
  const d = FUND_DETAILS[name];
  if (!d) return "";
  const v = (d.awards / d.applicants) * 100;
  return v < 1 ? "under 1%" : Math.round(v) + "%";
};

export const UPLOAD_MAX_BYTES = 5 * 1024 * 1024;
export const UPLOAD_TYPES = [".pdf", ".doc", ".docx", ".txt", ".png", ".jpg", ".jpeg", ".heic"];
