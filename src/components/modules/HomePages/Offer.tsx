import { Button } from "@/components/ui/button";

const Offer = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 mt-20">
      <div className="flex flex-col md:flex-row items-center justify-between bg-chart-3 p-10 rounded-xl gap-6">
        {/* Text Section */}
        <div>
          <h1 className="text-background text-2xl lg:text-3xl font-semibold mb-3">
            Save 20% on your first 3 rides
          </h1>
          <p className="text-background text-sm lg:text-base">
            Use code <span className="font-semibold">SWIFT20</span> at checkout
            — terms apply
          </p>
        </div>

        {/* CTA Button */}
        <Button
          size="lg"
          variant="secondary" // keeps good contrast on bg-chart-3
          className="font-medium"
        >
          Claim offer
        </Button>
      </div>
    </div>
  );
};

export default Offer;
