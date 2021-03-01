import React, {useEffect, useState} from 'react'

import {timestampParser} from "./lib/date";
import {wait} from "./lib/wait";

import {API} from './apiConfig';

function App() {

    const [query, setQuery] = useState('')
    const [weather, setWeather] = useState('')
    const [loading, setLoading] = useState(true)

    const handleSearch = async (e) => {
        if (e.key === 'Enter') {
            await fetch(`${API.API_URL}/weather?q=${query}&units=metric&APPID=${API.API_KEY}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => setWeather(data))
                .catch(err => console.log({Error: err}))
        }

    }

    useEffect(() => {
        wait(5000).then(() => setLoading(false))
    }, [loading])

    return loading ? (
        <div className="App loader">
            <span>L</span>
            <span className="letter"/>
            <span>A</span>
            <span>D</span>
            <span>I</span>
            <span>N</span>
            <span>G</span>
        </div>
    ) : (
        <div className={!loading && weather && weather.main.temp > 16 ? 'App warn' : 'App'}>
            <main>
                <div className="search-box">
                    <input onKeyPress={handleSearch} onChange={(e) => setQuery(e.target.value)} value={query}
                           className="search-bar" placeholder="Search..." type="text"/>
                </div>
                <div className="location-box">
                    {weather ?
                        <div className="location">{weather.name}, {weather.sys.country}</div>
                        :
                        <div className="location">Weather App</div>
                    }
                    <div className="date">{timestampParser(new Date())}</div>
                </div>
                {weather && (
                    <div className="weather-box">
                        <div className="temp">{Math.round(weather.main.temp)}°C</div>
                        <div className="weather">{weather.weather[0].main}</div>
                        <div className="weather-description">{weather.weather[0].description}</div>
                    </div>
                )}
            </main>
        </div>
    )
}

export default App
