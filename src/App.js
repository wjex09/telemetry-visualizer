// src/App.js
import Reac, { useState, useEffect } from 'react';
import Chart from './components/Chart';
import Controls from './components/Controls';
import { fetchMetrics } from './api';

function App() {
  const [timeRange, setTimeRange] = useState('24h');
  const [aggregation, setAggregation] = useState('AVG');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const result = await fetchMetrics(timeRange, aggregation);
        setData(result);
        setError(null);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      }
      setLoading(false);
    };

    loadData();
  }, [timeRange, aggregation]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Telemetry Visualization</h1>

        <div className="bg-white rounded-lg shadow p-6">
          <Controls
            timeRange={timeRange}
            aggregation={aggregation}
            onTimeRangeChange={setTimeRange}
            onAggregationChange={setAggregation}
          />

          {loading && (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          )}

          {error && (
            <div className="text-red-500 p-4">{error}</div>
          )}

          {!loading && !error && (
            <Chart data={data} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
