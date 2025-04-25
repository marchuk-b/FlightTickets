import React from 'react'
import './FlightSearch.css'

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
]

export const FlightSearch = () => {
    return (
        <div className="container">
            <div className="flightsearch">
                <div className="flightsearch__group">
                    <label className="flightsearch__label" htmlFor="from">Пункт призначення</label>
                    <select className="flightsearch__input" type="text" required >
                        {flightDirections.map((direction) => (
                                <option key={direction.id} value={direction.direction}>{direction.direction}</option>
                            ))}
                    </select>
                </div>
                <div className="flightsearch__group">
                    <label className="flightsearch__label" htmlFor="to">Дата вильоту</label>
                    <input className="flightsearch__input" type="date" required />
                </div>
                <div className="flightsearch__group">
                    <button className='flightsearch__btn'>Пошук рейсів</button>
                </div>
            </div>
        </div>
    )
}
