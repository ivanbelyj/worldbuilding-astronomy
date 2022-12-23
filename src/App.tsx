import React from "react";
import { Header } from "./components/Header";
import { ParametersGroupComponent } from "./components/ParametersGroupComponent";
import { getStarParametersGroup } from "./data/StarParametersGroup";
import { ParametersGroup } from "./models/ParametersGroup";

function App() {
  const starParamsGroup: ParametersGroup = getStarParametersGroup();
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-paleDark">
      <div className="px-16 py-4">
        <Header title="Звезда" />
        <div className="mb-8">
          <ParametersGroupComponent parametersGroup={starParamsGroup} />
        </div>
        <Header title="Планета" />
        <div className="">
          <ParametersGroupComponent parametersGroup={starParamsGroup} />
        </div>
      </div>
    </div>
  );
}

export default App;
