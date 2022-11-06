import { ChangeEvent } from "react";

interface ITextInputProps {
  title: string;
  units: string;
  value?: number | string;
  onChange?: (newValue?: number) => void;
}

export function TextInput({ title, units, value, onChange }: ITextInputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newNum: number = parseFloat(event.target.value);
    // if (!isFinite(newNum)) return;

    if (onChange) {
      onChange(isFinite(newNum) ? newNum : undefined);
    }
  };
  return (
    <div className="relative inline-block">
      <span className="absolute top-1 left-4">
        {title}, {units}
      </span>
      <input
        type="number"
        className="rounded-tl rounded-tr pt-6 px-4 pb-2 outline-none hover:bg-inputHover focus:bg-inputFocus transition-colors"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
