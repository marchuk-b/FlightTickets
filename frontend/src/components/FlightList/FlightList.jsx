import React, { useEffect } from 'react'
import './FlightList.css'
import { FlightCard } from '../FlightCard/FlightCard'
import API from '../../api/axios.js'

export const FlightList = ({ sortBy }) => {
  const [flights, setFlights] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const res = await API.get('/flights/')
        console.log('Fetched flights:', res.data)
        setFlights(res.data)
      } catch (error) {
        console.error('Error fetching flights:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFlights()
  }, [])

  const sortedFlights = [...flights].sort((a, b) => {
    if (sortBy === 'price') {
      return a.price - b.price;
    }
    if (sortBy === 'time') {
      return new Date(`1970-01-01T${a.departureTime}`) - new Date(`1970-01-01T${b.departureTime}`);
    }
    if (sortBy === 'date') {
      return new Date(a.departureDate) - new Date(b.departureDate);
    }
    return 0;
  });

  return (
    <div className="container">
      <div className="flightlist">
        {loading ? (
          <div className="loader">Завантаження...</div> // Лоудер або спінер
        ) : (
          sortedFlights.map((flight, index) => {
            return <FlightCard key={index} flightInfo={flight} />
          })
        )}
      </div>
    </div>
  )
}
