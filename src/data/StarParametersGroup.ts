import { StarAstronomy } from "../Astronomy";
import { DependentParameterInfo } from "../models/DependentParameterInfo";
import { ParameterInfo } from "../models/ParameterInfo";
import { ParametersGroup } from "../models/ParametersGroup";

export function getStarParametersGroup() {
  const params: ParameterInfo[] = [
    new ParameterInfo("m", "Масса", "кг", StarAstronomy.sunMass()),
    new DependentParameterInfo(
      "D",
      "Диаметр (грубо)",
      "М",
      StarAstronomy.sunDiameter(),
      (val) => {
        return StarAstronomy.diameter(val("m"));
      },
      ["m"]
    ),
    new DependentParameterInfo(
      "L",
      "Светимость",
      "Вт",
      StarAstronomy.sunLuminocity(),
      (val) => {
        return StarAstronomy.luminocity(val("m"));
      },
      ["m"]
    ),
    new DependentParameterInfo(
      "t",
      "Время жизни",
      "лет",
      StarAstronomy.sunLifeTime(),
      (val) => {
        return StarAstronomy.lifeTime(val("m"), val("L"));
      },
      ["m", "L"]
    ),
    new DependentParameterInfo(
      "t1",
      "Время жизни (грубо)",
      "лет",
      StarAstronomy.sunLifeTime(),
      (val) => StarAstronomy.lifeTime1(val("m")),
      ["m"]
    ),
  ];
  const pGroup: ParametersGroup = new ParametersGroup("От Солнца", params);
  return pGroup;
}
