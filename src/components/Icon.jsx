const GEAR =
  "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z";

const RECEIPT =
  "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z";

const FILE = "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8h-4a2 2 0 0 1-2-2z";

/* One family: Lucide geometry on a 24 grid, rendered at 16.
   Selected nav items use the filled variant, with interior detail knocked out
   by fill-rule so the glyph stays legible on any background. */
export default function Icon({ name, size = 16, filled = false }) {
  const line = {
    width: size, height: size, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round",
    strokeLinejoin: "round", "aria-hidden": "true", focusable: "false"
  };
  const solid = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "currentColor", "aria-hidden": "true", focusable: "false"
  };

  switch (name) {
    case "dashboard":
      return filled ? (
        <svg {...solid}>
          <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
          <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
          <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
          <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
        </svg>
      ) : (
        <svg {...line}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
      );

    case "application":
      return filled ? (
        <svg {...solid} fillRule="evenodd" clipRule="evenodd">
          <path d={FILE + " M8 12.1h8v1.9H8z M8 16.1h6v1.9H8z"} />
          <path d="M15.5 2.5 19.5 6.5H16a.5.5 0 0 1-.5-.5z" />
        </svg>
      ) : (
        <svg {...line}>
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          <path d="M16 13H8M16 17H8" />
        </svg>
      );

    case "scholarships":
      return filled ? (
        <svg {...solid}>
          <rect x="3" y="5" width="18" height="2.4" rx="1.2" />
          <rect x="3" y="10.8" width="18" height="2.4" rx="1.2" />
          <rect x="3" y="16.6" width="11" height="2.4" rx="1.2" />
        </svg>
      ) : (
        <svg {...line}><path d="M21 6H3M17 12H3M14 18H3" /></svg>
      );

    case "awards":
      return filled ? (
        <svg {...solid} fillRule="evenodd" clipRule="evenodd">
          <path d="M12 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12m0 3.4a2.6 2.6 0 1 1 0 5.2 2.6 2.6 0 0 1 0-5.2" />
          <path d="M8.21 13.89 6.7 22.41a.5.5 0 0 0 .81.47l3.58-2.69a1 1 0 0 1 1.2 0l3.59 2.69a.5.5 0 0 0 .8-.47l-1.51-8.52a8 8 0 0 1-7.96 0Z" />
        </svg>
      ) : (
        <svg {...line}>
          <circle cx="12" cy="8" r="6" />
          <path d="m15.48 12.89 1.51 8.52a.5.5 0 0 1-.81.47l-3.58-2.68a1 1 0 0 0-1.2 0l-3.58 2.68a.5.5 0 0 1-.81-.47l1.51-8.52" />
        </svg>
      );

    case "statement":
      return filled ? (
        <svg {...solid} fillRule="evenodd" clipRule="evenodd">
          <path d={RECEIPT + " M8 8.1h8v1.9H8z M8 13.1h6v1.9H8z"} />
        </svg>
      ) : (
        <svg {...line}>
          <path d={RECEIPT} />
          <path d="M16 9H8M14 14H8" />
        </svg>
      );

    case "profile":
      return filled ? (
        <svg {...solid}>
          <circle cx="12" cy="7.5" r="4" />
          <path d="M4.6 21a7.4 7.4 0 0 1 14.8 0z" />
        </svg>
      ) : (
        <svg {...line}>
          <circle cx="12" cy="7.5" r="4" />
          <path d="M5 21v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1" />
        </svg>
      );

    case "settings":
      return filled ? (
        <svg {...solid} fillRule="evenodd" clipRule="evenodd">
          <path d={GEAR + " M15 12a3 3 0 1 0-6 0 3 3 0 0 0 6 0Z"} />
        </svg>
      ) : (
        <svg {...line}>
          <path d={GEAR} />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );

    case "bell":
      return (
        <svg {...line}>
          <path d="M10.268 21a2 2 0 0 0 3.464 0" />
          <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
        </svg>
      );

    case "menu":
      return <svg {...line} width="18" height="18"><path d="M4 6h16M4 12h16M4 18h16" /></svg>;

    case "close":
      return <svg {...line} width="18" height="18"><path d="M18 6 6 18M6 6l12 12" /></svg>;

    case "search":
      return (
        <svg {...line}>
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      );

    default:
      return null;
  }
}
