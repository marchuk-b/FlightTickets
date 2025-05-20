import { useEffect, useState } from 'react'
import './TicketCard.css'
import planeIcon from '../../assets/icons/plane.svg'
import API from '../../api/axios.js'
import { Modal } from '../Modal/Modal.jsx'
import { toast } from 'react-toastify'

export const TicketCard = ({ ticketInfo, onDelete }) => {
  const [loading, setLoading] = useState(true)
  const [flight, setFlight] = useState(null)
  const [open, setOpen] = useState(false);

  const statusClass = {
    "Оплачено": "ticketcard__ticket-status--paid",
    "Очікує оплати": "ticketcard__ticket-status--not-paid",
  }[ticketInfo.status];

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const flightData = await API.get(`/flights/${ticketInfo.flight}`)
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

  const deleteTicket = async () => {
    try {
      await API.delete(`/tickets/${ticketInfo._id}`)
      toast.success('Квиток успішно видалено')

      if (onDelete) {
        onDelete(ticketInfo._id);
        setOpen(false)
      }
    } catch (error) {
      console.error(error)
      toast.error('Не вдалося видалити квиток')
    }
  }

  const payTicket = async () => {
    try {
      await toast.promise(
        new Promise((resolve) => setTimeout(resolve, 2000)),
        {
          pending: 'Оплата обробляється...',
          success: 'Оплата завершена!',
          error: 'Помилка під час оплати',
        }
      );

      setOpen(false);
    } catch (error) {
      console.error(error)
      toast.error('Не вдалося оплатити квиток')
    }
  }

  return (
    <div className="ticketcard" onClick={() => setOpen(true)}>
      {loading || !flight ? (
        <div>Завантаження...</div>
      ) : (
        <>
          <div className="ticketcard__header">
            <div className="ticketcard__flight-info">
              <div className="ticketcard__flight-name">Рейс {flight.flightName}</div>
              <div className="ticketcard__flight-direction">{flight.direction.from} → {flight.direction.to}</div>
            </div>
            <div className="ticketcard__payment-info">
              <div className={`ticketcard__ticket-status ${statusClass}`}>
                {ticketInfo.status}
              </div>
              {/* <div className="ticketcard__price-value">{ticketInfo.price} UAH</div> */}
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

      <Modal open={open} onOpenChange={setOpen} title="Інформація про квиток" additionalClass={'ticket'}>
        <div className="modal">
          <div className="modal__inner ticket">
            <div className="modal__block ticket">
              <div className="modal__block-title">Паражир:</div>
              <div className="modal__block-row">
                <div className="modal__block-label">Прізвище та ім'я</div>
                <div className="modal__block-value">{ticketInfo.surName}<br />{ticketInfo.name}</div>
              </div>
            </div>
            <div className="modal__block ticket">
              <h3 className="modal__block-title">Місця:</h3>
              <div className="modal__block-row">
                <div className="modal__block-label">Заброньовано</div>
                <div className="modal__block-value">
                  {
                    ticketInfo.reservedSeats.length > 0
                      ? ticketInfo.reservedSeats.map(seat => seat.seatId).join(', ')
                      : 'Немає'
                  }
                </div>
              </div>
              <div className="modal__block-row">
                <div className="modal__block-label">Клас</div>
                <div className="modal__block-value">
                  {
                    ticketInfo.reservedSeats.length > 0
                      ? [...new Set(ticketInfo.reservedSeats.map(seat => seat.seatClass))].join(', ')
                      : 'Немає'
                  }
                </div>
              </div>
              <div className="modal__block-row">
                <div className="modal__block-label">Ціна</div>
                <div className="modal__block-value">{ticketInfo.price} UAH</div>
              </div>
            </div>
            <div className="modal__block ticket">
              <div className="modal__block-title">Рейс {flight?.flightName}</div>
              <div className="modal__block-row">
                <div className="modal__block-label">Напрямок</div>
                <div className="modal__block-value">{flight?.direction.from}-{flight?.direction.to}</div>
              </div>
              <div className="modal__block-row">
                <div className="modal__block-label">Виліт</div>
                <div className="modal__block-value">
                  {formatDate(flight?.departureDate)} {flight?.departureTime}
                </div>
              </div>
              <div className="modal__block-row">
                <div className="modal__block-label">Приліт</div>
                <div className="modal__block-value">
                  {formatDate(flight?.arrivalDate)} {flight?.arrivalTime}
                </div>
              </div>
            </div>
          </div>
          <div className="modal__btns">
            <button className="modal__delete-btn" onClick={payTicket}>
              Оплатити
            </button>
            <button className="modal__delete-btn" onClick={deleteTicket}>
              Скасувати квиток
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )  
}
