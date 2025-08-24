import axios from 'axios';
import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { WiWindBeaufort0 } from "react-icons/wi";


const App = () => {
  
const [search, setsearch] = useState("")
const [loading, setloading] = useState(false)
const [temprature, settemprature] = useState(null)
const [humdity, sethumdity] = useState(null)
const [wind, setwind] = useState(null)
const [city, setcity] = useState("")
const [weatherIcon, setweatherIcon] = useState("01d")

const fetchWeather=async()=>{
  if(!search) return;
  setloading(true)
  try {
const {data}=await axios.get(` https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${MY_API_KEY}`)
console.log(data)
if(data.cod===200){
settemprature(data.main.temp);
sethumdity(data.main.humidity)
setwind(data.wind.speed)
setcity(data.name)
setweatherIcon(data.weather[0].icon)
}
    }
    
   catch (error) {
    console.log(error)
    setcity("city not found")
    settemprature(null)
    setwind(null)
    setweatherIcon("01d")
  }
  setloading(false)
}
const MY_API_KEY="1de46d2ca16bef6c266d2941d6911e06"

  return (
  <>
  <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-br from-green-950 to-black text-white'>
    {/*search bar and icons */}
    <div className='flex items-center bg-white rounded-full px-4 py-2 mb-6 w-80 shadow-lg'>
      <input type="text" placeholder='enter your city' 
      value={search}
      onChange={(e)=>setsearch(e.target.value)}
      className='flex-1 text-black outline-none px-2 '/>
      <FaSearch onClick={fetchWeather} className='text-gray-500 cursor-pointer'/>
   </div>

    {/*weather icons  */}
    <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="weather logo" className='w-20 h-20 mb-4' />
{/* //https://cdn-icons-png.flaticon.com/128/1163/1163763.png */}

    {/*temprature and city */}
    <h1 className='text-4xl font-bold '>{loading ? "loading..." :temprature!==null ?`${temprature}°C`: "_____"} </h1>
    <h2 className='text-2xl mt-2 font-semibold'>{city || "type to check temprature"}</h2>

    {/*Humdity and wind speed */}
    <div className=' w-full max-w-md mt-7 flex flex-col md:flex-row items-center justify-between md:items-start '>
<div className='flex flex-col items-center '>
<WiHumidity className='text-3xl' />
<span className='text-lg font-medium'>{humdity!==null ? `${humdity}%`:"____"}</span>
<p className='text-sm'>Humdity</p>
</div>

<div className='flex flex-col items-center'>
<WiWindBeaufort0 className='text-3xl ' />
<span className='text-lg font-medium'>{wind!==null ? `${wind}km/h`:"____"}</span>
<p className='text-sm'>Wind Speed</p>
</div>

    </div>
  </div>
  </>
  )
}

export default App
