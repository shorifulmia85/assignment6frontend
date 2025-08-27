import image1 from "@/assets/images/Home/htw1.png";
import image2 from "@/assets/images/Home/htw2.png";
import image3 from "@/assets/images/Home/htw3.png";
import image4 from "@/assets/images/Home/htw4.png";

const rideSteps = [
  {
    id: 1,
    title: "Set pickup & drop",
    description:
      "Choose locations in seconds with suggestions & recent places.",
    image: image1,
  },
  {
    id: 2,
    title: "Match with driver",
    description: "We auto-match you with high-rated nearby drivers.",
    image: image2,
  },
  {
    id: 3,
    title: "Track live",
    description: "Real-time tracking, driver details and ETA updates.",
    image: image3,
  },
  {
    id: 4,
    title: "Pay & rate",
    description: "Pay via card, cash or wallet and leave a quick rating.",
    image: image4,
  },
];

const HowItWorks = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 mt-16 lg:mt-5 mb-10">
      <h1 className="text-xl lg:text-3xl font-bold mb-8 text-[var(--foreground)]">
        How it works
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {rideSteps?.map((ride) => (
          <div
            key={ride.id}
            className="bg-card rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow space-y-3"
          >
            {/* Image wrapper */}
            <div className="flex items-center justify-center">
              <img
                src={ride.image}
                alt={ride.title}
                className="rounded-full size-16 border border-[var(--border)] p-2 bg-[var(--muted)]"
              />
            </div>

            {/* Title */}
            <p className="font-semibold text-[var(--foreground)]">
              {ride.title}
            </p>

            {/* Description */}
            <p className="text-sm text-[var(--muted-foreground)]">
              {ride.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
