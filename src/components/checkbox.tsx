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
      <div className="flex items-center mb-6">
        <input
            type="checkbox"
            name={label}
            id={id}
            checked={isSelected}
            onChange={onCheckboxChange}
            className="w-6 h-6 mr-3 text-black bg-[#CCCCCC] rounded border-transparent focus:ring-transparent"
        />
        <label
            className="text-base text-left text-black"
        >
          {label}
        </label>
      </div>
  );
};
