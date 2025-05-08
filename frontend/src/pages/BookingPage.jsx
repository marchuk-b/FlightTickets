import React, { useState, useEffect } from 'react'
import './BookingPage.css'
import { SeatList } from '../components/SeatList/SeatList'
import API from '../api/axios.js'
import { useAuth } from '../api/AuthContext.js'
import { useParams, useNavigate } from 'react-router-dom';

export const BookingPage = () => {
    const { flightId } = useParams();
    const { user } = useAuth();
    const [flight, setFlight] = useState(null);
    const [plane, setPlane] = useState(null);
    const [seats, setSeats] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [reservedSeats, setReservedSeats] = useState([]);
    const [flightClass, setFlightClass] = useState('economy');
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFlight = async () => {
        try {
            const res = await API.get(`/flights/${flightId}`)
            setFlight(res.data)
        
            const planeRes = await API.get(`/planes/${res.data.plane}`)
            setPlane(planeRes.data)
        
            const reservedSeatsData = await API.get(`/flights/${flightId}/reserved-seats`)
            setReservedSeats(reservedSeatsData.data)

            const seatsRes = await API.get(`/flights/${flightId}/seats`)
            setSeats(seatsRes.data)
        
        } catch (error) {
            console.error('Error fetching flight data:', error)
        } finally {
            setLoading(false)
        }
        }
        
        fetchFlight()
    }, [flightId]);

    if (loading || !flight || !plane) {
        return <div>Завантаження...</div>;
    }

    const handleSeatClick = (seatId) => {
        setSelectedSeats((prevSelected) =>
          prevSelected.includes(seatId)
            ? prevSelected.filter((s) => s !== seatId)
            : [...prevSelected, seatId]
        );
      };

    const handleReservation = async () => {
        try {
            if (selectedSeats.length === 0) return alert("Ви не вибрали жодного місця");
            
            await API.patch(`/flights/${flightId}/seats`, {seatIds: selectedSeats, user: user});
            console.log(selectedSeats)
            navigate(`/${user.id}/confirm/${flightId}`)
        } catch (err) {
            console.error(err);
            alert("Помилка під час бронювання.");
        }
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate)
        return new Intl.DateTimeFormat('uk-UA', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }).format(date)
      }

    const economConfig = {
        planeType: plane.name.toLowerCase().split(" ")[0],
        columns: plane.economPart.columns,
        aisles: plane.economPart.aisles
    };

    const businessConfig = {
        planeType: plane.name.toLowerCase().split(" ")[0],
        columns: plane.businessPart.columns,
        aisles: plane.businessPart.aisles
    };

  const planeConfig = flightClass === 'business' ? businessConfig : economConfig;
  
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
                                }}
                            />
                            <label className='bookingpage__choice-class__checkboxes__label' htmlFor="business">Бізнес клас</label>
                            </div>
                        </div>

                        <div className="bookingpage__choice-class__flight">
                            <div className="bookingpage__choice-class__flightname">Рейс: {flight.name} {flight.direction.from} - {flight.direction.to}</div>
                            <div className="bookingpage__choice-class__flightdate">
                                Дата: {" "}
                                {flight.departureDate === flight.arrivalDate ?
                                    formatDate(flight.departureDate) : formatDate(flight.departureDate) - formatDate(flight.arrivalDate)}
                            </div>
                        </div>


                        <div className="bookingpage__choice-class__seats-info">
                            <div className="bookingpage__choice-class__seats-info__item available">Вільне</div>
                            <div className="bookingpage__choice-class__seats-info__item unavailable">Зайняте</div>
                            <div className="bookingpage__choice-class__seats-info__item selected">Вибране</div>
                        </div>
                        </div>

                    <div className="bookingpage__choice-seat__list">
                        <SeatList
                            seatsData={seats.filter(s => s.seatClass === flightClass)}
                            flightClass={flightClass}
                            selectedSeats={selectedSeats}
                            reservedSeats={reservedSeats}
                            onSeatClick={handleSeatClick}
                            planeConfig={planeConfig}
                        />
                        <div className="bookingpage__btns">
                            <button className="bookingpage__btn cancel" onClick={() => navigate('/')}>Скасувати</button>
                            <button className="bookingpage__btn" onClick={handleReservation}>Далі</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};
