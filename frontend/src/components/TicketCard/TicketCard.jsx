import React, { useEffect, useState } from 'react'
import './TicketCard.css'
import planeIcon from '../../assets/icons/plane.svg'
import API from '../../api/axios.js'

export const TicketCard = ({ ticketInfo }) => {
  const [loading, setLoading] = useState(true)
  const [flight, setFlight] = useState(null)

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const flightData = await API.get(`/flights/${ticketInfo.flight}`)
        console.log(flightData.data)
        setFlight(flightData.data)
      } catch (error) {
        console.error('Error fetching flight:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFlight()
  }, [])

  const formatDate = (isoDate) => {
    const date = new Date(isoDate)
    return new Intl.DateTimeFormat('uk-UA', {
      day: 'numeric',
      month: 'long',
    }).format(date)
  }

  return (
    <div className="ticketcard">
      {loading || !flight ? (
        <div>Завантаження...</div>
      ) : (
        <>
          <div className="ticketcard__header">
            <div className="ticketcard__flight-info">
              <div className="ticketcard__flight-name">Рейc {flight.flightName}</div>
              <div className="ticketcard__flight-direction">{flight.direction.from} → {flight.direction.to}</div>
            </div>
            <div className="ticketcard__price">
              <span className="ticketcard__price-value">{ticketInfo.price} UAH</span>
            </div>
          </div>
  
          <div className="ticketcard__main">
            <div className="ticketcard__section ticketcard__section--departure">
              <div className="ticketcard__title">Виліт</div>
              <div className="ticketcard__time">{flight.departureTime}</div>
              <div className="ticketcard__date">{formatDate(flight.departureDate)}</div>
            </div>
  
            <img src={planeIcon} className="ticketcard__flight-icon" alt="" />
  
            <div className="ticketcard__section ticketcard__section--arrival">
              <div className="ticketcard__title">Приліт</div>
              <div className="ticketcard__time">{flight.arrivalTime}</div>
              <div className="ticketcard__date">{formatDate(flight.arrivalDate)}</div>
            </div>
          </div>
        </>
      )}
    </div>
  )  
}
