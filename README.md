# Lakeshore Scholarships — student dashboard

A one-page dashboard for a student who is mid-cycle on scholarship applications.
Built for the AwardSpring product design take-home.

**Live:** https://lakeshore-scholarships.vercel.app

## What it answers

1. **What do I do next** — a queue sorted by deadline against dollars, with the
   effort of each task shown next to its value.
2. **Where do I stand** — three figures at the top: what is still locked behind a
   task, what is in review, what is won.
3. **What can I act on here** — every task in the queue completes on this screen.
   Nothing links out to a dead end.

## Running it

```bash
npm install
npm run dev
```

## Structure

```
src/
  data.js              fixture data and money/odds helpers
  store.jsx            all portal state and the actions that mutate it
  App.jsx              shell, page heads, view switch
  hooks/useCountUp.js  number transitions and shared Escape handling
  components/          Icon, Pill, Card, Meter, Drawer, Toast, Sidebar,
                       NotificationBell, Skeleton
  views/               Dashboard, Application, Scholarships, Awards,
                       Statement, Account (Profile + Settings)
  styles.css           tokens and layout
```

State lives in one provider rather than in each view, so a single action — answering
a follow-up, uploading a letter — updates the header figures, the queue, the statement,
and the notification list from one place.

## Design notes

- **Dollars and deadlines, not counts.** The unit a student decides in is money and
  time, so those lead. Every row carries the number that determines its own priority:
  dollars where the money is still winnable, a date where it is already fixed and only
  the deadline moves.
- **Colour is reserved.** Filled accent means "you can press this". Red means "you can
  lose this". Status is carried by a word plus a small dot, never colour alone.
- **Institution theming.** One accent token drives the sidebar wash, the lead card, and
  the primary buttons. The school logo is used unmodified.
- **Motion is functional.** Numbers count so a change reads as a change; the drawer
  slides from its edge; the notification panel scales from the bell. Everything is CSS
  transition rather than keyframes so it can be interrupted, stays under 300ms, and
  animates transform and opacity only. `prefers-reduced-motion` drops movement and keeps
  opacity.
- **States that are not the happy path.** Initial load has a skeleton, submissions have a
  pending state, uploads validate type and size, search has an empty state, and the
  dashboard has a completed state where the lead figure becomes the decision date.

## What is fictional

Lakeshore College is a real institution; its name and logo appear here only to show how
the portal takes on an institution's identity. Every student, donor, fund, figure, and
selection rate is invented for this exercise, and no email is actually sent.
