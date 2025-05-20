const fs = require('fs/promises');
const puppeteer = require('puppeteer');
const path = require('path');

function formatDate(date) {
  return new Date(date).toLocaleDateString('uk-UA');
}

async function generatePDF(ticketInfo, flight) {
  const htmlTemplate = await fs.readFile('./src/utils/ticketTemplate.html', 'utf8');

  const filledHTML = htmlTemplate
    .replace('{{surName}}', ticketInfo.surName)
    .replace('{{name}}', ticketInfo.name)
    .replace('{{reservedSeats}}', ticketInfo.reservedSeats.map(s => s.seatId).join(', '))
    .replace('{{seatClass}}', [...new Set(ticketInfo.reservedSeats.map(s => s.seatClass))].join(', '))
    .replace('{{price}}', ticketInfo.price)
    .replace('{{flightName}}', flight.flightName)
    .replace('{{from}}', flight.direction.from)
    .replace('{{to}}', flight.direction.to)
    .replace('{{departureDate}}', formatDate(flight.departureDate))
    .replace('{{departureTime}}', flight.departureTime)
    .replace('{{arrivalDate}}', formatDate(flight.arrivalDate))
    .replace('{{arrivalTime}}', flight.arrivalTime);

  const ticketsDir = path.resolve(__dirname, '../../tickets');

  try {
    await fs.access(ticketsDir);
  } catch (err) {
    await fs.mkdir(ticketsDir, { recursive: true });
  }

  const filePath = path.join(ticketsDir, `ticket_${Date.now()}.pdf`);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(filledHTML, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: filePath,
    format: 'A6',
    printBackground: true,
    landscape: true
  });
  await browser.close();
}

module.exports = { generatePDF };
