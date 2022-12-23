import { ParameterInfo } from "../models/ParameterInfo";
import { TextInput } from "./TextInput";

interface IParameterComponentProps {
  // title: string;
  // units: string;
  // realWorldValue: number;
  parameter: ParameterInfo;
  realWorldTitle: string;
  value?: number;
  onChange?: (param: ParameterInfo, newValue?: number) => void;
  readOnly?: boolean;
}

export function ParameterComponent({
  // title,
  // units,
  // realWorldValue,
  parameter,
  realWorldTitle,
  value,
  onChange,
  readOnly,
}: IParameterComponentProps) {
  const handleChange = (newValue?: number) => {
    if (onChange) onChange(parameter, newValue);
  };

  // const relativeToRealWorld = (value: number) => {
  //   return (value / parameter.referenceValue).toPrecision(4);
  // };

  const shouldBeEmptyString = (value?: number) => {
    if (!value && value !== 0) return true;
  };

  return (
    <div className="mb-1">
      {/* <div className="inline-block mr-1">
        <TextInput
          title={parameter.title}
          units={parameter.units}
          // onChange={handleChange}
          value={shouldBeEmptyString(value) ? "" : value}
          readOnly={readOnly}
        />
      </div> */}

      <div className="inline-block">
        <TextInput
          title={parameter.title}
          units={parameter.units}
          onChange={handleChange}
          value={shouldBeEmptyString(value) || !value ? "" : value}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
}
