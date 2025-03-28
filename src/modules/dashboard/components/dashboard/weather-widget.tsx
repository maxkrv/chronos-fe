import { useQuery } from '@tanstack/react-query';
import { FaCloud, FaCloudRain, FaCloudShowersHeavy, FaCloudSun, FaSnowflake, FaSun } from 'react-icons/fa';
import { FaTemperatureHalf } from 'react-icons/fa6';

import { USER_LOCATION } from '../../../../shared/constants/query-keys';

const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';
const LOCATION_API_URL = 'https://ipapi.co/json/';

interface WeatherData {
  temperature: number;
  condition: 'sunny' | 'cloudy' | 'partly-cloudy' | 'rainy' | 'stormy' | 'snowy';
}

const conditionMap: Record<number, WeatherData['condition']> = {
  0: 'sunny',
  1: 'partly-cloudy',
  2: 'partly-cloudy',
  3: 'cloudy',
  45: 'cloudy',
  48: 'cloudy',
  51: 'rainy',
  53: 'rainy',
  55: 'rainy',
  61: 'rainy',
  63: 'stormy',
  65: 'stormy',
  66: 'stormy',
  67: 'stormy',
  71: 'snowy',
  73: 'snowy',
  75: 'snowy',
  77: 'snowy'
};

const fetchWeather = async (latitude: number, longitude: number): Promise<WeatherData> => {
  const weatherRes = await fetch(`${WEATHER_API_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
  const weatherData = await weatherRes.json();
  const { temperature, weathercode } = weatherData.current_weather;

  return {
    temperature: Math.round(temperature),
    condition: conditionMap[weathercode] || 'cloudy'
  };
};

const fetchLocation = async (): Promise<{ latitude: number; longitude: number; city?: string }> => {
  const fetchApiLocation = async () => {
    const locationRes = await fetch(LOCATION_API_URL);
    const locationData = await locationRes.json();
    const { city, latitude, longitude } = locationData;
    if (latitude && longitude) {
      return {
        latitude,
        longitude,
        city: city || 'Unknown Location'
      };
    }
    throw new Error('Location information is incomplete.');
  };

  return new Promise((resolve, reject) => {
    // First, attempt geolocation
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition((position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }),
          () => {
            fetchApiLocation().then(resolve).catch(reject);
          };
      });
    }
    // If geolocation isn't supported, fall back to IP-based location
    fetchApiLocation().then(resolve).catch(reject);
  });
};

export const WeatherWidget = () => {
  const {
    data: locationData,
    isLoading: locationLoading,
    error: locationError
  } = useQuery({
    queryKey: [USER_LOCATION],
    queryFn: fetchLocation,
    retry: false // Don't retry the location fetch
  });

  const {
    data: weather,
    isLoading: weatherLoading,
    error: weatherError
  } = useQuery({
    queryKey: ['weather', locationData?.latitude, locationData?.longitude, locationData?.city],
    queryFn: () => fetchWeather(locationData?.latitude ?? 0, locationData?.longitude ?? 0),

    enabled: !locationLoading, // Fetch weather data only after location is available
    staleTime: 1000 * 60 * 10 // Cache for 10 minutes
  });

  const getWeatherIcon = () => {
    if (!weather) return <FaCloud className="text-gray-400" />;

    const iconMap: Record<WeatherData['condition'], JSX.Element> = {
      sunny: <FaSun className="text-yellow-400" />,
      cloudy: <FaCloud className="text-gray-400" />,
      'partly-cloudy': <FaCloudSun className="text-yellow-300" />,
      rainy: <FaCloudRain className="text-blue-400" />,
      stormy: <FaCloudShowersHeavy className="text-blue-600" />,
      snowy: <FaSnowflake className="text-blue-200" />
    };

    return iconMap[weather.condition] || <FaCloud className="text-gray-400" />;
  };

  if (locationLoading || weatherLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full border-2 border-foreground rounded-3xl p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 transition-all">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-10 bg-gray-300 rounded-full mb-2"></div>
          <div className="h-4 w-20 bg-gray-300 rounded mb-1"></div>
          <div className="h-3 w-16 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }
  if (locationError) {
    return (
      <div className="flex items-center justify-center w-full h-full border-2 border-foreground rounded-3xl p-4 bg-red-100 dark:bg-red-900/30 transition-all">
        <p className="text-red-500">Failed to get location data.</p>
      </div>
    );
  }

  if (weatherError) {
    return (
      <div className="flex items-center justify-center w-full h-full border-2 border-foreground rounded-3xl p-4 bg-red-100 dark:bg-red-900/30 transition-all">
        <p className="text-red-500">Failed to load weather data.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-full border-2 border-foreground rounded-3xl p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 transition-all">
      <div className="flex flex-col items-center">
        <div className="text-4xl mb-2">{getWeatherIcon()}</div>
        <div className="flex items-center gap-1 text-xl font-semibold">
          <FaTemperatureHalf className="text-red-500" />
          {weather?.temperature}°C
        </div>
        {locationData?.city && <div className="text-sm text-muted-foreground">{locationData?.city}</div>}
      </div>
    </div>
  );
};
