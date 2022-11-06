import { DependentParameterInfo } from "./DependentParameterInfo";
import { ParameterInfo } from "./ParameterInfo";
import { ParametersGroup } from "./ParametersGroup";

// Объект этого класса структурирует по уровням зависимые параметры группы параметров для
// вычисления значений
export class ParamsDependencyLevels {
  // Информация о параметрах небесного тела
  private _pGroup: ParametersGroup;

  // Перед непосредственным вычислением параметры разделяются по уровням.
  // Параметры каждого следующего уровня зависят от предыдущих уровней.
  private _levels: DependentParameterInfo[][];
  public get levels(): DependentParameterInfo[][] {
    return this._levels;
  }

  private _isBuilt: boolean;
  public get isBuilt(): boolean {
    return this._isBuilt;
  }

  constructor(pGroup: ParametersGroup) {
    this._pGroup = pGroup;

    this._levels = [];
    this._isBuilt = false;
  }

  public buildLevels() {
    if (!this._isBuilt) this._isBuilt = true;
    const dependent: DependentParameterInfo[] =
      this._pGroup.getDependentParameters();
  }
}
