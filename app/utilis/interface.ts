export interface CurrentProps {
    data:{
        current:{
            condition:{
                icon:string;
                text:string
            };
            temp_c:number;
        };
        location:{
            name:string;
            region:string; 
        }
    }
}

export interface DayForecast {
    date:string;
    day:{
        condition:{
            icon:string;
            text:string;
        };
        maxtemp_c:number;
        mintemp_c:number;
    }
}

export interface WeekForecastProps {
    data:{
        forecast:{
            forecastday:DayForecast[]
        }
    }
}

export interface WeatherDetailsProps {
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

export interface WeatherDeatilBoxProp{
    title:string;
    value:string | number;
    unit?:string;
    Icon:React.ElementType;
  }


export interface InputProps{
    handleSearch:(event:React.KeyboardEvent<HTMLInputElement>)=>void
    setLocation: React.Dispatch<React.SetStateAction<string>>
    location:string
} 