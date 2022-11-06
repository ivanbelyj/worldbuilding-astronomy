// Астрономический параметр определенного небесного тела
export class ParameterInfo {
  // Каждый параметр имеет id в пределах группы параметров, чтобы к нему можно было обращаться
  // при вычислении зависимых параметров
  private _id: string;
  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }
  private _title: string;
  public get title(): string {
    return this._title;
  }
  public set title(value: string) {
    this._title = value;
  }
  private _units: string;
  public get units(): string {
    return this._units;
  }
  public set units(value: string) {
    this._units = value;
  }
  private _referenceValue: number;
  // Референсное значение для удобства сопоставления. Как правило, это
  // значение параметра для реального небесного тела, аналогичного данному.
  // Например, для моделируемой звезды это может быть Солнце или другая известная звезда
  public get referenceValue(): number {
    return this._referenceValue;
  }
  public set referenceValue(value: number) {
    this._referenceValue = value;
  }

  constructor(
    id: string,
    title: string,
    units: string,
    referenceValue: number
  ) {
    this._id = id;
    this._title = title;
    this._units = units;
    this._referenceValue = referenceValue;
  }
}
