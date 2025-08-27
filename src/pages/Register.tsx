import RegisterForm from "@/components/modules/Authentication/RegisterForm";
import RegisterTabs from "@/components/RegisterTabs";

import { useState } from "react";

const Register = () => {
  const [role, setRole] = useState<string>("rider");

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="min-h-screen flex flex-col items-center justify-center ">
        <div className="bg-background w-full border border-primary rounded-2xl p-5">
          <div>
            <h1 className="text-2xl lg:text-3xl font-semibold text-center my-10">
              {`Register ${role}`}
            </h1>

            <RegisterTabs role={role} setRole={setRole} />
            <hr className="my-5" />
          </div>
          <div>
            <RegisterForm role={role} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
