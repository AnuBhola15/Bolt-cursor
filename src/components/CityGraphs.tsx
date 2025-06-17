import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { City } from '../data/citiesData';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface CityGraphsProps {
  city: City;
}

const CityGraphs: React.FC<CityGraphsProps> = ({ city }) => {
  // Gender Distribution Pie Chart
  const genderData = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        data: [city.malePopulation, city.femalePopulation],
        backgroundColor: ['#3B82F6', '#EC4899'],
        borderColor: ['#2563EB', '#DB2777'],
        borderWidth: 1,
      },
    ],
  };

  // Literacy Rate Bar Chart
  const literacyData = {
    labels: ['City Literacy', 'National Average'],
    datasets: [
      {
        label: 'Literacy Rate (%)',
        data: [city.literacyRate, 77.7], // Using 77.7% as national average
        backgroundColor: ['#8B5CF6', '#6B7280'],
        borderColor: ['#7C3AED', '#4B5563'],
        borderWidth: 1,
      },
    ],
  };

  // Population Density Line Chart
  const densityData = {
    labels: ['2011', '2015', '2020', '2024'],
    datasets: [
      {
        label: 'Population Density (per km²)',
        data: [
          city.populationDensity * 0.8, // 2011
          city.populationDensity * 0.9, // 2015
          city.populationDensity * 0.95, // 2020
          city.populationDensity, // 2024
        ],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#6B7280',
        },
      },
    },
  };

  return (
    <div className="mt-6 space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Population Distribution
        </h3>
        <div className="h-64">
          <Pie data={genderData} options={chartOptions} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Literacy Rate Comparison
        </h3>
        <div className="h-64">
          <Bar data={literacyData} options={chartOptions} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Population Density Trend
        </h3>
        <div className="h-64">
          <Line data={densityData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default CityGraphs; 