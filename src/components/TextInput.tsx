import { ChangeEvent } from "react";

interface ITextInputProps {
  title: string;
  units: string;
  value?: number | string;
  onChange?: (newValue?: number) => void;
  readOnly?: boolean;
}

export function TextInput({
  title,
  units,
  value,
  onChange,
  readOnly,
}: ITextInputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newNum: number = parseFloat(event.target.value);
    // if (!isFinite(newNum)) return;

    if (onChange) {
      onChange(isFinite(newNum) ? newNum : undefined);
    }
  };

  return (
    <div className="relative inline-block">
      <span className="absolute top-1 left-4 ">
        {title}, {units}
      </span>
      <input
        type="number"
        className="w-64 rounded-tl rounded-tr pt-6 px-4 pb-2 outline-none transition-colors hover:bg-inputHover focus:bg-inputFocus disabled:bg-[white] disabled:hover:bg-inputHover border-b-border border-b-4"
        value={value}
        onChange={handleChange}
        /*disabled={disabled}*/
        readOnly={readOnly}
      />
    </div>
  );
}
