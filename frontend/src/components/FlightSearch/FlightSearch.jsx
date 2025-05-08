import React from 'react';
import './FlightSearch.css';

const flightDirections = [
  { id: 1, direction: 'Київ-Лондон' },
  { id: 2, direction: 'Лондон-Київ' },
  { id: 3, direction: 'Київ-Париж' },
  { id: 4, direction: 'Париж-Київ' },
  { id: 5, direction: 'Київ-Нью-Йорк' },
  { id: 6, direction: 'Нью-Йорк-Київ' },
  { id: 7, direction: 'Київ-Токіо' },
  { id: 8, direction: 'Токіо-Київ' },
  { id: 9, direction: 'Київ-Берлін' },
  { id: 10, direction: 'Берлін-Київ' },
  { id: 11, direction: 'Київ-Мадрид' },
  { id: 12, direction: 'Мадрид-Київ' },
  { id: 13, direction: 'Київ-Рим' },
  { id: 14, direction: 'Рим-Київ' },
  { id: 15, direction: 'Київ-Стамбул' },
  { id: 16, direction: 'Стамбул-Київ' },
];

export const FlightSearch = () => {
  return (
    <div className="container">
      <div className="flightsearch">
        <div className="flightsearch__triptype">
          <div className="flightsearch__radio">
            <input className='flightsearch__radio-input' type="radio" id="round-trip" name="flight" value="round-trip" defaultChecked />
            <label className="flightsearch__radio-label" htmlFor="round-trip">Повернення</label>
          </div>
          <div className="flightsearch__radio">
            <input className='flightsearch__radio-input' type="radio" id="one-way" name="flight" value="one-way" />
            <label className="flightsearch__radio-label" htmlFor="one-way">В один бік</label>
          </div>
        </div>

        <div className="flightsearch__parameters">
          <div className="flightsearch__group directions">
            <div className="flightsearch__element">
              <label className="flightsearch__label" htmlFor="from">Звідки</label>
              <select id="from" name="from" className="flightsearch__input" required>
                {flightDirections.map((direction) => (
                  <option key={direction.id} value={direction.direction}>{direction.direction}</option>
                ))}
              </select>
            </div>
            <div className="flightsearch__element">
              <label className="flightsearch__label" htmlFor="to">Куди</label>
              <select id="to" name="to" className="flightsearch__input" required>
                {flightDirections.map((direction) => (
                  <option key={direction.id} value={direction.direction}>{direction.direction}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flightsearch__group dates">
            <div className="flightsearch__element">
              <label className="flightsearch__label" htmlFor="departure">Туди</label>
              <input id="departure" className="flightsearch__input" type="date" required />
            </div>
            <div className="flightsearch__element">
              <label className="flightsearch__label" htmlFor="return">Назад</label>
              <input id="return" className="flightsearch__input" type="date" required />
            </div>
          </div>

          <div className="flightsearch__group flightsearch__group--button">
            <button className="flightsearch__btn">Пошук рейсів</button>
          </div>
        </div>
      </div>
    </div>
  );
};
