import React, { useState } from 'react';
import { MapPin, Users, Target, BookOpen, Calendar, Globe, ChevronDown, ChevronUp } from 'lucide-react';
import { City } from '../data/citiesData';

interface CityCardProps {
  city: City;
  onClick: (city: City) => void;
}

const CityCard: React.FC<CityCardProps> = ({ city, onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const femalePercentage = ((city.femalePopulation / city.totalPopulation) * 100).toFixed(1);
  const malePercentage = ((city.malePopulation / city.totalPopulation) * 100).toFixed(1);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden group"
      onClick={() => onClick(city)}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">{city.name}</h3>
            <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{city.state}</span>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
            {city.region}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <Users className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
              <span className="text-sm">Population</span>
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">
              {city.totalPopulation.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <Target className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
              <span className="text-sm">Area</span>
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">
              {city.area} km²
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <BookOpen className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
              <span className="text-sm">Literacy</span>
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">
              {city.literacyRate}%
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-300">Gender Distribution</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {city.populationDensity.toLocaleString()} per km²
            </span>
          </div>
          <div className="flex space-x-2">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Male</span>
                <span className="text-xs text-blue-600 dark:text-blue-400">{malePercentage}%</span>
              </div>
              <div className="w-full bg-blue-100 dark:bg-blue-900 rounded-full h-2">
                <div 
                  className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${malePercentage}%` }}
                ></div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-pink-600 dark:text-pink-400 font-medium">Female</span>
                <span className="text-xs text-pink-600 dark:text-pink-400">{femalePercentage}%</span>
              </div>
              <div className="w-full bg-pink-100 dark:bg-pink-900 rounded-full h-2">
                <div 
                  className="bg-pink-600 dark:bg-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${femalePercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            <span>Est. {city.establishedYear}</span>
          </div>
          <div className="flex items-center">
            <Globe className="w-3 h-3 mr-1" />
            <span>Rank #{city.id}</span>
          </div>
        </div>

        <button
          onClick={handleClick}
          className="w-full mt-4 flex items-center justify-center text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
        >
          {isExpanded ? (
            <>
              <span>Show Less</span>
              <ChevronUp className="w-4 h-4 ml-1" />
            </>
          ) : (
            <>
              <span>Show More</span>
              <ChevronDown className="w-4 h-4 ml-1" />
            </>
          )}
        </button>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 animate-fadeIn">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Population Growth</h4>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {((city.populationGrowth || 0) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Urban Area</h4>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">
                  {city.urbanArea || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CityCard;