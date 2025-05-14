import { useState } from 'react'
import { FlightList } from '../components/FlightList/FlightList'
import { FlightSearch } from '../components/FlightSearch/FlightSearch'
import './FlightsPage.css'

export const FlightsPage = () => {
    const [sortBy, setSortBy] = useState('price');
    const [flights, setFlights] = useState([]);
    const [isSearch, setIsSearch] = useState(false);

    const handleSearchResults = (result) => {
        const allFlights = [...result.outboundFlights, ...result.returnFlights];
        setFlights(allFlights);
        setIsSearch(true);
    };

    return (
        <>
            <FlightSearch onSearchResults={handleSearchResults} />
            <div className="container">
                <div className="flightspage__flights">
                    <h1 className="flightspage__title">Доступні рейси</h1>
                    <div className="flightspage__sort">
                        <label className="flightspage__sort-label" htmlFor="sort">Сортувати за:</label>
                        <select
                            className="flightspage__sort-input"
                            id="sort"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="price">Ціною</option>
                            <option value="time">Часом</option>
                            <option value="date">Датою</option>
                        </select>
                    </div>
                </div>
            </div>
            <FlightList sortBy={sortBy} flights={flights} isSearch={isSearch} />
        </>
    )
}
