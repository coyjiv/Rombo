import React from 'react';
import { ErrorMessage, useField} from 'formik';

const InputField = ({ label, ...props }: {
    [x: string]: any;
    label: any;
}) => {
  const [field, meta] = useField(props)
  return (
    <div className="mb-8 text-lg ">
      {label ? <label htmlFor={field.name}>{label}</label> : <></>}
      <input 
        className={` text-black  w-full form-control flex items-center justify-center shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
        {...field} {...props}
        autoComplete="off"
      />
      <ErrorMessage component="div" name={field.name} className="absolute  text-red-600 text-md" />
    </div>
  )
}

export default InputField;