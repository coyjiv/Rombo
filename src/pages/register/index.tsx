import * as React from "react";
import Image from "next/image";
import { Formik, Form, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import InputField from "@/components/InputField";
import Link from "next/link";
type Props = {};
import { FaUser } from "react-icons/fa";
import { AiFillMail } from "react-icons/ai";
import { AiFillDatabase } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";
import { FormSubmitButton } from "@/components/buttons";
import { DefaultContainer } from "@/components/layout/containers";
import Checkbox from "@/components/Checkbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    checkbox: false,
  };
  const router = useRouter();

  // TODO: Add a stepper
  // Todo: fix toastify - 18.09.23 Max
  const notify = () => toast("You've been successfully registered");

  return (
    <div className="min-h-screen w-full font-custom gradient-purple">
       <ToastContainer theme="light"  />
      <DefaultContainer className="pt-20 pb-14">
        <h1 className="text-5xl text-white flex justify-center items-center">
          ROMBO
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validate}
          onSubmit={(values, actions) => {
            fetch("/api/auth/signup", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                fullName: values.firstName + " " + values.lastName,
                email: values.email,
                dateOfBirth: values.date,
                password: values.password,
              }),
            })
              .then((res) => console.log(res))
              .catch((err) => console.log(err));
            actions.resetForm();
            router.push("/api/auth/signin");
            notify();
          }}
        >
          {(formik) => (
            <div className="flex mt-10 justify-center items-center text-white">
              <Form className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/3 rounded-xl shadow-2xl px-4 sm:px-8 py-6 mb-8 bg-gradient-to-br from-purple-700 to-indigo-900 ">
                <h1 className="text-3xl pb-4 flex justify-center">Sign up</h1>
                <div className="flex justify-center font-extralight items-center gap-4">
                  <h1 className="text-lg pb-4 flex  justify-center">
                    Already have an account?
                  </h1>
                  <Link className="mb-4 text-lg border-b-2" href="/login">
                    Sign in
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
                <div className="relative">
                  <DatePicker
                    onKeyDown={(e) => e.preventDefault()}
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
                    } focus:outline-none focus:ring focus:border-blue-500 duration-500 pb-1 relative`}
                  />
                  {formik.touched.date && formik.errors.date && (
                    <div className="text-xs absolute -bottom-0 text-red-600">
                      {formik.errors.date}
                    </div>
                  )}
                </div>
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
                <div className="flex justify-between gap-1 mt-12 mb-5">
                  <p className="text-sm">
                    By checking this box, I agree to terms of the service
                  </p>
                  <Checkbox
                    onChange={() =>
                      formik.setFieldValue("checkbox", !formik.values.checkbox)
                    }
                    checked={formik.values.checkbox}
                    label=""
                  />
                </div>
                <FormSubmitButton>Register</FormSubmitButton>
              </Form>
            </div>
          )}
        </Formik>
      </DefaultContainer>
    </div>
  );
};
export default RegistrationPage;
