export class ParameterValue {
  private _value: number;
  public get value(): number {
    return this._value;
  }
  private _id: string;
  public get id(): string {
    return this._id;
  }
  constructor(id: string, value: number) {
    this._id = id;
    this._value = value;
  }
}
