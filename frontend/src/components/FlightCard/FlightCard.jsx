import React from 'react'
import './FlightCard.css'
import planeIcon from '../../assets/icons/plane.svg'
import { useNavigate } from 'react-router-dom';

export const FlightCard = ({flightInfo}) => {
  const navigate = useNavigate();
  const statusClass = {
    "За розкладом": "flightcard__flight-status--on-time",
    "Запізнення": "flightcard__flight-status--delayed",
    "Відмінено": "flightcard__flight-status--cancelled"
  }[flightInfo.status];


  return (
    <div className="flightcard">
      <div className="flightcard__header">
        <div className="flightcard__flight-info">
          <div className="flightcard__flight-name">Рейс {flightInfo.flightname}</div>
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
            <div className="flightcard__date">{flightInfo.departureDate}</div>
        </div>

        <img src={planeIcon} className="flightcard__flight-icon" alt="" />

        <div className="flightcard__section flightcard__section--arrival">
          <div className="flightcard__title">Приліт</div>
          <div className="flightcard__time">{flightInfo.arrivalTime}</div>
          <div className="flightcard__date">{flightInfo.arrivalDate}</div>
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
    </div>
  )
}
