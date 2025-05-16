import './FlightCard.css'
import planeIcon from '../../assets/icons/plane.svg'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Modal } from '../Modal/Modal.jsx'

export const FlightCard = ({flightInfo}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  
  const statusClass = {
    "За розкладом": "flightcard__flight-status--on-time",
    "Запізнення": "flightcard__flight-status--delayed",
    "Відмінено": "flightcard__flight-status--cancelled"
  }[flightInfo.status];

  const formatDate = (isoDate) => {
    const date = new Date(isoDate)
    return new Intl.DateTimeFormat('uk-UA', {
      day: 'numeric',
      month: 'long',
    }).format(date)
  }

  return (
    <div className="flightcard" onClick={() => setOpen(true)}>
      <div className="flightcard__header">
        <div className="flightcard__flight-info">
          <div className="flightcard__flight-name">Рейс {flightInfo.flightName}</div>
          <div className="flightcard__flight-direction">{flightInfo.direction.from + ' → ' + flightInfo.direction.to}</div>
        </div>
        <div className={`flightcard__flight-status ${statusClass}`}>
          {flightInfo.status}
        </div>

      </div>
      
      <div className="flightcard__main">
        <div className="flightcard__section flightcard__section--departure">
            <div className="flightcard__title">Виліт</div>
            <div className="flightcard__time">{flightInfo.departureTime}</div>
            <div className="flightcard__date">{formatDate(flightInfo.departureDate)}</div>
        </div>

        <img src={planeIcon} className="flightcard__flight-icon" alt="" />

        <div className="flightcard__section flightcard__section--arrival">
          <div className="flightcard__title">Приліт</div>
          <div className="flightcard__time">{flightInfo.arrivalTime}</div>
          <div className="flightcard__date">{formatDate(flightInfo.arrivalDate)}</div>
        </div>
      </div>
      <div className="flightcard__footer">
        <div className="flightcard__price">
          від <br />
          <span className="flightcard__price-value">{flightInfo.price}UAH</span>
        </div>
        <button
          className={`flightcard__btn ${flightInfo.status === "Відмінено" ? "disabled" : ""}`}
          disabled={flightInfo.status === "Відмінено"}
          onClick={() => {navigate(`/booking/${flightInfo._id}`)}}
        >
          Забронювати
        </button>
      </div>

      <Modal open={open} onOpenChange={setOpen} title="Інформація про рейс">
        <div className="modal">
          <div className="modal__inner">
              <div className="modal__block">
                  <div className="modal__block-content">
                      <div className="modal__block-item">
                          <div className="modal__block-label">Назва рейсу:</div>
                          <div className="modal__block-text">{flightInfo?.flightName}</div>
                      </div>
                      <div className="modal__block-item">
                          <div className="modal__block-label">Статус рейсу</div>
                          <div className="modal__block-text">{flightInfo?.status}</div>
                      </div>
                      <div className="modal__block-item">
                          <div className="modal__block-label">К-сть місць</div>
                          <div className="modal__block-text">{flightInfo?.seats.length}</div>
                      </div>
                      <div className="modal__block-item">
                          <div className="modal__block-label">Ціна квитка: </div>
                          <div className="modal__block-text">Економ: {flightInfo.price} UAH</div>
                          <div className="modal__block-text">Бізнес: {flightInfo.price + 500} UAH</div>
                      </div>
                      
                      <div className="modal__block-item">
                          <div className="modal__block-label">Звідки:</div>
                          <div className="modal__block-text">{flightInfo?.direction.from}</div>
                      </div>
                      <div className="modal__block-item">
                          <div className="modal__block-label">Куди:</div>
                          <div className="modal__block-text">{flightInfo?.direction.to}</div>
                      </div>
                      <div className="modal__block-item">
                          <div className="modal__block-label">Час вильоту:</div>
                          <div className="modal__block-text">
                              {formatDate(flightInfo?.departureDate)} {flightInfo?.departureTime}
                          </div>
                      </div>
                      <div className="modal__block-item">
                          <div className="modal__block-label">Час прильоту:</div>
                          <div className="modal__block-text">
                              {formatDate(flightInfo?.arrivalDate)} {flightInfo?.arrivalTime}
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
