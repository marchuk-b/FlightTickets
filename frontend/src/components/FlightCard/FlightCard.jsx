import React from 'react'
import './FlightCard.css'
import planeIcon from '../../assets/icons/plane.svg'

export const FlightCard = ({flightInfo}) => {
  return (
    <>
      <div className="flightcard">
        <div className="flightcard__header">
          <div className="flightcard__flight-info">
            <div className="flightcard__flight-name">Рейс {flightInfo.flightname}</div>
            <div className="flightcard__flight-direction">{flightInfo.direction.from + ' → ' + flightInfo.direction.to}</div>
          </div>
          <div className="flightcard__flight-status">{flightInfo.status}</div>
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
          <button className='flightcard__btn'>Забронювати</button>
        </div>
      </div>
    </>
  )
}
