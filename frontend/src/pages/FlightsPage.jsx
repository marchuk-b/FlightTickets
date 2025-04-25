import React from 'react'
import { FlightList } from '../components/FlightList/FlightList'
import { FlightSearch } from '../components/FlightSearch/FlightSearch'
import './FlightsPage.css'

export const FlightsPage = () => {
  
  return (
    <>
        <FlightSearch />
        <div className="container">
            <div className="flightspage__flights">
                <h1 className="flightspage__title">Доступні рейси</h1>
                <div className="flightspage__sort">
                    <label className="flightspage__sort-label" htmlFor="sort">Сортувати за:</label>
                    <select className="flightspage__sort-input" type="text" required >
                        <option value="price">Ціною</option>
                        <option value="time">Часом</option>
                        <option value="date">Датою</option>
                    </select>
                </div>
            </div>
        </div>
        <FlightList />
    </>
  )
}
