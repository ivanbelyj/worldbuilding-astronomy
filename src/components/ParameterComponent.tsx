import { TextInput } from "./TextInput";

interface IParameterComponentProps {
  title: string;
  units: string;
  realWorldTitle: string;
  realWorldValue: number;
  value?: number;
  onChange?: (newValue?: number) => void;
}

export function ParameterComponent({
  title,
  units,
  realWorldTitle,
  realWorldValue,
  value,
  onChange,
}: IParameterComponentProps) {
  // const [value, setValue] = useState<number>();
  const handleChange = (newValue?: number) => {
    if (onChange) onChange(newValue);
    // setValue(newValue);
  };

  const relativeToRealWorld = (value: number) => {
    return (value / realWorldValue).toPrecision(4);
  };

  const shouldBeEmptyString = (value?: number) => {
    if (!value && value !== 0) return true;
  };

  return (
    <div>
      <TextInput
        title={title}
        units={units}
        onChange={handleChange}
        value={shouldBeEmptyString(value) ? "" : value}
      />
      <TextInput
        title={realWorldTitle}
        units="раз"
        value={
          shouldBeEmptyString(value) || !value ? "" : relativeToRealWorld(value)
        }
      />
    </div>
  );
}
