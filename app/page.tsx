"use client"
import React,  { useState } from "react"

import Input from "./component/Input"

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
  
      const data = await response.json();
      setData(data);
      setLocation("");
      setError("");
    } catch (error) {
      setError("City not found");
      setData({});
    }
  };

  // const handleSearch= async(e:React.KeyboardEvent<HTMLInputElement>)=>{
  //   if(e.key === 'Enter'){
  //     e.preventDefault();
  //     try{
  //       const response =await fetch(url);
  //       if(!response.ok){
  //         throw new Error()
  //       }
  //       const data =await response.json();
  //       setData(data);
  //       setLocation("");
  //       setError('')
  //     } catch(error){
  //       setError("City not found");
  //       setData({});
  //     }
  //   }
  // }

  let content;
  if(Object.keys(data).length===0 && error === ""){
    content =(
      <div>
        <h2> Welcome to the weather app</h2>
      </div>
    )
  }else if(error!==""){
    content =(
      <div>
        <p>City Not Found</p>
        <p>Enter a Valid City Name</p>
      </div>
    )
  } else {
    content =(
      <div>
       {data.current.temp_c}
      </div>
    )
  }

  return (
    <div className="bg-cover bg-gradient-to-r from-blue-500 to-blue-300 h-fit">
      <div className="bg-white/25 w-full flex flex-col h-fit">
        <div className="flex flex-col md:flex-row justify-between items-center p-12">
          <Input handleSearch={handleSearch} setLocation ={setLocation} location={location}/>
          <h1 className="mb-8 md:mb-0 order-1 text-white py-2 px-4 rounded-xl italic font-bold">Weather App</h1>
        </div>
        {content}
      </div>
    </div>
  )
}
