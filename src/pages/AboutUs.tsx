import aboutImage from "@/assets/images/Home/aboutBanner.png";
import image1 from "@/assets/images/Home/about/image1.png";
import image2 from "@/assets/images/Home/about/image2.png";
import image3 from "@/assets/images/Home/about/image3.png";
import image4 from "@/assets/images/Home/about/image4.png";
import image5 from "@/assets/images/Home/about/image5.png";

type Service = {
  id: string;
  name: string;
  image: string;
  serviceHolder: string;
};

const services: Service[] = [
  {
    id: "s1",
    name: "Jeson Bike",
    image: image1,
    serviceHolder: "Engineer",
  },
  {
    id: "s2",
    name: "Bablu Singh",
    image: image2,
    serviceHolder: "Developer",
  },
  {
    id: "s3",
    name: "Maria Gupto",
    image: image3,
    serviceHolder: "Owner",
  },
  {
    id: "s4",
    name: "Ferguson vai",
    image: image4,
    serviceHolder: "Engineer",
  },
  {
    id: "s5",
    name: "Sabina Mim",
    image: image5,
    serviceHolder: "Developer",
  },
];

const AboutUs = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto mt-10 px-4 mb-10">
        <div>
          <img
            className="rounded-md h-56 lg:h-[40vh] w-full"
            src={aboutImage}
            alt=""
          />
        </div>
        <div className="space-y-5 mt-10">
          <h1 className="text-2xl lg:text-4xl font-semibold ">
            About Swift Ride
          </h1>
          <p className="font-tight  lg:text-xl">
            Swift Ride was founded with a simple mission: to provide reliable,
            safe, and fun dog walking services for busy pet owners. We
            understand that your dog is a part of your family, and we treat them
            with the same care and love as our own pets. Our team of dedicated
            walkers is passionate about animals and committed to ensuring your
            dog's happiness and well-being.
          </p>
        </div>
        <div className="space-y-5 mt-10">
          <h1 className="text-2xl lg:text-4xl font-semibold ">Our Mission</h1>
          <p className="font-tight  lg:text-xl">
            At Swift ride, our mission is to enhance the lives of dogs and their
            owners by providing exceptional dog walking services. We strive to
            create a positive and enriching experience for every dog in our
            care, promoting their physical and mental health. We are dedicated
            to building trust and lasting relationships with our clients,
            ensuring peace of mind and satisfaction.
          </p>
        </div>

        <div className="space-y-5 mt-10">
          <h1 className="text-2xl lg:text-4xl font-semibold ">Meet our team</h1>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {services?.map((item) => (
              <div
                className="flex items-center flex-col shadow-sm border bg-background rounded-2xl p-5"
                key={item?.id}
              >
                <img
                  className="rounded-full size-20 mb-5"
                  src={item?.image}
                  alt=""
                />
                <h3 className="text-lg font-semibold">{item?.name}</h3>
                <h4>{item?.serviceHolder}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
