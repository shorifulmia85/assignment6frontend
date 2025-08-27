export default function LiveDot({
  active = true,
  size = 10, // px
  title = active ? "Live updating" : "Paused",
}: {
  active?: boolean;
  size?: number;
  title?: string;
}) {
  const s = `${size}px`;
  return (
    <span
      className="relative inline-flex"
      aria-label={title}
      title={title}
      style={{ width: s, height: s }}
    >
      {/* outer ping ring (only when active) */}
      {active && (
        <span
          className="absolute inline-flex rounded-full opacity-75 animate-ping"
          style={{
            width: s,
            height: s,
            backgroundColor: "rgb(16 185 129)", // emerald-500
          }}
        />
      )}
      {/* core dot */}
      <span
        className="relative inline-flex rounded-full"
        style={{
          width: s,
          height: s,
          backgroundColor: active ? "rgb(5 150 105)" : "rgba(120,120,120,0.6)", // emerald-600 or gray
          boxShadow: active ? "0 0 0 2px rgba(16,185,129,0.28)" : "none",
        }}
      />
    </span>
  );
}
