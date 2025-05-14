import { useEffect, useState } from 'react'
import './FlightList.css'
import { FlightCard } from '../FlightCard/FlightCard'
import API from '../../api/axios.js'
import { toast } from 'react-toastify'

export const FlightList = ({ sortBy, flights = [], isSearch = false }) => {
  const [internalFlights, setInternalFlights] = useState([])
  const [loading, setLoading] = useState(false)

  const shouldFetch = flights.length === 0 && !isSearch

  useEffect(() => {
    if (!shouldFetch) return

    const fetchFlights = async () => {
      setLoading(true)
      try {
        const res = await API.get('/flights/')
        setInternalFlights(res.data)
      } catch (error) {
        console.error('Error fetching flights:', error)
        toast.error('Помилка при завантаженні рейсів')
      } finally {
        setLoading(false)
      }
    }

    fetchFlights()
  }, [shouldFetch])

  const flightsToDisplay = shouldFetch ? internalFlights : flights

  const sortedFlights = [...flightsToDisplay].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price
    if (sortBy === 'time') return new Date(`1970-01-01T${a.departureTime}`) - new Date(`1970-01-01T${b.departureTime}`)
    if (sortBy === 'date') return new Date(a.departureDate) - new Date(b.departureDate)
    return 0
  })

  useEffect(() => {
    if (isSearch && flights.length === 0) {
      toast.info('Рейси не знайдено')
    }
  }, [isSearch, flights])

  return (
    <div className="container">
      <div className="flightlist">
        {loading ? (
          <div className="loader">Завантаження...</div>
        ) : sortedFlights.length === 0 ? (
          <div className="no-flights">Рейси не знайдено</div>
        ) : (
          sortedFlights.map((flight, index) => (
            <FlightCard key={index} flightInfo={flight} />
          ))
        )}
      </div>
    </div>
  )
}
