import { type FC } from "react";

interface FormHeaderProps {
  heading: string;
  subHeading?: string;
  description?: string;
}

export const FormHeader: FC<FormHeaderProps> = ({
  heading,
  subHeading,
  description,
}) => {
  return (
    <div className="flex flex-col">
      <h2 className="w-auto self-center text-3xl font-semibold text-black">
        {heading}
      </h2>
      {subHeading && (
        <p className="mt-9 self-center text-2xl font-medium text-black">
          {subHeading}
        </p>
      )}
      {description && (
        <p className="mt-[13px] self-center text-black">{description}</p>
      )}
    </div>
  );
};
