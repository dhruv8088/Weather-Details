import React,{useState,useEffect} from 'react'
import './weather.css'

const Weather = () => {
    const [searchValue,setSearchValue]=useState("Amritsar");
    const [tempInfo,setTempInfo]=useState([]);
    const [weatherState,setWeatherState]=useState("");
    const getWeather=async()=>{
        try {
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=Enter_your_API_key&units=metric`;
            const res=await fetch(url);
            const data=await res.json();
             const {temp,humidity,pressure} =data.main;
            const{main:weathermood}=data.weather[0];
            const{name}=data;
            const{speed}=data.wind;
             const{country,sunset}=data.sys;
            const newWeatherInfo={
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            };
            setTempInfo(newWeatherInfo);
        } catch (error) {
            console.log(error);
        }
    };

    // for changing the icons coming on the display for you.

    useEffect(()=>{
        if(tempInfo.weathermood){
          switch (tempInfo.weathermood){
            case "Clouds":
                 setWeatherState("wi-day-cloudy");
            break;
            case "Haze": 
            setWeatherState("wi-fog");
            break;
            case "Clear": setWeatherState("wi-day-sunny");
            break;
            case "Mist": setWeatherState("wi-dust");
            break;
            default:
                setWeatherState("wi-day-sunny");
                break;
          }
        }
    },[tempInfo.weathermood]);

    // for converting sunset time from binary form to actual form
     let sec=tempInfo.sunset;
     let date=new Date(sec*1000);
     let tym=`${date.getHours()}:${date.getMinutes()}`;

    useEffect(()=>{
     getWeather();
    });

  return (
    <>


    <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e)=>setSearchValue(e.target.value)}
          />

          <button
            className="searchButton"
            type="button" onClick={getWeather} >
            Search
          </button>
        </div>
      </div>

       <article className="widget">
        <div className="weatherIcon">
          <i className={`wi ${weatherState}` }></i>
        </div>

        <div className="weatherInfo">
          <div className="temperature">
            <span>{tempInfo.temp}&deg;</span>
          </div>

          <div className="description">
            <div className="weatherCondition">{tempInfo.weathermood}</div>
            <div className="place">
              {tempInfo.name}, {tempInfo.country}
            </div>
          </div>
        </div>

        <div className="date"> {new Date().toLocaleString()} </div>

        {/* our 4column section  */}
        <div className="extra-temp">
          <div className="temp-info-minmax">
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-sunset"}></i>
              </p>
              <p className="extra-info-leftside">
                {tym} <br />
                Sunset
              </p>
            </div>

            <div className="two-sided-section">
              <p>
                <i className={"wi wi-humidity"}></i>
              </p>
              <p className="extra-info-leftside">
       {tempInfo.humidity} <br />
                Humidity
              </p>
            </div>
          </div>

          <div className="weather-extra-info">
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-rain"}></i>
              </p>
              <p className="extra-info-leftside">
               {tempInfo.pressure} <br />
                Pressure
              </p>
            </div>

            <div className="two-sided-section">
              <p>
                <i className={"wi wi-strong-wind"}></i>
              </p>
              <p className="extra-info-leftside">
                {tempInfo.speed} <br />
                Speed
              </p>
            </div>
          </div>
        </div>
      </article>
</>
  )
}

export default Weather;

   
