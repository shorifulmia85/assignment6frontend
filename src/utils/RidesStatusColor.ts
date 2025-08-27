// status-style.ts
export type RideStatus =
  | "requested"
  | "accepted"
  | "picked_up"
  | "in_transit"
  | "completed"
  | "cancelled";

type BadgeVariant = "soft" | "solid";

/** "picked up" | "picked-up" | "PICKED_UP" -> "picked_up" */
export function normalizeStatus(s: string): RideStatus {
  return s
    .trim()
    .replace(/[\s-]+/g, "_")
    .toLowerCase() as RideStatus;
}

/** Theme-aware, modern OKLCH colors (with dark: variants) */
export function getStatusClasses(
  status: string,
  variant: BadgeVariant = "soft"
) {
  const s = normalizeStatus(status);

  const base =
    "inline-flex items-center rounded-full border px-2 py-0.5 text-xs";

  const map: Record<RideStatus, Record<BadgeVariant, string>> = {
    requested: {
      // Neutral (subtle)
      soft:
        "bg-[oklch(0.96_0_0)] text-[oklch(0.40_0_0)] border-[oklch(0.90_0_0)] " +
        "dark:bg-[oklch(0.28_0_0)] dark:text-[oklch(0.88_0_0)] dark:border-[oklch(0.36_0_0)]",
      solid:
        "bg-[oklch(0.88_0_0)] text-[oklch(0.16_0_0)] " +
        "dark:bg-[oklch(0.36_0_0)] dark:text-[oklch(0.96_0_0)]",
    },
    accepted: {
      // Indigo
      soft:
        "bg-[oklch(0.93_0.06_270)] text-[oklch(0.42_0.13_270)] border-[oklch(0.86_0.06_270)] " +
        "dark:bg-[oklch(0.28_0.06_270)] dark:text-[oklch(0.85_0.12_270)] dark:border-[oklch(0.36_0.06_270)]",
      solid:
        "bg-[oklch(0.58_0.15_270)] text-white " +
        "dark:bg-[oklch(0.72_0.15_270)] dark:text-[oklch(0.15_0_0)]",
    },
    picked_up: {
      // Blue
      soft:
        "bg-[oklch(0.93_0.06_210)] text-[oklch(0.40_0.12_210)] border-[oklch(0.86_0.06_210)] " +
        "dark:bg-[oklch(0.30_0.06_210)] dark:text-[oklch(0.85_0.12_210)] dark:border-[oklch(0.38_0.06_210)]",
      solid:
        "bg-[oklch(0.65_0.14_210)] text-white " +
        "dark:bg-[oklch(0.42_0.12_210)] dark:text-[oklch(0.96_0_0)]",
    },
    in_transit: {
      // Amber / warm progress
      soft:
        "bg-[oklch(0.96_0.07_85)] text-[oklch(0.42_0.15_85)] border-[oklch(0.90_0.06_85)] " +
        "dark:bg-[oklch(0.32_0.06_85)] dark:text-[oklch(0.86_0.13_85)] dark:border-[oklch(0.40_0.06_85)]",
      solid:
        "bg-[oklch(0.70_0.19_85)] text-[oklch(0.15_0_0)] " +
        "dark:bg-[oklch(0.48_0.14_85)] dark:text-[oklch(0.96_0_0)]",
    },
    completed: {
      // Green (success)
      soft:
        "bg-[oklch(0.92_0.05_150)] text-[oklch(0.35_0.13_150)] border-[oklch(0.86_0.05_150)] " +
        "dark:bg-[oklch(0.30_0.05_150)] dark:text-[oklch(0.86_0.12_150)] dark:border-[oklch(0.38_0.05_150)]",
      solid:
        "bg-[oklch(0.65_0.20_150)] text-white " +
        "dark:bg-[oklch(0.52_0.18_150)] dark:text-[oklch(0.96_0_0)]",
    },
    cancelled: {
      // Red (danger)
      soft:
        "bg-[oklch(0.94_0.07_25)] text-[oklch(0.45_0.18_25)] border-[oklch(0.88_0.07_25)] " +
        "dark:bg-[oklch(0.34_0.07_25)] dark:text-[oklch(0.90_0.20_25)] dark:border-[oklch(0.42_0.07_25)]",
      solid:
        "bg-[oklch(0.62_0.24_25)] text-white " +
        "dark:bg-[oklch(0.52_0.22_25)] dark:text-[oklch(0.96_0_0)]",
    },
  };

  const styles = map[s] ?? map.requested;
  return `${base} ${styles[variant]}`;
}
