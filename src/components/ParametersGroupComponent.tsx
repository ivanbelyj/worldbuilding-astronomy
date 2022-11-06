import { useState } from "react";
import { ParametersGroup } from "../models/ParametersGroup";
import { ParameterComponent } from "./ParameterComponent";

interface IParametersGroupComponentProps {
  parametersGroup: ParametersGroup;
}

export function ParametersGroupComponent({
  parametersGroup,
}: IParametersGroupComponentProps) {
  const handleChange = (newVal?: number) => {
    console.log("Some independent parameter is changed");
  };
  return (
    <>
      {/* Independent parameters */}
      <ul>
        {parametersGroup.getIndependentParameters().map((param) => {
          return (
            <ParameterComponent
              title={param.title}
              units={param.units}
              realWorldTitle={parametersGroup.realWorldTitle}
              realWorldValue={param.referenceValue}
              onChange={handleChange}
              value={undefined}
            />
          );
        })}
      </ul>

      {/* Dependent parameters */}
      {parametersGroup.getIndependentParameters().map((param) => {
        return (
          <ParameterComponent
            title={param.title}
            units={param.units}
            realWorldTitle={parametersGroup.realWorldTitle}
            realWorldValue={param.referenceValue}
            value={undefined}
          />
        );
      })}
    </>
  );
}
