import React from 'react';
import { Users, MapPin, TrendingUp, BookOpen } from 'lucide-react';
import { City } from '../data/citiesData';

interface StatsOverviewProps {
  cities: City[];
  filteredCities: City[];
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ cities, filteredCities }) => {
  const totalPopulation = filteredCities.reduce((sum, city) => sum + city.totalPopulation, 0);
  const totalArea = filteredCities.reduce((sum, city) => sum + city.area, 0);
  const averageLiteracy = filteredCities.reduce((sum, city) => sum + city.literacyRate, 0) / filteredCities.length;
  const averageDensity = filteredCities.reduce((sum, city) => sum + city.populationDensity, 0) / filteredCities.length;

  const stats = [
    {
      title: 'Total Population',
      value: totalPopulation.toLocaleString(),
      icon: Users,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Area',
      value: `${totalArea.toLocaleString()} km²`,
      icon: MapPin,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Avg. Literacy Rate',
      value: `${averageLiteracy.toFixed(1)}%`,
      icon: BookOpen,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Avg. Density',
      value: `${averageDensity.toLocaleString(undefined, { maximumFractionDigits: 0 })} /km²`,
      icon: TrendingUp,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className={`${stat.bgColor} rounded-xl p-6 transform hover:scale-105 transition-all duration-300`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
              <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">
                Showing {filteredCities.length} of {cities.length} cities
              </p>
            </div>
            <div className={`p-3 rounded-full ${stat.color}`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;