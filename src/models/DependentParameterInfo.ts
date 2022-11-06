import { ParameterInfo } from "./ParameterInfo";

// Информация о параметре, который вычисляется на основе других значений
export class DependentParameterInfo extends ParameterInfo {
  // Функция, с помощью которой можно вычислить значение зависимого параметра (как правило,
  // по формуле)
  private _calc: (val: (id: string) => number) => number;
  public get calc(): (val: (id: string) => number) => number {
    return this._calc;
  }

  // id параметров, значения которых требуется получить в формуле.
  // Используется для обеспечения правильного порядка вычислений.
  // Массив должен быть согласован с функцией вычисления параметра (calc)
  private _dependencies: string[];

  constructor(
    id: string,
    title: string,
    units: string,
    referenceValue: number,
    calc: (val: (id: string) => number) => number,
    dependencies: string[]
  ) {
    super(id, title, units, referenceValue);
    this._calc = calc;
    this._dependencies = dependencies;
  }
}
