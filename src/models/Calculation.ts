import { ParameterValue } from "./ParameterValue";
import { ParamsDependencyLevels } from "./ParamsDependencyLevels";

// На основе заданных независимых значений (x) и информации обо всех параметрах небесного тела
// вычисляет результирующий массив всех значений параметров небесного тела (как y, так и x)
export class Calculation {
  // Для вычисления значений параметров требуется разбиение их по уровням зависимости,
  // т.к. вычисления проходят по мере определения
  private _dependencyLevels: ParamsDependencyLevels;

  // В процессе обхода уровней каждому параметру (его id) сопоставляется значение
  private _idAndValue: Map<string, number>;

  constructor(dependencyLevels: ParamsDependencyLevels) {
    this._dependencyLevels = dependencyLevels;
    this._idAndValue = new Map<string, number>();
  }

  // Возвращает вычисленные (а также данные ранее) значения для всех параметров.
  // Перед множеством вызовов calc один раз должен быть вызван prepareToCalc
  public calc(independentValues: ParameterValue[]): ParameterValue[] {
    if (!this._dependencyLevels.isBuilt) this._dependencyLevels.buildLevels();

    // Независимые параметры находятся на нулевом уровне зависимости.
    // Их не требуется динамически вычислять, поэтому значения устанавливаются непосредственно
    for (const param of independentValues) {
      this._idAndValue.set(param.id, param.value);
    }
    for (const level of this._dependencyLevels.levels) {
      for (const param of level) {
        this._idAndValue.set(param.id, param.calc(this.getValueById));
      }
    }
    return Array.from(this._idAndValue.entries()).map(([id, value]) => {
      return new ParameterValue(id, value);
    });
  }

  private getValueById(id: string): number {
    const res = this._idAndValue.get(id);
    if (!res)
      throw new Error(
        "Dependent value cannot be calculated. Check correctness of parameter's dependencies"
      );
    return res;
  }
}
