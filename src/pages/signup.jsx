import Input from "./components/input";
import { useState } from "react";

export const SignUp = () => {
  const initialFormState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    verifyPassword: "",
    defaultCompany: "",
  };

  const [form, setForm] = useState(initialFormState);

  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (event) => {
    setShowError(false);
    setErrorMsg("");
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const formKeys = Object.keys(form);

    for (const keys of formKeys) {
      if (!form[keys]) {
        setShowError(true);
        setErrorMsg(`${keys} field is required`);
        return false;
      }
    }

    if (form.password !== form.verifyPassword) {
      setShowError(true);
      setErrorMsg(`Passwords do not match`);
      return false;
    }

    return true;
  };

  const handleSignin = async () => {
    if (validateForm()) {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users`, {
        method: "POST",
        body: JSON.stringify({
          firstname: form.firstname,
          lastname: form.lastname,
          email: form.email,
          password: form.password,
          verify_password: form.verifyPassword,
          default_company: form.defaultCompany,
        }),
      });

      const data = await res.json();

      if (data?.errors) {
        setErrorMsg(data?.errors?.message);
        setShowError(true);
      } else if (data?.user) {
        window.location.href = "/";
      }
    }
  };

  return (
    <>
      <div className="flex justify-center h-screen w-screen items-center">
        <div className="w-full md:w-1/2 flex flex-col items-center ">
          <h1 className="text-center text-2xl font-bold text-gray-600 mb-6">
            Create Account
          </h1>
          {showError && (
            <span className="text-lg text-red-600 mb-6">{errorMsg}</span>
          )}

          <div className="w-3/4 mb-6">
            <Input
              type="text"
              id="firstname"
              placeholder="Firstname"
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
            />
          </div>

          <div className="w-3/4 mb-6">
            <Input
              type="text"
              id="lastname"
              placeholder="Lastname"
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
            />
          </div>

          <div className="w-3/4 mb-6">
            <Input
              type="email"
              id="email"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="w-3/4 mb-6">
            <Input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="w-3/4 mb-6">
            <Input
              type="password"
              id="verifyPassword"
              placeholder="Verify Password"
              name="verifyPassword"
              value={form.verifyPassword}
              onChange={handleChange}
            />
          </div>

          <div className="w-3/4 mb-6">
            <Input
              type="text"
              id="defaultcompany"
              placeholder="Default Company"
              name="defaultCompany"
              value={form.defaultCompany}
              onChange={handleChange}
            />
          </div>
          <a href="/signin" className="text-blue-700">
            Go to login
          </a>
          <div className="w-3/4 mt-4">
            <button
              type="submit"
              className="py-4 bg-blue-400 w-full rounded text-blue-50 font-bold hover:bg-blue-700"
              onClick={handleSignin}
            >
              {" "}
              Create Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
