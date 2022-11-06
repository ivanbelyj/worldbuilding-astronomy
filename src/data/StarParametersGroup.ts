import { DependentParameterInfo } from "../models/DependentParameterInfo";
import { ParameterInfo } from "../models/ParameterInfo";
import { ParametersGroup } from "../models/ParametersGroup";

export function getStarParametersGroup() {
  const params: ParameterInfo[] = [
    new ParameterInfo("m", "Масса", "кг", getSunMass()),
    new DependentParameterInfo(
      "L",
      "Светимость",
      "Вт",
      3.83 * 1026,
      calcLuminocity,
      ["m"]
    ),
  ];
  const pGroup: ParametersGroup = new ParametersGroup("От Солнца", params);
  return pGroup;
}

function getSunMass() {
  return 1.9891 * Math.pow(10, 30);
}

function calcLuminocity(val: (id: string) => number) {
  return Math.pow(val("m"), 2.3);
}
