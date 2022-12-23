import { ParameterAndValue } from "./ParameterAndValue";
import { DependentParameterInfo } from "./DependentParameterInfo";

// На основе заданных независимых значений (x) и упорядоченного массива информации о зависимых
// параметрах вычисляет результирующий массив зависимых значений параметров небесного тела.
// Упорядочение по степени зависимости должно быть осуществлено до передачи в метод вычисления,
// т.к. производить его при каждом вызове метода неэффективно.
// Некоторые независимые значения могут быть неопределены (например, пользователь не ввел).
// В таком случае значения, зависящие от них, тоже будут неопределены (однако все равно будут присутствовать в
// результирующем массиве)
export class CalculatedDependentParamsBuilder {
  // В процессе вычисления зависимых параметров функции обращаются к другим параметрам по id
  private _idAndValue: Map<string, number | undefined>;

  constructor() {
    this._idAndValue = new Map<string, number | undefined>();
  }

  public calc(
    independentValues: ParameterAndValue[],
    orderedDependentParams: DependentParameterInfo[]
  ): ParameterAndValue[] {
    for (const x of independentValues) {
      this._idAndValue.set(x.param.id, x.value);
    }

    console.log("Определение зависимых параметров");
    for (const y of orderedDependentParams) {
      // Если по всем id зависимостей можно получить значение
      const isDefined: boolean = y.dependencies.every((id) =>
        this._idAndValue.get(id)
      );
      console.log(`Параметр ${y.id} ${isDefined ? "" : "не"} определен.`);

      // Вычисление
      this._idAndValue.set(
        y.id,
        // Для пользователя все зависимости должны быть определены (т.к. физические формулы работают с
        // определенными числами), иначе - значение не определено
        isDefined
          ? y.calc((id: string) => {
              const val = this._idAndValue.get(id);
              if (!val)
                throw new Error(
                  "Value is not defined on the stage of calculation"
                );
              return val;
            })
          : undefined
      );
    }

    return orderedDependentParams.map(
      (param) => new ParameterAndValue(param, this._idAndValue.get(param.id))
    );
  }
}
