import React, { useState, useEffect } from 'react'
import './BookingPage.css'
import { SeatList } from '../components/SeatList/SeatList'
import API from '../api/axios.js'
import { useAuth } from '../api/AuthContext.js'
import { useParams } from 'react-router-dom';

export const BookingPage = () => {
  const { flightId } = useParams();
  const { user } = useAuth();
  const [flight, setFlight] = useState(null);
  const [plane, setPlane] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [reservedSeats, setReservedSeats] = useState([]);
  const [flightClass, setFlightClass] = useState('economy');
  const [loading, setLoading] = React.useState(true);
  const [ticketCount, setTicketCount] = useState(1);

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const res = await API.get(`/flights/${flightId}`)
        setFlight(res.data)
    
        const planeRes = await API.get(`/planes/${res.data.plane}`)
        setPlane(planeRes.data)
    
        const reservedSeatsData = await API.get(`/flights/${flightId}/reserved-seats`)
        setReservedSeats(reservedSeatsData.data)
    
      } catch (error) {
        console.error('Error fetching flight data:', error)
      } finally {
        setLoading(false)
      }
    }
    
      fetchFlight()
    }, [flightId])

    if (loading || !flight || !plane) {
        return <div>Завантаження...</div>;
      }

  // Обробка кліку по місцю
  const handleSeatClick = (seatId) => {
    setSelectedSeats((prevSelected) => {
      if (prevSelected.includes(seatId)) {
        return prevSelected.filter((s) => s !== seatId); // зняти вибір
      } else if (prevSelected.length < ticketCount) {
        return [...prevSelected, seatId]; // додати нове, якщо не перевищено ліміт
      } else {
        return prevSelected; // ігнор, якщо вже максимум
      }
    });
  };

  const handleReservation = async () => {
    try {
      if (selectedSeats.length === 0) return alert("Ви не вибрали жодного місця");
      
      await API.patch(`/flights/${flightId}/seats`, {seatIds: selectedSeats, user: user});
      console.log(selectedSeats)
      alert("Місця успішно заброньовано!");
    } catch (err) {
      console.error(err);
      alert("Помилка під час бронювання.");
    }
  };

  const config = plane
  ? {
      economy: {
        rows: plane.classDistribution.economy,
        cols: plane.columns,
        aisles: plane.aisles,
      },
      business: {
        rows: plane.classDistribution.business,
        cols: plane.columns,
        aisles: plane.aisles,
      },
    }
  : {
      economy: { rows: 0, cols: 0, aisles: [] },
      business: { rows: 0, cols: 0, aisles: [] },
    };

  const { rows, cols, aisles } = config[flightClass];

  return (
    <div className='bookingpage'>
      <div className="container">
        <div className="bookingpage__content">
          <div className="bookingpage__title">Вибір класу та місця в літаку</div>
          <div className="bookingpage__choice-seat">
            <div className="bookingpage__choice-class">
              <div className="bookingpage__choice-class__title">Оберіть клас:</div>
              <div className="bookingpage__choice-class__checkboxes">
                <div className="bookingpage__choice-class__checkboxes__item">
                  <input
                    type="radio"
                    name="class"
                    id="economy"
                    value="economy"
                    checked={flightClass === 'economy'}
                    onChange={(e) => {
                      setFlightClass(e.target.value);
                      setSelectedSeats([]);
                    }}
                  />
                  <label className='bookingpage__choice-class__checkboxes__label' htmlFor="economy">Економ клас</label>
                </div>
                <div className="bookingpage__choice-class__checkboxes__item">
                  <input
                    type="radio"
                    name="class"
                    id="business"
                    value="business"
                    checked={flightClass === 'business'}
                    onChange={(e) => {
                      setFlightClass(e.target.value);
                      setSelectedSeats([]);
                    }}
                  />
                  <label className='bookingpage__choice-class__checkboxes__label' htmlFor="business">Бізнес клас</label>
                </div>
              </div>

              <div className="bookingpage__choice-class__input">
                <label className="bookingpage__choice-class__input-label" htmlFor="numbTickets">Кількість квитків</label>
                <input
                  className="bookingpage__choice-class__input-input"
                  type="number"
                  id="numbTickets"
                  min={1}
                  max={5}
                  value={ticketCount}
                  onChange={(e) => {
                    const value = Math.max(1, Math.min(5, parseInt(e.target.value) || 1));
                    setTicketCount(value);
                    setSelectedSeats((prev) => prev.slice(0, value));
                  }}
                />
                <div className="bookingpage__choice-class__info">
                  Обрано {selectedSeats.length} з {ticketCount} місць
                </div>
              </div>

              <div className="bookingpage__choice-class__flight">
                <div className="bookingpage__choice-class__flightname">Рейс: {flight.name} {flight.direction.from} - {flight.direction.to}</div>
                <div className="bookingpage__choice-class__flightdate">Дата: {flight.departureDate}</div>
              </div>


              <div className="bookingpage__choice-class__seats-info">
                <div className="bookingpage__choice-class__seats-info__item available">Вільне</div>
                <div className="bookingpage__choice-class__seats-info__item unavailable">Зайняте</div>
                <div className="bookingpage__choice-class__seats-info__item selected">Вибране</div>
              </div>
            </div>

            <div className="bookingpage__choice-seat__list">
              <SeatList
                rowNumber={rows}
                columnNumber={cols}
                aisleIndexes={aisles}
                listTitle={`Схема сидінь (${flightClass === 'economy' ? 'Економ' : 'Бізнес'} клас)`}
                selectedSeats={selectedSeats}
                reservedSeats={reservedSeats}
                onSeatClick={handleSeatClick}
              />
              <button className="bookingpage__btn" onClick={handleReservation}>Забронювати</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
