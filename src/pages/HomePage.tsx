import ContactUs from "@/components/modules/HomePages/AboutUs";
import Faq from "@/components/modules/HomePages/Faq";
import Hero from "@/components/modules/HomePages/Hero";
import HowItWorks from "@/components/modules/HomePages/HowItWorks";
import Offer from "@/components/modules/HomePages/Offer";
import ProductFeatured from "@/components/modules/HomePages/ProductFeatured";

const HomePage = () => {
  return (
    <div className="mb-10">
      <Hero />
      <HowItWorks />
      <div className="space-y-20">
        <ProductFeatured />
        <Offer />
        <Faq />
        <ContactUs />
      </div>
    </div>
  );
};

export default HomePage;
