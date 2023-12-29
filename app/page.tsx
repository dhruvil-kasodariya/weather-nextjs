"use client"
import React,  { useState } from "react"
import Input from "@/app/component/Input"
import Current from '@/app/component/Current'
import WeatherDeatils from "@/app/component/WeatherDeatils"
import WeekForecast from "@/app/component/WeekForecast"
import suratData from '@/data.json';
export default function Home() {
  const [data,setData] =useState({});
  const [location,setLocation] =useState("");
  const [error,setError] =useState("");

  const url =`http://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${location}&days=7&aqi=yes&alerts=yes`

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (e.type === 'keydown' && (e as React.KeyboardEvent<HTMLInputElement>).key !== 'Enter') {
      return;
    }
  
    e.preventDefault();
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error();
      }
  
      const jsonData = await response.json();
      setData(jsonData);
    
      setLocation("");
      setError("");
    } catch (error) {
      setError("City not found");
      setData({});
    }
  };
 
  let content;
  if(Object.keys(data).length===0 && error === ""){
    content =(
      <div className="text-white text-center h-full mt-[5rem]">
        <h2 className="text-3xl font-bold mb-4"> Welcome to the weather app</h2>
        <p className="text-xl ">Enter a city name to get the weather</p>
      </div>
    )
  }else if(error!==""){
    content =(
      <div className="text-white text-center h-full mt-[5rem] mb-10">
        <p className="text-3xl font-bold mb-4">City Not Found</p>
        <p className="text-xl">Enter a Valid City Name</p>
      </div>
    )
  } else {
    content =(
      <>
      <div className="flex md:flex-row flex-col p-12 items-center justify-between">
       <Current data={data}/>
       <WeekForecast data={data}/>
      </div>
      <div>
        <WeatherDeatils data={data} />
      </div>
      </>
    )
  }

  return (
    <div className="bg-cover bg-gradient-to-r from-blue-500 to-blue-300 h-screen">
      <div className="bg-white/25 w-full flex flex-col h-screen">
        <div className="flex flex-col md:flex-row justify-between items-center p-12">
          <Input handleSearch={handleSearch} setLocation ={setLocation} location={location}/>
          <h1 className="mb-8 md:mb-0 order-1 text-white py-2 px-4 rounded-xl italic font-bold">Weather App</h1>
        </div>
        {content}
      </div>
    </div>
  )
}
