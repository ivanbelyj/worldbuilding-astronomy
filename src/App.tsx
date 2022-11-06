import React from "react";
import { Header } from "./components/Header";
import { ParametersGroupComponent } from "./components/ParametersGroupComponent";
import { getStarParametersGroup } from "./data/StarParametersGroup";
import { ParametersGroup } from "./models/ParametersGroup";

function App() {
  const starParamsGroup: ParametersGroup = getStarParametersGroup();
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-paleDark">
      <Header title="Звезда" />
      <ParametersGroupComponent parametersGroup={starParamsGroup} />

      <Header title="Планета" />
    </div>
  );
}

export default App;
