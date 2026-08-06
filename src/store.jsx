import { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  REVIEW_FUNDS, INSTRUCTORS, SEED_NOTES, DISBURSED, WON_PENDING,
  UPLOAD_MAX_BYTES, UPLOAD_TYPES
} from "./data";

const Ctx = createContext(null);
export const usePortal = () => useContext(Ctx);

const stampDay = () =>
  new Date().toLocaleString("en-US", { month: "short", day: "numeric" });
const stampTime = () =>
  new Date().toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

/* Wraps an action in a pending state so the button reports that the request
   is in flight. In production this is the request itself; here it is a timer
   long enough to be seen and short enough not to be theatre. */
const withPending = (setPending, key, ms, done) => {
  setPending(key);
  setTimeout(() => { setPending(null); done(); }, ms);
};

export function PortalProvider({ children }) {
  /* --- shell --- */
  const [ready, setReady] = useState(false);
  const [view, setView] = useState("dashboard");
  const [filter, setFilter] = useState("action");
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [pending, setPending] = useState(null);
  const [openFund, setOpenFund] = useState(null);

  /* --- workflow --- */
  const [nursing, setNursing] = useState(null);        // yes | no | null
  const [nursingAt, setNursingAt] = useState(null);
  const [essayOpen, setEssayOpen] = useState(false);
  const [essayText, setEssayText] = useState("");
  const [essaySubmitted, setEssaySubmitted] = useState(false);
  const [letterName, setLetterName] = useState(null);
  const [letterError, setLetterError] = useState(null);
  const [recFrom, setRecFrom] = useState("alvarez");
  const [reminderSentAt, setReminderSentAt] = useState(null);
  const [swapOpen, setSwapOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [marchReminder, setMarchReminder] = useState(false);
  const [notes, setNotes] = useState(SEED_NOTES);

  /* --- profile and settings --- */
  const blankProfile = {
    first: "Danielle", last: "Reyes",
    email: "d.reyes@student.lakeshore.edu", phone: "(773) 555-0142",
    program: "Nursing", load: "Part-time", grad: "Spring 2028"
  };
  const blankPrefs = { newFollowUp: true, deadline: true, decision: true, weekly: false };
  const [profile, setProfile] = useState(blankProfile);
  const [savedProfile, setSavedProfile] = useState(blankProfile);
  const [prefs, setPrefs] = useState(blankPrefs);
  const [savedPrefs, setSavedPrefs] = useState(blankPrefs);
  const [savedAt, setSavedAt] = useState(null);

  /* The fund service resolves before the first paint of real data. */
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 700);
    return () => clearTimeout(t);
  }, []);

  const say = useCallback((text) => {
    setToast(text ? { id: Date.now(), text } : null);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 6000);
    return () => clearTimeout(t);
  }, [toast]);

  const logNote = useCallback((title, body, go) => {
    setNotes((prev) => [
      { id: "n" + Date.now(), title, body, when: "Just now", read: true, go },
      ...prev
    ]);
  }, []);

  /* --- derived --- */
  const rec = INSTRUCTORS.find((i) => i.id === recFrom);
  const nursingOpen = nursing === null;
  const unlocks = (nursingOpen ? 1500 : 0) + (essaySubmitted ? 0 : 3000);
  const openTasks = (nursingOpen ? 1 : 0) + (essaySubmitted ? 0 : 1);
  const workMinutes = (nursingOpen ? 1 : 0) + (essaySubmitted ? 0 : 20);
  const extraReview = (nursing === "yes" ? 1500 : 0) + (essaySubmitted ? 3000 : 0);
  const inReview = REVIEW_FUNDS.reduce((s, f) => s + f.amount, 0) + extraReview;
  const reviewCount = REVIEW_FUNDS.length + (nursing === "yes" ? 1 : 0) + (essaySubmitted ? 1 : 0);
  const atRisk = !letterName;
  const won = DISBURSED + WON_PENDING;
  const secured = DISBURSED + (letterName ? WON_PENDING : 0);

  const nextReminder = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toLocaleString("en-US", { month: "short", day: "numeric" });
  })();

  const essayWords = essayText.trim() ? essayText.trim().split(/\s+/).length : 0;

  /* --- actions --- */
  const answerNursing = (value) =>
    withPending(setPending, "nursing-" + value, 450, () => {
      setNursing(value);
      setNursingAt(stampTime());
      if (value === "yes") {
        say("Answered Yes. $1,500 in review.");
        logNote("Nursing Excellence Fund submitted", "$1,500 moved from unlocks into review.", "action");
      } else {
        say("Answered No. Fund removed.");
        logNote("Nursing Excellence Fund removed", "It requires half-time enrollment.", "action");
      }
    });

  const submitEssay = () =>
    withPending(setPending, "essay", 700, () => {
      setEssaySubmitted(true);
      setEssayOpen(false);
      say("Essay submitted. $3,000 in review.");
      logNote("Lakeshore Alumni Grant submitted", "$3,000 moved from unlocks into review.", "action");
    });

  const sendReminder = () =>
    withPending(setPending, "reminder", 600, () => {
      setReminderSentAt(stampDay());
      say("Reminder sent to " + rec.name + ".");
      logNote(
        "You reminded " + rec.name,
        "Sent to " + rec.email + ", with a copy to you. You can send another on " + nextReminder + ".",
        "action"
      );
    });

  const swapRecommender = (i) =>
    withPending(setPending, "swap", 600, () => {
      setRecFrom(i.id);
      setReminderSentAt(null);
      setSwapOpen(false);
      say("Request sent to " + i.name + ".");
      logNote("You asked " + i.name + " for a letter", "Sent to " + i.email + ". The earlier request stays open.", "action");
    });

  /* Validates before it accepts. An upload that fails silently is worse than
     no upload at all when an award depends on it. */
  const uploadLetter = (file) => {
    if (!file) return;
    const ext = "." + file.name.split(".").pop().toLowerCase();
    if (!UPLOAD_TYPES.includes(ext)) {
      setLetterError("That file type is not accepted. Use a PDF, Word file, text file, or a photo.");
      say("Upload failed. Wrong file type.");
      return;
    }
    if (file.size > UPLOAD_MAX_BYTES) {
      setLetterError("That file is " + Math.round(file.size / 1048576) + " MB. The limit is 5 MB.");
      say("Upload failed. File too large.");
      return;
    }
    setLetterError(null);
    withPending(setPending, "letter", 900, () => {
      setLetterName(file.name);
      say("Letter uploaded. $2,500 secured.");
      logNote("Your thank-you letter is in", "Ellison Family Scholarship, $2,500. Payment follows verification.", "statement");
    });
  };

  const undoLetter = () => { setLetterName(null); say("Upload undone."); };

  const saveAccount = (what) =>
    withPending(setPending, "save", 600, () => {
      setSavedProfile(profile);
      setSavedPrefs(prefs);
      setSavedAt(stampTime());
      say(what + " saved.");
    });

  const discardAccount = () => {
    setProfile(savedProfile);
    setPrefs(savedPrefs);
    say("Changes discarded.");
  };

  const readNote = (n) => {
    setNotes((prev) => prev.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
    setNotifOpen(false);
    if (n.go === "statement") setView("statement");
    else { setView("dashboard"); setFilter("action"); }
  };

  const readAllNotes = () => setNotes((prev) => prev.map((n) => ({ ...n, read: true })));

  const dirty =
    JSON.stringify(profile) !== JSON.stringify(savedProfile) ||
    JSON.stringify(prefs) !== JSON.stringify(savedPrefs);

  const value = {
    ready, view, setView, filter, setFilter, menuOpen, setMenuOpen,
    notifOpen, setNotifOpen, toast, say, setToast, pending, openFund, setOpenFund,
    nursing, nursingOpen, nursingAt, answerNursing,
    essayOpen, setEssayOpen, essayText, setEssayText, essayWords, essaySubmitted, submitEssay,
    letterName, letterError, uploadLetter, undoLetter,
    rec, recFrom, reminderSentAt, nextReminder, sendReminder,
    swapOpen, setSwapOpen, swapRecommender,
    guideOpen, setGuideOpen, marchReminder, setMarchReminder,
    notes, readNote, readAllNotes,
    profile, setProfile, prefs, setPrefs, savedAt, dirty, saveAccount, discardAccount,
    unlocks, openTasks, workMinutes, inReview, reviewCount, atRisk, won, secured
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
