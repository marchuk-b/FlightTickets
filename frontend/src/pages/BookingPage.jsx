import React from 'react'
import './BookingPage.css'
import { SeatList } from '../components/SeatList/SeatList'

export const BookingPage = () => {
  
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
                                <input type="radio" name="class" id="economy" value="economy" />
                                <label className='bookingpage__choice-class__checkboxes__label' htmlFor="economy">Економ клас</label>
                            </div>
                            <div className="bookingpage__choice-class__checkboxes__item">
                                <input type="radio" name="class" id="business" value="business" />
                                <label className='bookingpage__choice-class__checkboxes__label' htmlFor="business">Бізнес клас</label>
                            </div>
                        </div>
                        <div className="bookingpage__choice-class__flight">
                            <div className="bookingpage__choice-class__flightname">Рейс: KY238 Київ - Лондон</div>
                            <div className="bookingpage__choice-class__flightdate">Дата: 25 березня 2024</div>
                        </div>
                        <div className="bookingpage__choice-class__seats-info">
                            <div className="bookingpage__choice-class__seats-info__item available">Вільне</div>
                            <div className="bookingpage__choice-class__seats-info__item unavailable">Зайняте</div>
                            <div className="bookingpage__choice-class__seats-info__item selected">Вибране</div>
                        </div>
                    </div>
                    <div className="bookingpage__choice-seat__list">
                        <SeatList columnNumber={6} rowNumber={4} listTitle={"Бізнес клас"} aisleIndexes={[2, 5]}/>
                        <SeatList columnNumber={6} rowNumber={6} listTitle={"Економ клас"} aisleIndexes={[2, 5]}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
