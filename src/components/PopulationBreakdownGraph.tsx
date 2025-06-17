import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { City } from '../data/citiesData';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface PopulationBreakdownGraphProps {
  cities: City[];
}

const PopulationBreakdownGraph: React.FC<PopulationBreakdownGraphProps> = ({ cities }) => {
  // Sort cities by total population
  const sortedCities = [...cities].sort((a, b) => b.totalPopulation - a.totalPopulation);

  // Total Population Data
  const totalPopulationData = {
    labels: sortedCities.map(city => city.name),
    datasets: [
      {
        label: 'Total Population',
        data: sortedCities.map(city => city.totalPopulation),
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
      },
    ],
  };

  // Gender Distribution Data
  const genderDistributionData = {
    labels: sortedCities.map(city => city.name),
    datasets: [
      {
        label: 'Male Population',
        data: sortedCities.map(city => city.malePopulation),
        backgroundColor: 'rgba(53, 162, 235, 0.7)',
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 1,
      },
      {
        label: 'Female Population',
        data: sortedCities.map(city => city.femalePopulation),
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-IN').format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Cities'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Population'
        },
        ticks: {
          callback: function(value: any) {
            return new Intl.NumberFormat('en-IN').format(value);
          }
        }
      }
    }
  };

  return (
    <div className="space-y-8 w-full">
      {/* Total Population Graph */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Total Population by City
        </h3>
        <div className="h-[500px] w-full">
          <Bar 
            data={totalPopulationData} 
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: {
                  display: true,
                  text: 'Total Population Distribution'
                }
              }
            }} 
          />
        </div>
      </div>

      {/* Gender Distribution Graph */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Gender Distribution by City
        </h3>
        <div className="h-[500px] w-full">
          <Bar 
            data={genderDistributionData} 
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: {
                  display: true,
                  text: 'Male vs Female Population'
                }
              },
              scales: {
                ...chartOptions.scales,
                x: {
                  ...chartOptions.scales.x,
                  stacked: true
                },
                y: {
                  ...chartOptions.scales.y,
                  stacked: true
                }
              }
            }} 
          />
        </div>
      </div>
    </div>
  );
};

export default PopulationBreakdownGraph; 