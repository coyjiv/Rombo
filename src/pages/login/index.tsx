import React from "react";
import Image from 'next/image'
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputField from "@/components/InputField";
import Link from 'next/link';
type Props = {};

const LoginPage = (props: Props) => {
  const validate = Yup.object({
  
    email: Yup.string().email("Email is invalid!").required("Email Required!"),
    password: Yup.string()
    .required("Password Required!"),
      });
  const initialValues = {
    email: "",
    password: "",
    
  };
  return (
    <div className="font-custom h-screen w-screen bg-light-purple">
  <h1 className="text-4xl text-white flex justify-center items-center pt-16 pb-6">
    Rombo
  </h1>
  <div className="flex justify-center items-center pb-8">
    <Image
      className="bg-dark-purple bg-opacity-20 rounded-full"
      alt="Logo"
      src="/img/logo.png"
      width={100}
      height={100}
    />
  </div>
  <Formik
    initialValues={initialValues}
    validationSchema={validate}
    onSubmit={(values) => {
      alert(JSON.stringify(values, null, 2));
    }}
  >
    {(formik) => (
      <div className="flex justify-center items-center text-white">
        <Form className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-xl shadow-2xl px-2 sm:px-6 py-6 mb-8 bg-medium-purple">
          <h1 className="text-3xl pb-4 flex justify-center">Log in</h1>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl pb-4 flex justify-center">
              Still don&apos;t have an account?
            </h1>
            <Link className="mb-4 text-xl underline" href="/register">
              Sign up
            </Link>
          </div>

          <InputField
            type="email"
            name="email"
            label="Email"
            placeholder="Your email"
          />
          <InputField
            type="text"
            name="password"
            label="Password"
            placeholder="******"
          />
          <button className="flex items-center justify-center bg-blue-400 hover:bg-blue-500 duration-300 rounded-lg mx-auto px-8 py-4" type="submit">
            Log in
          </button>
        </Form>
      </div>
    )}
  </Formik>
</div>
  );
}
export default LoginPage;

