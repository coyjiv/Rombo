import * as React from "react";
import Image from "next/image";
import { Formik, Form, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import InputField from "@/components/InputField";
import Link from "next/link";
import Counter from "@/components/Counter";
type Props = {};
import { FaUser } from "react-icons/fa";
import { AiFillMail } from "react-icons/ai";
import {AiFillDatabase} from "react-icons/ai"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RegistrationPage = (props: Props) => {
  const validate = Yup.object({
    firstName: Yup.string().required("First name required!"),
    lastName: Yup.string().required("Last name required!"),
    email: Yup.string().email("Email is invalid!").required("Email Required!"),
    date: Yup.date().nullable().required("Date of birth required!"),
    password: Yup.string()
      .min(8, "Password must be minimum 8 digits!")
      .required("Password Required!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password must match!")
      .required("Confirm password is required!"),
    checkbox: Yup.boolean().test(
      "is-checked",
      "Fill the checkbox to continue",
      (value) => value === true
    ),
  });
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    date: null,
    password: "",
    confirmPassword: "",
    checkbox: "",
  };

  return (
    <div className="min-h-screen w-full font-custom bg-customImage">
      <Counter />
      <h1 className="text-5xl text-white flex justify-center items-center pt-12 pb-6">
        ROMBO
      </h1>
      <div className="flex justify-center items-center pb-8">
        <Image
          className=" bg-gradient-to-br from-purple-700 to-indigo-900  rounded-full"
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
            <Form className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/3 rounded-xl shadow-2xl px-4 sm:px-8 py-6 mb-8 bg-gradient-to-br from-purple-700 to-indigo-900 ">
              <h1 className="text-3xl pb-4 flex justify-center">Sign up</h1>
              <div className="flex items-center gap-4">
                <h1 className="text-2xl pb-4 flex justify-center">
                  Already have an account?
                </h1>
                <Link className="mb-4 text-xl underline" href="/login">
                  Log in
                </Link>
              </div>
              <InputField
                type="text"
                name="firstName"
                placeholder="First name"
                icon={<FaUser />}
              />
              <InputField
                type="text"
                name="lastName"
                placeholder="Last name"
                icon={<FaUser />}
              />
              <InputField
                type="email"
                name="email"
                placeholder="Your email"
                icon={<AiFillMail />}
              />
              <DatePicker
             onKeyDown={(e) => e.preventDefault()} 
             onKeyUp={(e) => e.preventDefault()} 
             onFocus={(e) => e.preventDefault()}
             placeholderText="Date of birth"
             selected={formik.values.date}
             onChange={(date) => formik.setFieldValue("date", date)}
             onBlur={formik.handleBlur("date")}
             showYearDropdown={true}
             yearDropdownItemNumber={100}
             scrollableYearDropdown 
             minDate={new Date(new Date().getFullYear() - 100, 0, 1)} 
             maxDate={new Date()} 
                className={`placeholder-dark-purple text-black text-lg block w-full py-2 px-4 mb-6 border rounded-md  ${
                  formik.touched.date && formik.errors.date
                    ? "border-red-500 mb-0 duration-0 "
                    : "border-gray-300 "
                } focus:outline-none focus:ring focus:border-blue-500 duration-500 pb-1relative`}
              />
               {formik.touched.date && formik.errors.date && (
                <div className="mt-2 text-md text-red-600 mb-8">
                  {formik.errors.date}
                </div>
              )}
              <InputField
                type="password"
                name="password"
                placeholder="Password"
                showPasswordToggle={true}
              />
              <InputField
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                showPasswordToggle={true}
              />
              <p>By checking this box, I agree to terms of the service</p>
              <InputField
                className="styled-input"
                type="checkbox"
                name="checkbox"
              />
              <button
                className="flex items-center justify-center bg-blue-400 hover:bg-blue-500 duration-300 rounded-lg mx-auto px-8 py-4"
                type="submit"
              >
                Register
              </button>
             
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};
export default RegistrationPage;
