# Telemetry VisualizationFrontend

A React-based frontend for visualizing OpenTelemetry metrics using uPlot for efficient time series visualization.

## Features
- Real-time metrics visualization
- Automatic value scaling (B, M, K for large numbers)
- Multiple chart types
- Time range selection
- Statistical summary (Min, Max, Avg)
- Responsive design
- Interactive tooltips

## Setup

1. Clone the repository and install dependencies:
```bash
git clone <repository-url>
cd telemetry-viz
npm install
```

2. Install required dependencies:
```bash
npm install uplot
```

3. Start the development server:
```bash
npm start
```

The application will start on http://localhost:3001

## Project Structure
```
telemetry-viz/
├── src/
│   ├── components/
│   │   └── Chart.js        # Main chart component using uPlot
│   ├── App.js             # Main application component
│   └── index.js           # Entry point
├── package.json
└── README.md
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm eject` - Ejects from Create React App

## Chart Component Usage

```jsx
import Chart from './components/Chart';

// Example usage
<Chart data={metricsData} />
```

The Chart component expects data in the following format:
```javascript
[
  {
    "timestamp": "2024-11-03 20:09:10",
    "value": 48.7
  },
  // ...more data points
]
```

## Features

### Value Formatting
- Automatically formats large numbers:
  - Billions (B): > 1,000,000,000
  - Millions (M): > 1,000,000
  - Thousands (K): > 1,000
  - Regular numbers: ≤ 1,000

### Statistics Display
Shows:
- Minimum value
- Maximum value
- Average value

### Interactivity
- Hover tooltips with formatted values
- Responsive resizing
- Time-based x-axis

## API Integration

The frontend expects a backend API running on port 3000. Ensure the backend is running before starting the frontend.

Example API endpoint:
```
http://localhost:3000/api/metrics/cpu.usage/data
```

## Environment Setup

Create a `.env` file in the root directory:
```
PORT=3001
REACT_APP_API_URL=http://localhost:3000/api
```

## Styling

The project uses Tailwind CSS for styling. Main style classes:
- Chart container: `p-4 bg-white rounded-lg shadow`
- Statistics: `px-3 py-1 bg-blue-50 rounded-full font-mono`

## Browser Support

Supported browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Considerations

- uPlot is used for efficient rendering of time series data
- Data is preprocessed and formatted on the frontend
- Automatic cleanup of chart instances to prevent memory leaks

## Troubleshooting

Common issues:

1. Chart not rendering
   - Check if data is in correct format
   - Verify uPlot is properly installed

2. Connection errors
   - Verify backend is running on port 3000
   - Check API URL in environment variables

3. Formatting issues
   - Verify data values are numbers or can be converted to numbers
   - Check for null or undefined values

## Development

To add new features or modify the chart:

1. Chart modifications in `src/components/Chart.js`
2. Additional components in `src/components/`
3. Main app logic in `src/App.js`
