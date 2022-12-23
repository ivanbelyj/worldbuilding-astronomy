import { DependentParameterInfo } from "./DependentParameterInfo";
import { ParameterInfo } from "./ParameterInfo";
import { ParametersGroup } from "./ParametersGroup";

// Объект этого класса упорядочивает зависимые элементы группы параметров в порядок обхода для
// вычисления значений
export class OrderedDependentParamsBuilder {
  // Возвращает элементы в порядке определенности (от определяемых непосредственно независимыми
  // значениями к определяемым на основе всех остальных)
  public getOrderedParameters(
    pGroup: ParametersGroup
  ): DependentParameterInfo[] {
    const dependent: DependentParameterInfo[] = pGroup.getDependentParameters();

    const orderedParamIds: string[] = [];
    for (const depParam of dependent) {
      let maxDependencyIndex = 0;
      // Параметр вычисляется после самого последнего параметра, который его определяет.
      // Например, светимость определяется после определения массы звезды.

      // Нахождение порога зависимости параметра. Для каждой зависимости определяется очередь
      // определения, из них выбирается максимальная
      for (const depId of depParam.dependencies) {
        const dependencyIndex = orderedParamIds.indexOf(depId);
        if (dependencyIndex > maxDependencyIndex) {
          maxDependencyIndex = dependencyIndex;
        }
      }

      orderedParamIds.splice(maxDependencyIndex + 1, 0, depParam.id);
    }

    return orderedParamIds.map((paramId) => {
      return pGroup.getParamInfoById(paramId) as DependentParameterInfo;
    });
  }
}
