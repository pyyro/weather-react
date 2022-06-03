import { FC, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import { HStack } from "@chakra-ui/react";
import axios from 'axios'
import "@fontsource/poppins";

interface DailyWeather {
  day: number;
  temp: number;
  weatherType: string;
}

interface WeatherData {
  dt: number,
  cityName: string,
  currentTemp: number;
  humidity: number;
  sunrise: number;
  sunset: number;
  visibility: number;
  wind: number;
  daily: DailyWeather[];
}

type Coordinates = {
  lat: string,
  lon: string,
}

const App: FC = () => {
  const [cityToGetData,setCityToGetData] = useState<string>("Kathmandu");
  const [coordinatesOfCity, setCoordinatesOfCity] = useState<Coordinates>({lat: '27.708317', lon: '85.3205817'})
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const getData= async():Promise<void> => {
    //get city name from search input and get its name, lat, lon
    const urlForCity = `https://api.openweathermap.org/geo/1.0/direct?q=${cityToGetData}&appid=${process.env.REACT_APP_API_KEY}`
  
    const responseForCity = await axios.get(urlForCity);
    const dataForCity = await responseForCity.data;

    const _cityLatLon:Coordinates = {
      lat: dataForCity[0].lat,
      lon: dataForCity[0].lon
    }
    
    setCoordinatesOfCity(_cityLatLon)

    const urlForWeatherData = `https://api.openweathermap.org/data/2.5/onecall?exclude=alerts,minutely&lat=${coordinatesOfCity.lat}&lon=${coordinatesOfCity.lon}&appid=${process.env.REACT_APP_API_KEY}`
    
    const responseForWeatherData = await axios.get(urlForWeatherData);
    const data = await responseForWeatherData.data;


    let _dailyData = data.daily.map((_data:any)=>(
      {day: new Date(_data.dt * 1000).getDay(), temp: _data.temp.day, weatherType: _data.weather[0].main}
    ))    
    let _weatherDataObj: WeatherData = {
      dt: data.current.dt,
      cityName: dataForCity[0].name,
      currentTemp: data.current.temp,
      humidity: data.current.humidity,
      sunrise: data.current.sunrise,
      sunset: data.current.sunset,
      visibility: data.current.visibility,
      wind: data.current.wind_speed,
      daily: _dailyData
    }
    setWeatherData(_weatherDataObj);
  }

  console.log(cityToGetData)

  useEffect(()=>{
    getData();
  },[cityToGetData])

  return (
    <HStack
      spacing="24px"
      align="top"
      background="#F3F2F2"
      fontFamily="Poppins"
    >
      <Sidebar weatherData = {weatherData} setCityToGetData={setCityToGetData}/>
      <Content weatherData={weatherData}/>
    </HStack>
  );
};

export default App;
