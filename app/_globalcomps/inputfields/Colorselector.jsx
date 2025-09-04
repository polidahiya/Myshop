"use client";
const predefinedColors = [
  // Warm & Energetic
  { theme: "#ffac1b", secondary: "#0091ff", text: "#525252" },
  { theme: "#e63946", secondary: "#457b9d", text: "#1d3557" },
  { theme: "#06d6a0", secondary: "#118ab2", text: "#073b4c" },
  { theme: "#f4a261", secondary: "#2a9d8f", text: "#264653" },

  // Modern & Minimal
  { theme: "#1abc9c", secondary: "#16a085", text: "#2c3e50" },
  { theme: "#3498db", secondary: "#2ecc71", text: "#2c3e50" },
  { theme: "#9b59b6", secondary: "#e67e22", text: "#2c3e50" },
  { theme: "#34495e", secondary: "#1abc9c", text: "#ecf0f1" },

  // Pastel & Friendly
  { theme: "#ffb6b9", secondary: "#fae3d9", text: "#6d6875" },
  { theme: "#a0e7e5", secondary: "#b4f8c8", text: "#4a4e69" },
  { theme: "#fcd5ce", secondary: "#ffc8dd", text: "#3a3a3a" },
  { theme: "#cdb4db", secondary: "#ffc8dd", text: "#4a4a4a" },

  // Dark & Elegant
  { theme: "#2d3436", secondary: "#d63031", text: "#dfe6e9" },
  { theme: "#1e272e", secondary: "#34ace0", text: "#f5f6fa" },
  { theme: "#0f2027", secondary: "#2c5364", text: "#ffffff" },
  { theme: "#2c3e50", secondary: "#8e44ad", text: "#ecf0f1" },

  // Vibrant & Playful
  { theme: "#ff6b6b", secondary: "#feca57", text: "#222f3e" },
  { theme: "#48dbfb", secondary: "#1dd1a1", text: "#2e2e2e" },
  { theme: "#f368e0", secondary: "#ff9ff3", text: "#2c2c54" },
  { theme: "#ff9f43", secondary: "#10ac84", text: "#222f3e" },
];

export default function ColorSelector({ state, setstate }) {
  const handleColorChange = (key, value) => {
    setstate((prev) => ({
      ...prev,
      color: { ...prev.color, [key]: value },
    }));
  };

  const applyPredefined = (colors) => {
    setstate((prev) => ({ ...prev, color: colors }));
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {["theme", "secondary", "text"].map((key) => (
          <div key={key} className="flex flex-col items-center">
            <label className="capitalize font-medium mb-2">{key}</label>
            <div
              className="relative w-16 h-16 cursor-pointer rounded-full shadow"
              style={{ background: state.color[key] }}
            >
              <input
                type="color"
                value={state.color[key]}
                onChange={(e) => handleColorChange(key, e.target.value)}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            <span className="mt-1 text-sm">{state.color[key]}</span>
          </div>
        ))}
      </div>

      {/* Predefined color palettes */}
      <h3 className="text-lg font-semibold mb-2">Predefined Palettes</h3>
      <div className="w-full flex gap-2 overflow-x-scroll hidescroll">
        {predefinedColors.map((palette, idx) => (
          <button
            key={idx}
            onClick={() => applyPredefined(palette)}
            className="p-2 rounded-lg border cursor-pointer"
          >
            <div className="flex space-x-1">
              <span
                className="w-6 h-6 rounded"
                style={{ background: palette.theme }}
              />
              <span
                className="w-6 h-6 rounded"
                style={{ background: palette.secondary }}
              />
              <span
                className="w-6 h-6 rounded"
                style={{ background: palette.text }}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Preview */}
      {/* <div
        className="mt-6 p-4 rounded-lg shadow text-white text-center font-semibold"
        style={{
          background: state.color.theme,
          color: state.color.text,
          border: `3px solid ${state.color.secondary}`,
        }}
      >
        Preview: {state.storename}
      </div> */}
    </div>
  );
}
