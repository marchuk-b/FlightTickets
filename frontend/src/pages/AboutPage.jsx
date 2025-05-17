import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className="aboutpage">
      <div className="container">
        <div className="aboutpage__content">
            <h1 className="aboutpage__title">Про нас</h1>

            <p className="aboutpage__text">
            <strong>FlightTickets</strong> — це сучасний вебсервіс для зручного
            бронювання авіаквитків. Платформа виникла як навчальний проєкт у рамках лабораторних
            робіт. Та з часом ідея можливо трансформується у щось більше — у повноцінну
            систему, яка імітуватиме реальні процеси бронювання авіарейсів, зручного
            вибору місць і керування рейсами.
            </p>

            <hr className="aboutpage__hr" />

            <h2 className="aboutpage__mini-title">Місія проекту</h2>
            <p className="aboutpage__text">
            Створюючи проект, я прагнув зробити досвід бронювання квитків максимально простим,
            зрозумілим і доступним. Навіть якщо це прототип, я вірю, що зручність
            — це ключ до ефективних рішень.
            </p>

            <hr className="aboutpage__hr" />

            <h2 className="aboutpage__mini-title">Цінності</h2>
            <ul className="aboutpage__list">
            <li><strong>Простота:</strong> Мінімум кроків — максимум результату.</li>
            <li><strong>Якість:</strong> Навіть студентський код може бути професійним.</li>
            <li><strong>Навчання:</strong> Кожен рядок коду — це крок до майстерності.</li>
            <li><strong>Користувач у центрі:</strong> Усе, що створюється — для людей.</li>
            </ul>

            <p className="aboutpage__text end">
            Дякую, що завітали. Можливо продовжу розвивати платформу,
            вдосконалюючи як її функціонал, так і власні навички.
            </p>
        </div>
      </div>
        
    </div>
  );
};

export default AboutPage;
