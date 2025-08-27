import LoginForm from "@/components/modules/Authentication/LoginForm";

const Login = () => {
  return (
    <div className="max-w-md mx-auto px-4 ">
      <div className=" min-h-screen flex flex-col items-center justify-center ">
        <div className=" w-full border border-primary rounded-2xl p-5">
          <div>
            <h1 className="text-2xl lg:text-3xl font-semibold text-center my-10">
              User Login
            </h1>

            <hr className="my-5 border-muted" />
          </div>
          <div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
