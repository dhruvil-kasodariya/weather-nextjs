"use client"
import { FaSearchLocation } from "react-icons/fa";
import { InputProps } from "../utilis/interface";
 

const Input = ({handleSearch,setLocation,location}:InputProps) => {
  return (
    <form className="flex items-center md:w-2/4 w-full order-2 md:order-1">
        <input
        type="text"
        placeholder="Search City" 
        className="w-full bg-transparent border-b-2 placeholder-white outline-none text-white"
        onKeyDown={handleSearch}
        value={location}
        onChange={(e)=>setLocation(e.target.value)}
        />
        <div className="ml-[-25px] text-white cursor-pointer">
            <FaSearchLocation onClick={handleSearch}/>
        </div>
    </form>
  )
}

export default Input