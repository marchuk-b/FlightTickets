import { useEffect, useState } from 'react'
import './TicketList.css'
import { TicketCard } from '../TicketCard/TicketCard.jsx'
import API from '../../api/axios.js'
import { useAuth } from '../../api/AuthContext.js'

export const TicketList = () => {
    const { user } = useAuth()
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const res = await API.get(`/tickets/${user.id}/`)
                console.log('Fetched tickets:', res.data)
                setTickets(res.data)
            } catch (error) {
                console.error('Error fetching tickets:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchTickets()
    }, [user.id])

    const handleDelete = (ticketId) => {
        setTickets((prev) => prev.filter((t) => t._id !== ticketId));
    };

    return (
        <div className="ticketlist">
            {loading ? (
                <div className="loader">Завантаження...</div>
            ) : (
                tickets.map((ticket, index) => {
                return <TicketCard 
                            key={index} 
                            ticketInfo={ticket} 
                            onDelete={handleDelete}
                        />
                })
            )}
        </div>
    )
}
