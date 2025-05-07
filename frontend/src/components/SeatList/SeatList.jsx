import React from 'react';
import './SeatList.css';

export const SeatList = ({
  seatsData = [],
  flightClass,
  selectedSeats = [],
  reservedSeats = [],
  onSeatClick = () => {},
  planeConfig,
}) => {
  if (!planeConfig || !planeConfig.columns || !Array.isArray(planeConfig.aisles)) {
    return <div>Конфігурація літака не визначена</div>;
  }

  const groupedByRow = seatsData.reduce((acc, seat) => {
    const row = seat.row;
    if (!acc[row]) acc[row] = [];
    acc[row].push(seat);
    return acc;
  }, {});

  // Отримуємо відсортовані ключі рядків (номери рядків)
  const sortedRowKeys = Object.keys(groupedByRow).sort((a, b) => Number(a) - Number(b));

  // Функція для відображення окремого ряду з урахуванням проходів
  const renderRow = (rowSeats, rowNumber) => {
    // Загальна кількість позицій визначається як кількість крісел плюс "
    // кількість проходів (скажімо, крісла займають стовпці, а проходи — задані позиції)
    const totalPositions = planeConfig.columns + planeConfig.aisles.length;
    let seatIndex = 0; // Індекс по масиву сидінь для даного ряду
    const rowElements = [];

    for (let pos = 0; pos < totalPositions; pos++) {
      if (planeConfig.aisles.includes(pos)) {
        // Якщо позиція відповідає проходу, рендеримо порожній блок із класом для проходу
        rowElements.push(
          <div key={`aisle-${rowNumber}-${pos}`} className="seatlist__seats__aisle">
            {/* Сюди можна вставити іконку чи залишити порожнім */}
          </div>
        );
      } else {
        const seat = rowSeats[seatIndex];
        if (seat) {
          rowElements.push(
            <div
              key={`seat-${rowNumber}-${seat.seatId}`}
              className={`seatlist__seats__item ${
                reservedSeats.includes(seat.seatId)
                  ? 'unavailable'
                  : selectedSeats.includes(seat.seatId)
                  ? 'selected'
                  : 'available'
              }`}
              onClick={() => {
                if (!reservedSeats.includes(seat.seatId)) {
                  onSeatClick(seat.seatId);
                }
              }}
            >
              {seat.seatId}
            </div>
          );
        } else {
          // Якщо для даного не-aisle місця не знайдено крісло, вставляємо пустий placeholder (це на випадок, якщо дані неповні)
          rowElements.push(
            <div key={`empty-${rowNumber}-${pos}`} className="seatlist__seats__empty">
              {/* Порожнє місце */}
            </div>
          );
        }
        seatIndex++;
      }
    }
    return (
      <div key={`row-${rowNumber}`} className="seatlist__seats__row">
        {rowElements}
      </div>
    );
  };

  return (
    <div className={`
      seatlist ${flightClass === 'business' ? 'business' : ''} ${planeConfig.planeType}`}>
      <div className="seatlist__seats">
        {sortedRowKeys.map((rowKey) => {
          const rowSeats = groupedByRow[rowKey].sort((a, b) =>
            a.column.localeCompare(b.column)
          );
          return renderRow(rowSeats, rowKey);
        })}
      </div>
    </div>
  );
};
