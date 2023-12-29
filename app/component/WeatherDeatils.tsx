import { GiWindSlap ,GiMultiDirections } from "react-icons/gi";
import { WiHumidity } from "react-icons/wi";
import { BsSunriseFill ,BsSunsetFill } from "react-icons/bs";
import { FaTemperatureHigh ,FaEye} from "react-icons/fa6";
import { MdOutlineAir } from "react-icons/md";
import WeatherDeatilsBox from './WeatherDeatilBox';

interface WeatherDetailsProps {
    data:{
        current:{
            wind_kph:number;
            humidity:number;
            wind_dir:string;
            feelslike_c:number;
            pressure_mb:number;
            vis_km:number;
        },
        forecast:{
            forecastday:{
                astro:{
                    sunrise:string;
                    sunset:string
                }
            }[]
        }
    }
}

const WeatherDeatils = ({data}:WeatherDetailsProps) => {

  const weatherBoxsData= [
    {id:1,title:'Wind Speed',value:data.current.wind_kph,unit:"kph" ,Icon:GiWindSlap},
    {id:2,title:'Humidity',value:data.current.humidity,unit:"%" ,Icon:WiHumidity},
    {id:3,title:'Wind Direction',value:data.current.wind_dir,Icon:GiMultiDirections},
    {id:4,title:'Sunrise',value:data.forecast.forecastday[0].astro.sunrise ,Icon:BsSunriseFill},
    {id:5,title:'Sunset',value:data.forecast.forecastday[0].astro.sunset ,Icon:BsSunsetFill},
    {id:6,title:'Feel Like',value:data.current.feelslike_c,unit:`C` ,Icon:FaTemperatureHigh},
    {id:7,title:'Air Pressure',value:data.current.pressure_mb,unit:"hpa" ,Icon:MdOutlineAir},
    {id:8,title:'Visibility',value:data.current.vis_km,unit:"km" ,Icon:FaEye},
  ]
    
  return (
    <>
        <div className='p-12'>
            <h1 className='mb-4 text-2xl text-white'>
                Weather Details
            </h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {weatherBoxsData.map((data)=>(
                     <WeatherDeatilsBox key={data.id} title={data.title} value={data.value} unit={data.unit} Icon={data.Icon}/>
                ))}               
            </div>
        </div>
    </>
  )
}

export default WeatherDeatils