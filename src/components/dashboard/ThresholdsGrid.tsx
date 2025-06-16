import { useEffect, useState } from "react";
import { useDashboard } from "../../contexts/DashboardContext";
import ThresholdCard from "./ThresholdCard";

import { ThresholdConfig } from "../../helpers/thresholdToArray";

const ThresholdsGrid = () => {
  const { thresholds, pendingThresholds } = useDashboard();
  
  const displayThresholds = pendingThresholds || thresholds;

  if (!displayThresholds) return <div>Loading thresholds...</div>;

  return (
    <div className='threshold-cards-grid'>
      {displayThresholds.map((threshold: ThresholdConfig) => (
        <ThresholdCard
          key={`${threshold.type}_${threshold.unit}_${threshold.minField}_${threshold.maxField}`}
          threshold={threshold}
        />
      ))}
    </div>
  );
};

export default ThresholdsGrid;