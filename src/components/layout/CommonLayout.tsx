import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="bg-background min-h-screen flex flex-col">{children}</div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CommonLayout;
