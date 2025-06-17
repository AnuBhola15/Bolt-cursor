import React, { useState, useMemo, useEffect } from 'react';
import { MapPin, Database, Moon, Sun } from 'lucide-react';
import { citiesData, City } from './data/citiesData';
import CityCard from './components/CityCard';
import CityModal from './components/CityModal';
import FilterBar from './components/FilterBar';
import StatsOverview from './components/StatsOverview';
import PopulationBreakdownGraph from './components/PopulationBreakdownGraph';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [sortBy, setSortBy] = useState('totalPopulation');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const states = useMemo(() => {
    const uniqueStates = [...new Set(citiesData.map(city => city.state))];
    return uniqueStates.sort();
  }, []);

  const regions = useMemo(() => {
    const uniqueRegions = [...new Set(citiesData.map(city => city.region))];
    return uniqueRegions.sort();
  }, []);

  const filteredAndSortedCities = useMemo(() => {
    let filtered = citiesData.filter(city => {
      const matchesSearch = city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           city.state.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesState = !selectedState || city.state === selectedState;
      const matchesRegion = !selectedRegion || city.region === selectedRegion;
      
      return matchesSearch && matchesState && matchesRegion;
    });

    filtered.sort((a, b) => {
      let aValue = a[sortBy as keyof City];
      let bValue = b[sortBy as keyof City];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }
      if (sortOrder === 'asc') {
        return (aValue ?? 0) < (bValue ?? 0) ? -1 : (aValue ?? 0) > (bValue ?? 0) ? 1 : 0;
      } else {
        return (aValue ?? 0) > (bValue ?? 0) ? -1 : (aValue ?? 0) < (bValue ?? 0) ? 1 : 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedState, selectedRegion, sortBy, sortOrder]);

  const handleCityClick = (city: City) => {
    setSelectedCity(city);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCity(null);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-2xl shadow-lg">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              {darkMode ? (
                <Sun className="w-6 h-6 text-yellow-500" />
              ) : (
                <Moon className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Top 50 Cities in India
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore comprehensive demographic data and statistics for India's most populous cities.
            Discover population distributions, literacy rates, and geographic information.
          </p>
          <div className="flex items-center justify-center mt-6 text-sm text-gray-500 dark:text-gray-400">
            <Database className="w-4 h-4 mr-2" />
            <span>Updated with latest census data</span>
          </div>
        </div>

        {/* Stats Overview */}
        <StatsOverview cities={citiesData} filteredCities={filteredAndSortedCities} />

        <PopulationBreakdownGraph cities={citiesData} />

        {/* Filter Bar */}
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedState={selectedState}
          onStateChange={setSelectedState}
          selectedRegion={selectedRegion}
          onRegionChange={setSelectedRegion}
          sortBy={sortBy}
          onSortChange={setSortBy}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          states={states}
          regions={regions}
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredAndSortedCities.length}</span> of{' '}
            <span className="font-semibold text-gray-900">{citiesData.length}</span> cities
            {searchTerm && (
              <span className="text-blue-600 ml-2">
                for "{searchTerm}"
              </span>
            )}
          </p>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedCities.map((city) => (
            <CityCard
              key={city.id}
              city={city}
              onClick={handleCityClick}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedCities.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MapPin className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No cities found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or filters to find more cities.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center text-sm text-gray-500">
          <p>Data sourced from Government of India Census Reports</p>
          <p className="mt-2">© 2024 India Cities Explorer. All rights reserved.</p>
        </div>
      </div>

      {/* City Modal */}
      <CityModal
        city={selectedCity}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}

export default App;