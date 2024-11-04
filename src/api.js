// src/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export async function fetchMetrics(timeRange, aggregation) {
  try {
    const response = await axios.get(`${API_URL}/metrics/cpu.usage/data`, {
      params: { timeRange, aggregation }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch metrics');
  }
}
