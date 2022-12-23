import { ParameterInfo } from "./ParameterInfo";

export class ParameterAndValue {
  private _value?: number;
  public get value(): number | undefined {
    return this._value;
  }
  private _param: ParameterInfo;
  public get param(): ParameterInfo {
    return this._param;
  }
  constructor(param: ParameterInfo, value?: number) {
    this._param = param;
    this._value = value;
  }
}
