import type { RoleCard } from "@/types/home";

export const roleCards: RoleCard[] = [
  {
    id: "rider",
    role: "Rider",
    features: [
      { id: "r1", text: "Instant fare estimates" },
      { id: "r2", text: "Live driver ETA & tracking" },
      { id: "r3", text: "Saved places & recent trips" },
      { id: "r4", text: "Cash, card or wallet" },
      { id: "r5", text: "In-ride safety tools" },
    ],
    cta: { label: "Request a demo →", href: "/demo?r=rider" },
  },
  {
    id: "driver",
    role: "Driver",
    features: [
      { id: "d1", text: "Nearby ride queue" },
      { id: "d2", text: "Smart accept/auto-assign" },
      { id: "d3", text: "Day/week earnings dashboard" },
      { id: "d4", text: "In-app navigation hints" },
      { id: "d5", text: "Instant payouts" },
    ],
    cta: { label: "Request a demo →", href: "/demo?r=driver" },
  },
  {
    id: "admin",
    role: "Admin",
    features: [
      { id: "a1", text: "User & driver management" },
      { id: "a2", text: "Ride lifecycle oversight" },
      { id: "a3", text: "Fraud & safety audit tools" },
      { id: "a4", text: "Reports & CSV export" },
      { id: "a5", text: "Campaigns & promos" },
    ],
    cta: { label: "Request a demo →", href: "/demo?r=admin" },
  },
];
