import React, { useState } from "react";
import "./GradientBackground.css";
import { hexToRGB, rgbToHex } from "./helpers";

interface GradientBackgroundProps {
  numberOfShades: number;
  startColor: string;
  endColor: string;
}

enum GradientStyle {
  Linear = "linear",
  Radial = "radial",
  Conic = "conic",
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({
  numberOfShades,
  startColor,
  endColor,
}) => {
  const [gradientStyle, setGradientStyle] = useState<GradientStyle>(
    GradientStyle.Linear
  );

  // Function to generate small dark shade variations of the colors
  const generateShades = (
    startColor: string,
    endColor: string,
    numberOfShades: number
  ): string[] => {
    const shades: string[] = [];
    const startRGB = hexToRGB(startColor);
    const endRGB = hexToRGB(endColor);

    if (!startRGB || !endRGB || numberOfShades <= 1) {
      // Handle the null case or the case when numberOfShades is <= 1
      // You can use default colors or return an array with the startColor only
      return [startColor];
    }

    const stepRGB = [
      (endRGB[0] - startRGB[0]) / (numberOfShades - 1),
      (endRGB[1] - startRGB[1]) / (numberOfShades - 1),
      (endRGB[2] - startRGB[2]) / (numberOfShades - 1),
    ];

    for (let i = 0; i < numberOfShades; i++) {
      const shade = `#${rgbToHex(
        Math.round(startRGB[0] + stepRGB[0] * i),
        Math.round(startRGB[1] + stepRGB[1] * i),
        Math.round(startRGB[2] + stepRGB[2] * i)
      )}`;
      shades.push(shade);
    }

    return shades;
  };

  // Generate small dark shade variations for both colors
  const color1Shades = generateShades(startColor, endColor, numberOfShades);
  const color2Shades = generateShades(endColor, startColor, numberOfShades);

  const gradientColors = generateShades(startColor, endColor, numberOfShades);
  const gradientColorStops = gradientColors.map((shade, index) => {
    const position = (index / (numberOfShades - 1)) * 100;
    return `${shade} ${position}%`;
  });

  const renderGradient = () => {
    switch (gradientStyle) {
      case GradientStyle.Radial:
        return `radial-gradient(circle, ${gradientColorStops.join(", ")})`;
      case GradientStyle.Conic:
        return `conic-gradient(from 0deg, ${gradientColorStops.join(", ")})`;
      default:
        return `linear-gradient(45deg, ${gradientColorStops.join(", ")})`;
    }
  };

  const gradient = renderGradient();

  const handleGradientStyleChange = (style: GradientStyle) => {
    setGradientStyle(style);
  };
  return (
    <div className="gradient-background" style={{ background: gradient }}>
      <div className="controls">
        <button onClick={() => handleGradientStyleChange(GradientStyle.Linear)}>
          Linear Gradient
        </button>
        <button onClick={() => handleGradientStyleChange(GradientStyle.Radial)}>
          Radial Gradient
        </button>
        <button onClick={() => handleGradientStyleChange(GradientStyle.Conic)}>
          Conic Gradient
        </button>
      </div>
      {/* Your content goes here */}
    </div>
  );
};

export default GradientBackground;
