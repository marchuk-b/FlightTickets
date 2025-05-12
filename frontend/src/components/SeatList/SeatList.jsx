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
    return <div className="seatlist__error">Конфігурація літака не визначена</div>;
  }

  if (!seatsData.length) {
    return <div className="seatlist__empty">Немає доступних місць для вибору</div>;
  }

  const groupedByRow = seatsData.reduce((acc, seat) => {
    const row = seat.row;
    if (!acc[row]) acc[row] = [];
    acc[row].push(seat);
    return acc;
  }, {});

  const sortedRowKeys = Object.keys(groupedByRow).sort((a, b) => Number(a) - Number(b));

  const renderRow = (rowSeats, rowNumber) => {
    const totalPositions = planeConfig.columns + planeConfig.aisles.length;
    let seatIndex = 0;
    const rowElements = [];

    for (let pos = 0; pos < totalPositions; pos++) {
      if (planeConfig.aisles.includes(pos)) {
        rowElements.push(
          <div key={`aisle-${rowNumber}-${pos}`} className="seatlist__seats__aisle"></div>
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
                  : selectedSeats.some(s => s.seatId === seat.seatId)
                  ? 'selected'
                  : 'available'
              }`}
              onClick={() => {
                if (!reservedSeats.includes(seat.seatId)) {
                  onSeatClick(seat);
                }
              }}
            >
              {seat.seatId}
            </div>
          );
        } else {
          rowElements.push(
            <div key={`empty-${rowNumber}-${pos}`} className="seatlist__seats__empty"></div>
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
    <div className={`seatlist ${flightClass === 'business' ? 'business' : ''} ${planeConfig.planeType}`}>
      <div className="seatlist__seats">
        {sortedRowKeys.map((rowKey) => {
          const rowSeats = groupedByRow[rowKey]
            .sort((a, b) => String(a.column).localeCompare(String(b.column)));
          return renderRow(rowSeats, rowKey);
        })}
      </div>
    </div>
  );
};
