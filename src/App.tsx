import React from "react";
import GradientBackground from "./Components/Background/GradientBackground";
import GradientBackground_v2 from "./Components/Background/GradientBackground_v2";
import ParticleContainer from "./Components/Particle/ParticleContainer";

const App: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
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
    <ParticleContainer />
  </div>
  );
};

export default App;
