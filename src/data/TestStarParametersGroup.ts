import { DependentParameterInfo } from "../models/DependentParameterInfo";
import { ParameterInfo } from "../models/ParameterInfo";
import { ParametersGroup } from "../models/ParametersGroup";

export function getStarParametersGroup() {
  const params: ParameterInfo[] = [
    new ParameterInfo("m", "Масса", "кг", getSunMass()),
    new ParameterInfo("r", "Радиус", "м", 696000000),
    new DependentParameterInfo(
      "L",
      "Светимость",
      "Вт",
      3.83 * 1026,
      calcLuminocity,
      ["m"]
    ),
    new DependentParameterInfo(
      "2L",
      "Светимость x 2",
      "Вт",
      3.83 * 1026 * 2,
      calcDoubleLuminocity,
      ["L"]
    ),
    new DependentParameterInfo(
      "4L",
      "Светимость x 4",
      "Вт",
      3.83 * 1026 * 4,
      (val) => val("2L") + val("r"),
      ["2L", "r"]
    ),
  ];
  const pGroup: ParametersGroup = new ParametersGroup("От Солнца", params);
  return pGroup;
}

function getSunMass() {
  return 1.9891 * Math.pow(10, 30);
}

function calcDoubleLuminocity(val: (id: string) => number) {
  return val("L") * 2;
}

function calcFourthLuminocity(val: (id: string) => number) {
  return val("2L") * 2;
}

function calcLuminocity(val: (id: string) => number) {
  return Math.pow(val("m"), 2.3);
}
