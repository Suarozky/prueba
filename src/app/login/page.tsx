"use client";

import Image from "next/image";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState } from "react";
import { GoEyeClosed } from "react-icons/go";
import { BsEye } from "react-icons/bs";

interface FormikValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const AuthPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = (values: FormikValues) => {
    const emailPrefix = values.email.split("@")[0];
    localStorage.setItem("userEmail", emailPrefix);
    console.log("Login successful:", emailPrefix);

    // Redirigir a /home
    window.location.href = "/home";
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex flex-col max-w-2xl bg-white shadow-lg rounded-xl m-10 px-2 py-10 sm:px-6 lg:flex-none lg:px-20 xl:px-24 w-full">
        <div className="flex flex-col mx-auto w-full">
          <div>
            <Image
              src="/web/logo.svg"
              alt="Your Company"
              width={180}
              height={40}
            />
            <h2 className="mt-8 text-2xl font-bold tracking-tight text-textPrimary">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-textSecondary">
              Dont have an account?{" "}
              <button
                type="button"
                className="font-semibold text-primary hover:text-primaryDark cursor-pointer"
              >
                Create it here
              </button>
            </p>
          </div>

          <div className="mt-10">
            <Formik
              initialValues={{
                email: "",
                password: "",
                rememberMe: false,
              }}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting}) => (
                <Form className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-textPrimary"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        className="block w-full rounded-md border-0 text-black px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-textPrimary"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <div className="relative">
                        <Field
                          id="password"
                          name="password"
                          type={passwordVisible ? "text" : "password"}
                          className="block w-full text-black px-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                          {passwordVisible ? (
                            <GoEyeClosed size={20} />
                          ) : (
                            <BsEye size={20} />
                          )}
                        </button>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Field
                        id="rememberMe"
                        name="rememberMe"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary hover:cursor-pointer"
                      />
                      <label
                        htmlFor="rememberMe"
                        className="ml-3 block text-sm text-textSecondary"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-primary hover:text-primaryDark"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-primaryDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      disabled={isSubmitting}
                    >
                      Sign in
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
