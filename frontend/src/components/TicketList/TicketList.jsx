import React, { useEffect } from 'react'
import './TicketList.css'
import { TicketCard } from '../TicketCard/TicketCard.jsx'
import API from '../../api/axios.js'

export const TicketList = () => {
  const [tickets, setTickets] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await API.get('/tickets/')
        console.log('Fetched tickets:', res.data)
        setTickets(res.data)
      } catch (error) {
        console.error('Error fetching tickets:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTickets()
  }, [])

  return (
    <div className="ticketlist">
      {loading ? (
        <div className="loader">Завантаження...</div> // Лоудер або спінер
      ) : (
        tickets.map((ticket, index) => {
          return <TicketCard key={index} ticketInfo={ticket} />
        })
      )}
    </div>
  )
}
