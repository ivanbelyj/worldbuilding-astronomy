import { useEffect, useState } from "react";
import { CalculatedDependentParamsBuilder } from "../models/CalculatedDependentParamsBuilder";
import { ParameterInfo } from "../models/ParameterInfo";
import { ParametersGroup } from "../models/ParametersGroup";
import { ParameterAndValue } from "../models/ParameterAndValue";
import { OrderedDependentParamsBuilder } from "../models/OrderedDependentParamsBuilder";
import { ParameterComponent } from "./ParameterComponent";
import { DependentParameterInfo } from "../models/DependentParameterInfo";
import { Header } from "./Header";

interface IParametersGroupComponentProps {
  parametersGroup: ParametersGroup;
}

// let orderedDependentParams: DependentParameterInfo[];

export function ParametersGroupComponent({
  parametersGroup,
}: IParametersGroupComponentProps) {
  // useEffect(() => {
  // orderedDependentParams =
  //   new OrderedDependentParamsBuilder().buildParametersOrder(parametersGroup);
  //   console.log(
  //     "Зависимые параметры упорядочены." + orderedDependentParams.join(", ")
  //   );
  // }, [parametersGroup]);

  const [independentValues, setIndependentValues] = useState<
    ParameterAndValue[]
  >(
    parametersGroup
      .getIndependentParameters()
      .map((x) => new ParameterAndValue(x, undefined))
  );
  // В массиве только заменяется элемент (не мутирующе)
  const handleChange = (changedParam: ParameterInfo, newVal?: number) => {
    console.log("Some independent parameter is changed");
    setIndependentValues((prev) => {
      return prev.map((paramAndVal) =>
        paramAndVal.param !== changedParam
          ? paramAndVal
          : new ParameterAndValue(changedParam, newVal)
      );
      // [
      //   ...prev.filter(
      //     (item: ParameterAndValue) => item.param.id !== changedParam.id
      //   ),
      //   new ParameterAndValue(changedParam, newVal),
      // ];
    });
  };

  const orderedDependentParams =
    new OrderedDependentParamsBuilder().getOrderedParameters(parametersGroup);

  console.log("Before calculation. independentValues: ");
  console.log(independentValues);
  console.log("orderedDependentParams: ");
  console.log(orderedDependentParams);

  const calculatedY: ParameterAndValue[] =
    new CalculatedDependentParamsBuilder().calc(
      independentValues,
      orderedDependentParams
    );

  return (
    <>
      {/* Independent parameters */}
      <Header title="Устанавливается пользователем" size="xl" />
      <ul>
        {independentValues.map((paramAndVal: ParameterAndValue) => {
          return (
            <li key={paramAndVal.param.id} className="">
              <ParameterComponent
                parameter={paramAndVal.param}
                realWorldTitle={parametersGroup.realWorldTitle}
                onChange={handleChange}
                value={paramAndVal.value}
              />
            </li>
          );
        })}
      </ul>
      <ul>
        <Header title="Зависимые параметры" size="xl" />
        {/* Dependent parameters */}
        {calculatedY.map((paramAndVal) => {
          return (
            <li key={paramAndVal.param.id}>
              <ParameterComponent
                parameter={paramAndVal.param}
                realWorldTitle={parametersGroup.realWorldTitle}
                value={paramAndVal.value}
                readOnly
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}
