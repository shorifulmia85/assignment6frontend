export type Feature = { id: string; text: string };
export type RoleCard = {
  id: string; // unique id for the card
  role: "Rider" | "Driver" | "Admin";
  features: Feature[]; // bullet points with ids
  cta: { label: string; href: string };
};
