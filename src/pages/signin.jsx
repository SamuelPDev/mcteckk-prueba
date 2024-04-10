import Input from "./components/input";
import { useState } from "react";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (event, setState) => {
    setShowError(false);
    setErrorMsg("");
    setState(event.target.value);
  };

  const handleSignin = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (data?.errors) {
      setErrorMsg(data?.errors?.message);
      setShowError(true);
    } else if (data?.token) {
      sessionStorage.setItem("token", data?.token);
      window.location.href = "/";
    }
  };

  return (
    <>
      <div className="flex justify-center h-screen w-screen items-center">
        <div className="w-full md:w-1/2 flex flex-col items-center ">
          <h1 className="text-center text-2xl font-bold text-gray-600 mb-6">
            LOGIN
          </h1>
          {showError && (
            <span className="text-lg text-red-600 mb-6">{errorMsg}</span>
          )}

          <div className="w-3/4 mb-6">
            <Input
              type="email"
              name="email"
              id="email"
              onChange={(e) => {
                handleChange(e, setEmail);
              }}
              placeholder="Email"
            />
          </div>

          <div className="w-3/4 mb-6">
            <Input
              type="password"
              name="password"
              onChange={(e) => {
                handleChange(e, setPassword);
              }}
              id="password"
              placeholder="Password"
            />
          </div>
          <a href="/signup" className="text-blue-700">
            Create New Account
          </a>
          <div className="w-3/4 mt-4">
            <button
              type="submit"
              className="py-4 bg-blue-400 w-full rounded text-blue-50 font-bold hover:bg-blue-700"
              onClick={handleSignin}
            >
              {" "}
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
