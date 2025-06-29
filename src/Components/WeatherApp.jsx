import { useEffect, useState } from "react"

export const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [error, setError] = useState('');
    const [weatherData, setweatherData] = useState(null);
    const API_KEY = import.meta.env.VITE_REACT_WEATHER_APIKEY;
    const getWeather = (e) => {
        e.preventDefault();
        if (!city) {
            setError("Enter City Name");
            return;
        }
        fetchWeather(city);
    }
    const fetchWeather = async (cityName) => {
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
            const data = await res.json();
            if (data.cod == 200) {

                setweatherData(data);
                console.log(data);
            } else {
                setWeatherData(null);
                setError("City not found");
            }
        } catch (e) {
            console.log(e);
            setError(e);
        }
    }
    useEffect(() => {
        fetchWeather("Karachi");
    }, [city])
    return (
        <div className="weather-container">
            <h1 className="main-heading">Weather App</h1>
            <form onSubmit={getWeather}>
                <input type="text" placeholder="Enter city name" autoComplete="off" name="city" value={city} onChange={(e) => {
                    setCity(e.target.value);
                    setError('');

                }} />
                <button type="submit">Get Weather</button>
            </form>
            {error && <span className="error">{error}</span>}
            {weatherData &&

                <div className="weather-data">
                    <h1>Country name:{weatherData.sys.country}</h1>
                    <h3>City name:{weatherData.name}</h3>
                    <p>Temperature:{weatherData.main.temp}</p>
                    <p>Feels like:{weatherData.main.feels_like}</p>
                    <p>humidity:{weatherData.main.humidity}%</p>
                    <img
                        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt="weather icon"
                    />


                </div>
            }
        </div>
    )
}