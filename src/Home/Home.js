import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css"

export default function Home(){
    const [city, setCity] = useState ('Pune')
    const [temprature, setTemprature] = useState (0)
    const[humidity, setHumidity]= useState('')
    const [massage, setmassage] = useState('')
    const [pressure, setpressure] = useState('')

    
    async function loadWhether(){
try{
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f652964084c552e8c0492237a3fabd9c`)
            setTemprature((response.data.main.temp - 273).toFixed(2));
            setHumidity(response.data.main.humidity)
            setmassage('✅ Data Fetch Successfully....')
            setpressure(response.data.main.pressure)
        }
        catch(err){
            setTemprature(0);
            setmassage('City Not Found')
        }
    }
    useEffect(()=>{
        loadWhether()
    }, [city]);

    return(
        <div>
            <h1 className="app-title">Whether of {city}</h1>
            <input type="text" 
            className="search-bar" 
            placeholder="Enter City....."
            value={city}
            onChange={(e)=>{
                setCity(e.target.value)
            }}/>
            <p className="msg">{massage}</p>
            <h1 className="temp">Temprature:{temprature}  °C </h1>
            <p className="msg-text">Humidity: {humidity} </p>
            <p className="msg-text">Pressure: {pressure} </p>     
        </div>
    )
}