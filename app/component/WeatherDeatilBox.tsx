import { WeatherDeatilBoxProp } from "../utilis/interface"


const WeatherDeatilBox = ({title,value,unit,Icon}:WeatherDeatilBoxProp) => {
  return (
    <div className='bg-white/50 flex p-4 items-center justify-center gap-6 rounded-xl'>
    <div className='text-2xl'>
        <h3>{title}</h3>
        <h3>{value} {unit}</h3>
    </div>
    <div className='text-5xl'>
        <Icon />
    </div>
</div>
  )
}

export default WeatherDeatilBox