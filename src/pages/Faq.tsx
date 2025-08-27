import FaqAccordion from "@/components/FaqAccordion";

const Faq = () => {
  return (
    <div className=" py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div>
          <div className="space-y-3">
            <h1 className="text-2xl lg:text-4xl font-bold">Faq</h1>
            <p className="text-md lg:text-lg">
              Search common questions or expand an answer.
            </p>
          </div>

          <div className="border rounded-xl p-5 mt-5">
            <FaqAccordion />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
