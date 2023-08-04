import React from "react";
import Image from 'next/image'
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputField from "@/components/InputField";
import Link from 'next/link';
type Props = {};

const RegistrationPage = (props: Props) => {
  const validate = Yup.object({
    firstName: Yup.string().required("First name required!"),
    lastName: Yup.string().required("Last name required!"),
    email: Yup.string().email("Email is invalid!").required("Email Required!"),
    date: Yup.date().required("Date of birth required!"),
    password: Yup.string()
    .min(8, "Password must be minimum 8 digits!")
    .required("Password Required!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"),], "Password must match!")
      .required("Confirm password is reqired!"),
    checkbox: Yup.boolean().test("is-checked", "Fill the checkbox to continue", (value) => value === true),
      });
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    confirmPassword: "",
  };
  return (
    <div className="min-h-screen w-full font-custom bg-light-purple">
  <h1 className="text-white flex justify-center items-center pt-16 pb-6">
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
        <Form className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/3 rounded-xl shadow-2xl px-4 sm:px-8 py-6 mb-8 bg-medium-purple">
          <h1 className="text-3xl pb-4 flex justify-center">Sign up</h1>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl pb-4 flex justify-center">
              Already have an account?{" "}
            </h1>
            <Link className="mb-4 text-xl underline" href="/login">
              Log in
            </Link>
          </div>
          <InputField
            type="text"
            label="First name"
            name="firstName"
            placeholder="John"
          />
          <InputField
            type="text"
            name="lastName"
            label="Last name"
            placeholder="Lennon"
          />
          <InputField
            type="email"
            name="email"
            label="Email"
            placeholder="Your email"
          />
          <InputField
            type="date"
            name="date"
            label="Date of birth"
          />
          <InputField
            type="text"
            name="password"
            label="Password"
            placeholder="******"
          />
          <InputField
            type="text"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="******"
          />
          <InputField
            type="checkbox"
            name="checkbox"
            label="By checking this box, I agree to terms of the service"
          />
          <button className="flex items-center justify-center bg-blue-400 hover:bg-blue-500 duration-300 rounded-lg mx-auto px-8 py-4" type="submit">
            Register
          </button>
        </Form>
      </div>
    )}
  </Formik>
</div>
  );
}
export default RegistrationPage;

