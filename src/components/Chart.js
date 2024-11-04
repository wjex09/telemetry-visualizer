// src/coponents/Chart.js
import React, { useEffect, useRef } from 'react';
import UPlot from 'uplot';
import 'uplot/dist/uPlot.min.css';

// Helper function to format value with safety checks
function formatValue(value) {
  // Convert to number and handle invalid values
  const num = Number(value);
  if (isNaN(num)) return '0';

  if (num > 1e9) return `${(num / 1e9).toFixed(2)}B`;
  if (num > 1e6) return `${(num / 1e6).toFixed(2)}M`;
  if (num > 1e3) return `${(num / 1e3).toFixed(2)}K`;
  return num.toFixed(2);
}

function Chart({ data }) {
  const chartRef = useRef();
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Convert values to numbers and filter out invalid values
    const cleanData = data.filter(d => !isNaN(Number(d.value)));

    const timestamps = cleanData.map(d => new Date(d.timestamp).getTime() / 1000);
    const values = cleanData.map(d => Number(d.value));

    const options = {
      width: chartRef.current.clientWidth,
      height: 400,
      title: "CPU Usage",
      series: [
        {
          label: "Time",
          value: (u, v) => new Date(v * 1000).toLocaleString(),
        },
        {
          label: "Value",
          stroke: "#2563eb",
          width: 2,
          points: {
            show: true,
            size: 4,
          },
          value: (u, v) => formatValue(v),
        }
      ],
      axes: [
        {
          label: "Time",
          grid: {
            show: false,
          },
        },
        {
          label: "Value",
          grid: {
            show: true,
            stroke: "#e5e7eb",
          },
          values: (u, vals) => vals.map(v => formatValue(v)),
          size: 80,
        }
      ],
      scales: {
        x: {
          time: true,
        },
        y: {
          auto: true,
        }
      },
      padding: [20, 40, 20, 60],
    };

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new UPlot(options, [timestamps, values], chartRef.current);

    // Handle window resize
    const handleResize = () => {
      chartInstanceRef.current?.setSize({
        width: chartRef.current.clientWidth,
        height: 400
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  // Calculate stats with safe number conversion
  const stats = data.length > 0 ? {
    min: formatValue(Math.min(...data.map(d => Number(d.value)))),
    max: formatValue(Math.max(...data.map(d => Number(d.value)))),
    avg: formatValue(data.reduce((a, b) => a + Number(b.value), 0) / data.length)
  } : null;

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      {stats && (
        <div className="flex flex-wrap gap-4 mb-4 text-sm">
          <div className="px-3 py-1 bg-blue-50 rounded-full font-mono">
            Min: {stats.min}
          </div>
          <div className="px-3 py-1 bg-blue-50 rounded-full font-mono">
            Max: {stats.max}
          </div>
          <div className="px-3 py-1 bg-blue-50 rounded-full font-mono">
            Avg: {stats.avg}
          </div>
        </div>
      )}
      <div className="mb-2 text-xs text-gray-500">
        Note: Values are automatically scaled (B = Billions, M = Millions, K = Thousands)
      </div>
      <div ref={chartRef} />
    </div>
  );
}

export default Chart;
