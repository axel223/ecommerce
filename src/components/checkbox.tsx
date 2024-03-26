import { type ChangeEventHandler, type FC } from "react";
interface CheckboxInputProps {
  label: string;
  isSelected: boolean;
  onCheckboxChange: ChangeEventHandler;
  id?: string;
}

export const Checkbox: FC<CheckboxInputProps> = ({
  label,
  isSelected,
  onCheckboxChange,
  id,
}) => {
  return (
    <div className="mb-6 flex items-center">
      <input
        type="checkbox"
        name={label}
        id={id}
        checked={isSelected}
        onChange={onCheckboxChange}
        className="mr-3 h-6 w-6 rounded border-transparent bg-[#CCCCCC] text-black focus:ring-transparent"
      />
      <label className="text-left text-base text-black">{label}</label>
    </div>
  );
};
