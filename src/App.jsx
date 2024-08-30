import React from 'react'
import { useState } from 'react'
import './App.css'
import search from './assets/icons/search.svg'
import { useStateContext } from './Context'
import { BackgroundLayout, WeatherCard, MiniCard } from './Components'


function App() {
  const [input, setInput] = useState('')
  const { weather, thisLocation, values, place, setPlace } = useStateContext()

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [cities, setCities] = useState(['New Delhi', 'Coimbatore', 'Mumbai', 'Chennai', 'Bhopal']);
 

// City search function
  const submitCity = () => {
    setPlace(input)
    setInput('')
  }

  //selecting the city
  const handleCityClick = (city) => {
    setPlace(city); 
    setDropdownVisible(false); 
  };


  //removing the city from the dropdown
  const handleCityRemove = (cityToRemove) => {
    setCities(cities.filter(city => city !== cityToRemove));
  };

  return (
    <>
      <div className='w-full h-screen text-white px-8'>
        <nav className='w-full p-3 flex justify-between items-center'>
          <h1 className='font-bold tracking-wide text-3xl'>Weather App</h1>
        
          <div className='relative'>
          <h1 
              className='font-bold tracking-wide text-3xl cursor-pointer' 
              onClick={() => setDropdownVisible(!dropdownVisible)}
            >
              Cities
            </h1>

            {dropdownVisible && (
              <ul className='absolute top-full mt-2 bg-white text-black rounded shadow-lg w-40 z-50'>
                {cities.map(city => (
                  <li 
                    key={city} 
                    className='p-2 cursor-pointer hover:bg-gray-200 flex justify-between items-center'
                    
                  >

<span onClick={() => handleCityClick(city)}>{city}</span>
                    <button 
                      onClick={() => handleCityRemove(city)} 
                      className='ml-4 text-red-600 hover:text-red-800'
                    >
                      x
                    </button>
                   
                  </li>
                ))}
              </ul>
            )}

</div>

          <div className='bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2'>
            <img src={search} alt="search" className='w-[1.5rem] h-[1.5rem]' />

            <input onKeyUp={(e) => {
              if (e.key === 'Enter') {
               
                submitCity()
              }
            }} type="text" placeholder='Search city' className='focus:outline-none w-full text-[#212121] text-lg' value={input} onChange={e => setInput(e.target.value)} />
          </div>
        </nav>
        <BackgroundLayout></BackgroundLayout>

         <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'> 
      
          <WeatherCard
            place={thisLocation}
            windspeed={weather.wspd}
            humidity={weather.humidity}
            temperature={weather.temp}
            heatIndex={weather.heatindex}
            iconString={weather.conditions}
            conditions={weather.conditions}
          />

          <div className='flex justify-center gap-8 flex-wrap w-[60%]'> 
         
            {
              values?.slice(1, 7).map(curr => {
                return (
                  <MiniCard
                    key={curr.datetime}
                    time={curr.datetime}
                    temp={curr.temp}
                    iconString={curr.conditions}
                  />
                )
              })
            }
          </div>
        </main>
      </div>
    </>
  )
}

export default App
