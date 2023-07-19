export const hexToRGB = (hex: string): number[] | null => {
  const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!match) return null;

  return [
    parseInt(match[1], 16),
    parseInt(match[2], 16),
    parseInt(match[3], 16),
  ];
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  return (
    `00${r.toString(16)}`.slice(-2) +
    `00${g.toString(16)}`.slice(-2) +
    `00${b.toString(16)}`.slice(-2)
  );
};
