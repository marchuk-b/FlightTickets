import { useEffect, useState } from 'react'
import './TicketCard.css'
import planeIcon from '../../assets/icons/plane.svg'
import API from '../../api/axios.js'
import { Modal } from '../Modal/Modal.jsx'

export const TicketCard = ({ ticketInfo }) => {
  const [loading, setLoading] = useState(true)
  const [flight, setFlight] = useState(null)
  const [open, setOpen] = useState(false);

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
  }, [ticketInfo.flight])

  const formatDate = (isoDate) => {
    if (!isoDate) return "Невідома дата";
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return "Невідома дата";
    return new Intl.DateTimeFormat('uk-UA', { day: 'numeric', month: 'long' }).format(date);
  };

  return (
    <div className="ticketcard" onClick={() => setOpen(true)} >
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
      
      <Modal open={open} onOpenChange={setOpen} title="Інформація про квиток">
        <div className="modal">
          <div className="modal__inner">
              <div className="modal__block">
                  <div className="modal__block-title">Паражир:</div>

                  <div className="modal__block-content">
                      <div className="modal__block-item">
                          <div className="modal__block-label">Ім'я та прізвище</div>
                          <div className="modal__block-text">{ticketInfo.name} {ticketInfo.surName}</div>
                      </div>
                      <div className="modal__block-item">
                          <div className="modal__block-label">Заброньовані місця</div>
                          <div className="modal__block-text">
                            {ticketInfo.reservedSeats.length > 0
                                    ? ticketInfo.reservedSeats.join(', ')
                                    : 'Немає'}
                          </div>
                      </div>
                      <div className="modal__block-item">
                          <div className="modal__block-label">Клас</div>
                          <div className="modal__block-text">
                            {ticketInfo.seatClasses.length > 0
                              ? [...new Set(ticketInfo.seatClasses)].join(', ')
                              : 'Немає'}
                          </div>
                      </div>
                  </div>
              </div>

              <div className="modal__block">
                  <div className="modal__block-title">Рейс:</div>
                  
                  <div className="modal__block-content">
                      <div className="modal__block-item">
                          <div className="modal__block-label">Назва рейсу:</div>
                          <div className="modal__block-text">{flight?.flightName}</div>
                      </div>
                      <div className="modal__block-item">
                          <div className="modal__block-label">Звідки:</div>
                          <div className="modal__block-text">{flight?.direction.from}</div>
                      </div>
                      <div className="modal__block-item">
                          <div className="modal__block-label">Куди:</div>
                          <div className="modal__block-text">{flight?.direction.to}</div>
                      </div>
                      <div className="modal__block-item">
                          <div className="modal__block-label">Час вильоту:</div>
                          <div className="modal__block-text">
                              {formatDate(flight?.departureDate)} {flight?.departureTime}
                          </div>
                      </div>
                      <div className="modal__block-item">
                          <div className="modal__block-label">Час прильоту:</div>
                          <div className="modal__block-text">
                              {formatDate(flight?.arrivalDate)} {flight?.arrivalTime}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </Modal>
    </div>
  )  
}
