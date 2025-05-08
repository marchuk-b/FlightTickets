import React, { useState, useEffect } from 'react'
import './ConfirmBookingPage.css'
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api/axios';

export const ConfirmBookingPage = () => {
    const navigate = useNavigate();
    const { userId, flightId } = useParams();
    const [flight, setFlight] = useState(null);
    const [reservedSeats, setReservedSeats] = useState(null);
    const [loading, setLoading] = React.useState(true);
    const [name, setName] = useState('');
    const [surName, setSurName] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');


    useEffect(() => {
        const fetchFlight = async () => {
            try {
                const res = await API.get(`/flights/${flightId}`)
                setFlight(res.data)

                const reservedSeatsData = await API.get(`/tickets/user-reserved-seats/${userId}/${flightId}`)
                setReservedSeats(reservedSeatsData.data.reservedSeats)
                console.log(reservedSeatsData.data.reservedSeats)
            } catch (error) {
                console.error('Error fetching flight data:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchFlight()
    }, [flightId, userId]);

    if (loading || !flight) {
        return <div>Завантаження...</div>;
    }

    const reservedClasses = reservedSeats.map(s => s.seatClass);

    const createTicket = async () => {
        const ticketData = {
            user: userId,
            name,
            surName,
            email,
            tel,
            flight: flightId,
            reservedSeats: reservedSeats.map(s => s.seatId),
            price: reservedSeats.length * (reservedClasses[0] === 'business' ? 2000 : 1000) // приклад
        };
    
        try {
            await API.post('/tickets/', ticketData);
            alert('Успішно заброньовано!');
            navigate('/profile'); // або інша сторінка
        } catch (error) {
            console.error(error);
            alert('Помилка при бронюванні');
        }
    };

    return (
    <div className='confirmpage'>
        <div className="container">
            <div className="confirmpage__content">
                <div className="confirmpage__header">
                    <div className="confirmpage__title">Деталі бронювання</div>
                    <div className="confirmpage__subtitle">Перегляньте інформацію про ваше бронювання та заповніть потрібні поля.</div>
                </div>
                <div className="confirmpage__main">
                    <div className="confirmpage__info-block">
                        <div className="confirmpage__info-block-item__title">Інформація про рейс</div>
                        <div className="confirmpage__info-block-items">
                            <div className="confirmpage__info-block-item">
                                <div className="confirmpage__info-block-item__label">Номер рейсу:</div>
                                <div className="confirmpage__info-block-item__info">{flight.flightName}</div>
                            </div>
                            <div className="confirmpage__info-block-item">
                                <div className="confirmpage__info-block-item__label">Дата:</div>
                                <div className="confirmpage__info-block-item__info">{flight.departureDate}-{flight.arrivalDate}</div>
                            </div>
                            <div className="confirmpage__info-block-item">
                                <div className="confirmpage__info-block-item__label">Відправлення:</div>
                                <div className="confirmpage__info-block-item__info">{flight.direction.from} {flight.departureTime}</div>
                            </div>
                            <div className="confirmpage__info-block-item">
                                <div className="confirmpage__info-block-item__label">Прибуття:</div>
                                <div className="confirmpage__info-block-item__info">{flight.direction.to} {flight.arrivalTime}</div>
                            </div>
                        </div>
                    </div>
                    <div className="confirmpage__info-block">
                        <div className="confirmpage__info-block-item__title">Інформація про користувача</div>
                        <div className="confirmpage__info-block-items">
                            <div className="confirmpage__info-block-item">
                                <div className="confirmpage__info-block-item__label">Ім'я:</div>
                                <input 
                                    className='confirmpage__info-block-item__input' 
                                    type="text"
                                    value={name} 
                                    onChange={e => setName(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="confirmpage__info-block-item">
                                <div className="confirmpage__info-block-item__label">Прізвище:</div>
                                <input 
                                    className='confirmpage__info-block-item__input' 
                                    type="text"
                                    value={surName} 
                                    onChange={e => setSurName(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="confirmpage__info-block-item">
                                <div className="confirmpage__info-block-item__label">Пошта:</div>
                                <input 
                                    className='confirmpage__info-block-item__input' 
                                    type="email"
                                    value={email} 
                                    onChange={e => setEmail(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="confirmpage__info-block-item">
                                <div className="confirmpage__info-block-item__label">Номер телефону:</div>
                                <input 
                                    className='confirmpage__info-block-item__input' 
                                    type="tel"
                                    value={tel} 
                                    onChange={e => setTel(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="confirmpage__info-block-item">
                                <div className="confirmpage__info-block-item__label">Місця:</div>
                                <div className="confirmpage__info-block-item__info">
                                    {reservedSeats.length > 0
                                    ? reservedSeats.map(s => s.seatId).join(', ')
                                    : 'Немає'}
                                </div>
                            </div>
                            <div className="confirmpage__info-block-item">
                                <div className="confirmpage__info-block-item__label">Клас:</div>
                                <div className="bookingpage__choice-class__reserved-info">
                                    {reservedClasses.map(cls =>
                                        cls === 'economy' ? 'Економ' : 'Бізнес'
                                    ).join(', ')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="confirmpage__btns">
                    <button className="confirmpage__btn cancel" onClick={() => navigate('/')}>Скасувати</button>
                    <button className="confirmpage__btn" onClick={createTicket}>Забронювати</button>
                </div>
            </div>
        </div>
    </div>
  );
};
