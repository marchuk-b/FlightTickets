import React from 'react'
import './FlightList.css'
import { FlightCard } from '../FlightCard/FlightCard'

export const FlightList = () => {

  const flights = [
    {
      id: 1,
      flightName: 'FL238',
      direction: { 
        from: 'Київ', 
        to: 'Лондон' 
      },
      departureTime: '9:30',
      departureDate: '15 бер',
      arrivalTime: '11:45',
      arrivalDate: '15 бер',
      price: 2500,
      status: 'За розкладом'
    },
    {
      id: 2,
      flightName: 'FL239',
      direction: { 
        from: 'Лондон', 
        to: 'Київ' 
      },
      departureTime: '12:00',
      departureDate: '16 бер',
      arrivalTime: '14:15',
      arrivalDate: '16 бер',
      price: 3000,
      status: 'За розкладом'
    },
    {
      id: 3,
      flightName: 'FL239',
      direction: { 
        from: 'Лондон', 
        to: 'Київ' 
      },
      departureTime: '12:00',
      departureDate: '16 бер',
      arrivalTime: '14:15',
      arrivalDate: '16 бер',
      price: 3000,
      status: 'За розкладом'
    },
  ]

  return (
    <div className="container">
      <div className="flightlist">
        {
          flights.map((flight, index) => {
            return (<FlightCard key={index} flightInfo={flight}/>)
          })
        }

      </div>
    </div>
  )
}
