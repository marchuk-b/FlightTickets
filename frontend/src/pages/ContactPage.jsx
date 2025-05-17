import { useState } from "react";
import { toast } from "react-toastify";
import "./ContactPage.css";

const ContactPage = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault(); 

        if (!form.name.trim()) {
            return toast.error("Введіть ім’я");
        }

        if (!form.email.trim()) {
            return toast.error("Введіть email");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            return toast.error("Некоректний email");
        }

        if (!form.message.trim()) {
            return toast.error("Введіть повідомлення");
        } else if (form.message.trim().length < 10) {
            return toast.error("Повідомлення має містити щонайменше 10 символів");
        }

        toast.info("Дякуємо за повідомлення. Десь через місяць ми вам відпишемо. Вибачте за незручності)");
        setForm({ name: "", email: "", message: "" });
    };

    return (
        <div className="contact__page">
            <div className="contact__card">
                <h1 className="contact__heading">Контакти</h1>

                <div className="contact__details">
                    <p className="contact__text"><strong>Email:</strong> support@flightickets.com</p>
                    <p className="contact__text"><strong>Телефон:</strong> +380 (098) 123-45-67</p>
                    <p className="contact__text"><strong>Адреса:</strong> м. Львів, вул. Драгоманова, 50</p>
                    <p className="contact__text"><strong>Графік:</strong> Пн–Пт, 09:00 – 18:00</p>
                </div>

                <form className="contact__form" onSubmit={handleSubmit}>
                    <div className="form__row">
                        <label>Ваше ім’я</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Ім’я"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form__row">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="email@example.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form__row">
                        <label>Повідомлення</label>
                        <textarea
                            name="message"
                            rows="4"
                            placeholder="Ваше повідомлення..."
                            value={form.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="submit__btn">Надіслати</button>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;
