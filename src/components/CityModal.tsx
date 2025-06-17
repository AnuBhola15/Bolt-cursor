import React from 'react';
import { X, MapPin, Users, Target, BookOpen, Calendar, Globe, TrendingUp, Home } from 'lucide-react';
import { City, citiesData } from '../data/citiesData';
import CityGraphs from './CityGraphs';
import ComparisonGraphs from './ComparisonGraphs';

interface CityModalProps {
  city: City | null;
  isOpen: boolean;
  onClose: () => void;
}

const CityModal: React.FC<CityModalProps> = ({ city, isOpen, onClose }) => {
  if (!isOpen || !city) return null;

  const femalePercentage = ((city.femalePopulation / city.totalPopulation) * 100).toFixed(1);
  const malePercentage = ((city.malePopulation / city.totalPopulation) * 100).toFixed(1);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{city.name}</h2>
              <div className="flex items-center text-gray-600 dark:text-gray-300 mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{city.state}, {city.region}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <Users className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Population</h3>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{city.totalPopulation.toLocaleString()}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Male Population:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{city.malePopulation.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Female Population:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{city.femalePopulation.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <Target className="w-8 h-8 text-green-600 dark:text-green-400 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Geographic Info</h3>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">{city.area} km²</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Population Density:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{city.populationDensity.toLocaleString()} /km²</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Established:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{city.establishedYear}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
              Gender Distribution
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Male Population</span>
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{malePercentage}%</span>
                </div>
                <div className="w-full bg-blue-100 dark:bg-blue-900 rounded-full h-3">
                  <div 
                    className="bg-blue-600 dark:bg-blue-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${malePercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{city.malePopulation.toLocaleString()} people</p>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-pink-600 dark:text-pink-400">Female Population</span>
                  <span className="text-sm font-semibold text-pink-600 dark:text-pink-400">{femalePercentage}%</span>
                </div>
                <div className="w-full bg-pink-100 dark:bg-pink-900 rounded-full h-3">
                  <div 
                    className="bg-pink-600 dark:bg-pink-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${femalePercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{city.femalePopulation.toLocaleString()} people</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Literacy Rate</span>
              </div>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{city.literacyRate}%</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Globe className="w-5 h-5 text-orange-600 dark:text-orange-400 mr-2" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">National Rank</span>
              </div>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">#{city.id}</p>
            </div>
            <div className="bg-teal-50 dark:bg-teal-900 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Calendar className="w-5 h-5 text-teal-600 dark:text-teal-400 mr-2" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">City Age</span>
              </div>
              <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">{2024 - city.establishedYear} years</p>
            </div>
          </div>

          <CityGraphs city={city} />

          <ComparisonGraphs cities={citiesData} selectedCity={city} />
        </div>
      </div>
    </div>
  );
};

export default CityModal;