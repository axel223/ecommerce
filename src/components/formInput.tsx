import React, { useState } from "react";
import {
  type FieldValues,
  type Path,
  type UseFormRegister,
} from "react-hook-form";

export type FormInputProps<TFormValues extends FieldValues> = {
  id: string;
  label: string;
  className: string;
  placeholder: string;
  protectedField: boolean;
  name: Path<TFormValues>;
  register: UseFormRegister<TFormValues>;
  required?: boolean;
};

export const FormInput = <TFormValues extends Record<string, unknown>>({
  id,
  label,
  className,
  placeholder,
  protectedField,
  name,
  register,
  required,
  ...props
}: FormInputProps<TFormValues>): React.JSX.Element => {
  const [showProtectedField, setShowProtectedField] = useState(!protectedField);

  return (
    <div className="mt-[32px] flex">
      <div className="w-full">
        <label htmlFor={id} className="mt-9 text-black">
          {label}
        </label>
        <input
          {...register?.(name)}
          {...props}
          type={showProtectedField ? "text" : "password"}
          placeholder={placeholder}
          name={name}
          id={id}
          className={className}
          required={required}
        />
      </div>
      {protectedField && (
        <span
          className="z-10 ml-[-50px] mt-[42px] cursor-pointer text-black underline underline-offset-2"
          onClick={() => setShowProtectedField(!showProtectedField)}
        >
          Show
        </span>
      )}
    </div>
  );
};
