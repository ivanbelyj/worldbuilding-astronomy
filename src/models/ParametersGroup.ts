import { DependentParameterInfo } from "./DependentParameterInfo";
import { ParameterInfo } from "./ParameterInfo";

// Группа связанных параметров определенного небесного тела
export class ParametersGroup {
  private _realWorldTitle: string;
  public get realWorldTitle(): string {
    return this._realWorldTitle;
  }

  private _parameters: ParameterInfo[];

  private _paramIdAndInfo: Map<string, ParameterInfo>;

  public getParamInfoById(id: string): ParameterInfo | undefined {
    return this._paramIdAndInfo.get(id);
  }

  constructor(realWorldTitle: string, parameters: ParameterInfo[]) {
    this._realWorldTitle = realWorldTitle;

    this._parameters = parameters;

    this._paramIdAndInfo = new Map<string, ParameterInfo>();
    for (const paramInfo of parameters) {
      this._paramIdAndInfo.set(paramInfo.id, paramInfo);
    }
  }

  public getDependentParameters(): DependentParameterInfo[] {
    return this._parameters.filter(
      (param) => param instanceof DependentParameterInfo
    ) as DependentParameterInfo[];
  }

  public getIndependentParameters(): ParameterInfo[] {
    return this._parameters.filter(
      (param) => !(param instanceof DependentParameterInfo)
    );
  }
}
