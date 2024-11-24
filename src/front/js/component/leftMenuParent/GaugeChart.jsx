import React from "react";
import GaugeComponent from "react-gauge-component";

const GaugeChart = ({ value = 50, min = 0, max = 100 }) => {
  let subArcs =
    max == 20
      ? [
          { limit: 3 },
          { limit: 6 },
          { limit: 9 },
          { limit: 12 },
          { limit: 15 },
          { limit: 18 },
          {},
        ]
      : [{}, {}, {}, {}, {}, {}, {}];

  return (
    <GaugeComponent
      type="semicircle"
      arc={{
        colorArray: ["#FF2121", "#00FF15"],
        padding: 0.02,
        subArcs: subArcs,
      }}
      labels={{
        valueLabel: { formatTextValue: value => `${value}/${max}` },
        tickLabels: {
          type: "outer",
          defaultTickValueConfig: {
            formatTextValue: value => value,
            style: { fontSize: 10 },
          },
        },
      }}
      pointer={{ type: "blob", animationDelay: 0 }}
      value={value}
      maxValue={max}
      minValue={min}
    />
  );
};

export default GaugeChart;
