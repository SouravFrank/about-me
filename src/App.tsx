import React from "react";
import GradientBackground from "./Components/Background/GradientBackground";
import GradientBackground_v2 from "./Components/Background/GradientBackground_v2";

const App: React.FC = () => {
  return (
    <div>
      <GradientBackground
        numberOfShades={10}
        startColor="#1f141c"
        endColor="#bf3b6d"
      />
      <GradientBackground_v2
        numberOfShades={10}
        startColor="#1f141c"
        endColor="#bf3b6d"
      />
      {/* Your other components and content go here */}
    </div>
  );
};

export default App;
