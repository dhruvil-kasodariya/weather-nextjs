"use client"
import React,  { useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from "@/app/component/Input"
import Current from '@/app/component/Current'
import WeatherDeatils from "@/app/component/WeatherDeatils"
import WeekForecast from "@/app/component/WeekForecast"
import { CurrentProps, WeatherDetailsProps, WeekForecastProps } from "./utilis/interface"


export default function Home() {
  const [data,setData] =useState({});
  const [location,setLocation] =useState("");
  const [error,setError] =useState("");
  const [cordition,setCordition]=useState("");
  
  const url =`https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${location || cordition}&days=7&aqi=yes&alerts=yes`;

  const getData=async()=>{
    try {
      const response = await fetch(url);    
      if (!response.ok) {
        throw new Error();
      }
      const jsonData = await response.json();
      setData(jsonData);
      setLocation("");
      setCordition("");
      setError("");
    } catch (error) {
      toast.error('City not found',{
        position:toast.POSITION.TOP_RIGHT
      })
      setError("City not found");
      setData({});
    }
  }

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (e.type === 'keydown' && (e as React.KeyboardEvent<HTMLInputElement>).key !== 'Enter') {
      return;
    }
    e.preventDefault();
    getData();
  };

  const getLiveLocation = async () => {
    if (navigator.geolocation) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const coordinates = `${latitude},${longitude}`;
        return coordinates;       
      } catch (error) {
        toast.error(`Error getting geolocation:, ${error}`, {
          position: toast.POSITION.TOP_RIGHT,
        })
        console.error("Error getting geolocation:", error);
      }
    } else {
      toast.error("Geolocation is not supported by this browser.", {
        position: toast.POSITION.TOP_RIGHT,
      })
      console.log("Geolocation is not supported by this browser.");
    }
   return '';
  };

  const searchLiveLocation =async()=>{
     const data =  await getLiveLocation();
     setCordition(data);
  }

  useEffect(()=>{
    if(cordition){
    getData()
  }
  },[cordition])

 
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
      <div className="text-white text-center mt-[5rem] mb-10 h-full">
        <p className="text-3xl font-bold mb-4">City Not Found</p>
        <p className="text-xl">Enter a Valid City Name</p>
      </div>
    )
  } else {
    content =(
      <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-transparent ">
      <div className="flex md:flex-row flex-col p-12 items-center justify-between">
       <Current data={data as CurrentProps['data']}/>
       <WeekForecast data={data as WeekForecastProps['data']}/>
      </div>
      <div>
        <WeatherDeatils data={data as WeatherDetailsProps['data']} />
      </div>
      </div>
    )
  }

  return (
    <div className="bg-cover bg-gradient-to-r from-blue-500 to-blue-300 h-screen">
      <div className="bg-white/25 w-full flex flex-col h-screen">
        <div className="flex flex-col md:flex-row justify-between items-center p-12">
          <Input handleSearch={handleSearch} setLocation ={setLocation} location={location}/>
          <div className="flex flex-row items-center justify-center gap-2 order-3 md:order-2 mb-4 md:mb-0 text-white cursor-pointer" onClick={searchLiveLocation}>
            <h1>Get Live Location</h1>
            <FaLocationArrow />
          </div>
          <h1 className="order-1 md:order-3  text-white py-2 px-4 rounded-xl italic font-bold">Weather App</h1>
        </div>
        {content}
      </div> 
      <ToastContainer/>
    </div>
  )
}
