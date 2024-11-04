// src/coponents/Controls.js
import React from 'react';

function Controls({ timeRange, aggregation, onTimeRangeChange, onAggregationChange }) {
  return (
    <div className="flex gap-4 mb-6">
      <div>
        <label className="mr-2">Time Range:</label>
        <select
          value={timeRange}
          onChange={(e) => onTimeRangeChange(e.target.value)}
          className="border rounded p-1"
        >
          <option value="1h">Last Hour</option>
          <option value="6h">Last 6 Hours</option>
          <option value="24h">Last 24 Hours</option>
          <option value="48h">Last 48 Hours</option>
        </select>
      </div>

      <div>
        <label className="mr-2">Aggregation:</label>
        <select
          value={aggregation}
          onChange={(e) => onAggregationChange(e.target.value)}
          className="border rounded p-1"
        >
          <option value="AVG">Average</option>
          <option value="MAX">Maximum</option>
          <option value="P90">90th Percentile</option>
        </select>
      </div>
    </div>
  );
}

export default Controls;

