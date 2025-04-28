import React from 'react';
import './SeatList.css';

const generateSeats = (rowNumber, columnNumber, aisleIndexes) => {
  const seats = [];

  for (let i = 0; i < rowNumber; i++) {
    const row = [];

    let letterIndex = 0;

    for (let j = 0; j < columnNumber + aisleIndexes.length; j++) {
      if (aisleIndexes.includes(j)) {
        row.push({ type: 'aisle', key: `aisle-${i}-${j}` });
      } else {
        row.push({
          type: 'seat',
          row: i + 1,
          column: String.fromCharCode(65 + letterIndex),
          key: `${i + 1}${String.fromCharCode(65 + letterIndex)}`,
        });
        letterIndex++;
      }
    }
    seats.push(row);
  }

  return seats;
};

export const SeatList = ({ rowNumber, columnNumber, listTitle, aisleIndexes = [] }) => {
  const seats = generateSeats(rowNumber, columnNumber, aisleIndexes);

  return (
    <div className="seatlist">
      <div className="seatlist__title">{listTitle}</div>
      <div className="seatlist__seats">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="seatlist__seats__row">
            {row.map((item) => (
              item.type === 'aisle' ? (
                <div key={item.key} className="seatlist__seats__aisle" />
              ) : (
                <div key={item.key} className="seatlist__seats__item available">
                  {item.row}{item.column}
                </div>
              )
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
