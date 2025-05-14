import React, { useState } from 'react';
import './FlightSearch.css';
import API from '../../api/axios';

const cities = [
  { id: 1, name: 'Київ' },
  { id: 2, name: 'Париж' },
  { id: 3, name: 'Харків' },
  { id: 4, name: 'Лондон' },
  { id: 5, name: 'Берлін' },
  { id: 6, name: 'Львів' },
  { id: 7, name: 'Мілан' },
  { id: 8, name: 'Амстердам' },
  { id: 9, name: 'Стамбул' },
  { id: 10, name: 'Варшава' },
  { id: 11, name: 'Прага' },
];

export const FlightSearch = ({ onSearchResults }) => {
  const [roundTrip, setRoundTrip] = useState(false);
  const [from, setFrom] = useState(cities[0].name);
  const [to, setTo] = useState(cities[1].name);
  const [departure, setDeparture] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const formatDate = (date) => {
      if (!date) return '';
      const d = new Date(date);
      return d.toISOString().split('T')[0];
  };

  const handleSearch = async () => {
    try {
        const response = await API.get('/flights/search', {
            params: {
                from,
                to,
                departure: formatDate(departure),
                returnDate: roundTrip ? formatDate(returnDate) : undefined,
                roundTrip: roundTrip.toString(),
            },
        });

        console.log('Знайдено рейсів:', response.data);
        onSearchResults(response.data);
    } catch (error) {
        console.error('Помилка під час пошуку:', error);
        onSearchResults([])
    }
};

  return (
    <div className="container">
      <div className="flightsearch">
        <div className="flightsearch__triptype">
          <div className="flightsearch__radio">
            <input
              className="flightsearch__radio-input"
              type="radio"
              id="one-way"
              name="flight"
              checked={!roundTrip}
              onChange={() => setRoundTrip(false)}
            />
            <label className="flightsearch__radio-label" htmlFor="one-way">
              В один бік
            </label>
          </div>
          <div className="flightsearch__radio">
            <input
              className="flightsearch__radio-input"
              type="radio"
              id="round-trip"
              name="flight"
              checked={roundTrip}
              onChange={() => setRoundTrip(true)}
            />
            <label className="flightsearch__radio-label" htmlFor="round-trip">
              Повернення
            </label>
          </div>
        </div>

        <div className="flightsearch__parameters">
          <div className="flightsearch__group directions">
            <div className="flightsearch__element">
              <label className="flightsearch__label" htmlFor="from">Звідки</label>
              <select
                id="from"
                className="flightsearch__input"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              >
                {cities.map((d) => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>
            <div className="flightsearch__element">
              <label className="flightsearch__label" htmlFor="to">Куди</label>
              <select
                id="to"
                className="flightsearch__input"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              >
                {cities.map((d) => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flightsearch__group dates">
            <div className="flightsearch__element">
              <label className="flightsearch__label" htmlFor="departure">Туди</label>
              <input
                id="departure"
                className="flightsearch__input"
                type="date"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
              />
            </div>
            {roundTrip && (
              <div className="flightsearch__element">
                <label className="flightsearch__label" htmlFor="return">Назад</label>
                <input
                  id="return"
                  className="flightsearch__input"
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="flightsearch__group flightsearch__group--button">
            <button className="flightsearch__btn" onClick={handleSearch}>
              Пошук рейсів
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
