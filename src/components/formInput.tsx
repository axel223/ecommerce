import { FC, useState } from "react";

interface FormInputProps {
  label: string;
  placeholder: string;
  name: string;
  id: string;
  className: string;
  protectedField: boolean;
  required?: boolean;
}

export const FormInput: FC<FormInputProps> = ({
  label,
  placeholder,
  name,
  id,
  className,
  protectedField,
  required = true,
}) => {
  const [showProtectedField, setShowProtectedField] = useState(!protectedField);

  return (
    <div className="mt-[32px] flex">
      <div className="w-full">
        <label htmlFor={id} className="mt-9 text-black">
          {label}
        </label>
        <input
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
