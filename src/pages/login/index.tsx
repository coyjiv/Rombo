import React from "react";
import Image from 'next/image'
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputField from "@/components/InputField";
import Link from 'next/link';
import { FormSubmitButton, GoogleSignInButton, SignInButton, SignOutButton } from '@/components/buttons';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
type Props = {};
import { AiFillMail } from "react-icons/ai";


const LoginPage = (props: Props) => {
  const session = useSession()
  const router = useRouter()
  console.log(session);
  useEffect(() => {
    if (session.status === 'authenticated') {
      router.push('/')
    }
  }, [ router, session.status ])
  const validate = Yup.object({

    username: Yup.string().email("Email is invalid!").required("Email Required!"),
    password: Yup.string()
      .required("Password Required!"),
  });
  const initialValues = {
    username: "",
    password: "",

  };
  return (
    <div className="gradient-purple font-custom h-screen w-screen pt-40 px-5 md:px-0 md:pt-24">
        <h1 className="text-5xl text-white flex justify-center items-center">
          ROMBO
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validate}
          onSubmit={(values) => {
            signIn("credentials", { ...values });
          }}
        >
          {(formik) => (
            <div className="flex mt-10 justify-center items-center text-white">
              <Form className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/3 rounded-xl shadow-2xl px-4 sm:px-8 py-6 mb-8 bg-gradient-to-br from-purple-700 to-indigo-900">
                <h1 className="text-3xl pb-4 text-center">Log in</h1>
                <div className="flex text-lg font-extralight items-center justify-center gap-4">
                  <h1 className=" pb-4 flex justify-center">
                    Still don&apos;t have an account?
                  </h1>
                  <Link className="mb-4 underline" href="/register">
                    Sign up
                  </Link>
                </div>

                <InputField
                  type="email"
                  name="username"
                  placeholder="Your email"
                  icon={<AiFillMail />}
                />
                <InputField
                  type="password"
                  name="password"
                  placeholder="Password"
                  showPasswordToggle={true}
                />
                <div className="flex justify-center text-center">
                  <p>or</p>
                </div>
                <div className="flex my-5 justify-center items-center">
                  <GoogleSignInButton />
                </div>
                <FormSubmitButton>Login</FormSubmitButton>
              </Form>
            </div>
          )}
        </Formik>

    </div>
  )
}
export default LoginPage;

