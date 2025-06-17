import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Radar } from 'react-chartjs-2';
import { City } from '../data/citiesData';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

interface ComparisonGraphsProps {
  cities: City[];
  selectedCity: City;
}

const ComparisonGraphs: React.FC<ComparisonGraphsProps> = ({ cities, selectedCity }) => {
  // Get top 5 cities by population
  const topCities = [...cities]
    .sort((a, b) => b.totalPopulation - a.totalPopulation)
    .slice(0, 5);

  // Population comparison data
  const populationData = {
    labels: topCities.map(city => city.name),
    datasets: [
      {
        label: 'Population',
        data: topCities.map(city => city.totalPopulation),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 1,
      },
    ],
  };

  // Population growth trend data
  const growthData = {
    labels: topCities.map(city => city.name),
    datasets: [
      {
        label: 'Population Growth Rate (%)',
        data: topCities.map(city => (city.populationGrowth ?? 0) * 100),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1,
      },
    ],
  };

  // Regional distribution data
  const regionalData = {
    labels: ['Population', 'Literacy Rate', 'Density', 'Growth Rate'],
    datasets: [
      {
        label: selectedCity.name,
        data: [
          selectedCity.totalPopulation / 1000000, // Scale down for better visualization
          selectedCity.literacyRate,
          selectedCity.populationDensity / 1000, // Scale down for better visualization
          (selectedCity.populationGrowth ?? 0) * 100,
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'City Comparison',
      },
    },
  };

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Population Comparison</h3>
        <Bar data={populationData} options={chartOptions} />
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Population Growth Trends</h3>
        <Line data={growthData} options={chartOptions} />
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">City Metrics Overview</h3>
        <Radar data={regionalData} options={chartOptions} />
      </div>
    </div>
  );
};

export default ComparisonGraphs; 