const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function Structure() {
  return (
    <>
      <path {...common} d="M3 20.5h18" />
      <path {...common} d="M6 20.5v-6.5h3.2V20.5" />
      <path {...common} d="M14.8 20.5v-6.5H18V20.5" />
      <path {...common} d="M4.5 14h15" />
      <path {...common} d="M7.2 14V8.5h9.6V14" />
      <path {...common} d="M4.5 8.5h15" />
    </>
  );
}

function Masonry() {
  return (
    <>
      <rect {...common} x="3" y="4.5" width="8" height="4" />
      <rect {...common} x="13" y="4.5" width="8" height="4" />
      <rect {...common} x="7" y="10" width="10" height="4" />
      <rect {...common} x="3" y="15.5" width="8" height="4" />
      <rect {...common} x="13" y="15.5" width="8" height="4" />
    </>
  );
}

function Plaster() {
  return (
    <>
      <path {...common} d="M4 16.5 14.5 6l3.5 3.5L7.5 20H4v-3.5Z" />
      <path {...common} d="M13 7.5 16.5 11" />
      <path {...common} d="M15 5.5c1.2-1.6 3.2-1.8 4.4-.4 1.2 1.4.6 3.2-1 4.2" />
    </>
  );
}

function Flooring() {
  return (
    <>
      <rect {...common} x="3.5" y="3.5" width="7" height="7" />
      <rect {...common} x="13.5" y="3.5" width="7" height="7" />
      <rect {...common} x="3.5" y="13.5" width="7" height="7" />
      <rect {...common} x="13.5" y="13.5" width="7" height="7" />
    </>
  );
}

function Openings() {
  return (
    <>
      <rect {...common} x="4" y="3.5" width="16" height="17" />
      <path {...common} d="M12 3.5v17" />
      <path {...common} d="M4 12h16" />
      <path {...common} d="M3 20.5h18" />
    </>
  );
}

function Woodwork() {
  return (
    <>
      <rect {...common} x="3.5" y="4" width="17" height="16" />
      <path {...common} d="M12 4v16" />
      <path {...common} d="M3.5 9.5h17" />
      <path {...common} d="M9.2 13.2h.8" />
      <path {...common} d="M14 13.2h.8" />
    </>
  );
}

function Paint() {
  return (
    <>
      <path {...common} d="M5 14.5c0-4 2.2-6 4.2-6H15V5.5h3.2V11H9.2" />
      <path {...common} d="M8.2 14.5v4.2a1.6 1.6 0 0 0 3.2 0v-1.2" />
      <path {...common} d="M15 8.2h3.2" />
    </>
  );
}

function Handover() {
  return (
    <>
      <circle {...common} cx="8" cy="12" r="3.2" />
      <path {...common} d="M11 12h9" />
      <path {...common} d="M16.5 12v2.4" />
      <path {...common} d="M19 12v2" />
    </>
  );
}

const ICONS = {
  structure: Structure,
  masonry: Masonry,
  plaster: Plaster,
  flooring: Flooring,
  openings: Openings,
  woodwork: Woodwork,
  paint: Paint,
  handover: Handover,
};

export default function StageIcon({ name, className = "h-6 w-6" }) {
  const Icon = ICONS[name] ?? Structure;

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <Icon />
    </svg>
  );
}
