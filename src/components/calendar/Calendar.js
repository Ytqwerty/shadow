import React, {useState} from 'react';
import './Calendar.css'
import Modal from "../ui/modal/Modal";
import Button from "../ui/button/Button";

const Calendar = () => {
    const DaysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const [currentDate, setCurrentDate] = useState(new Date());

    const month = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate()

    function getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);

    function getFirstDayOfMonth(year, month) {
        return new Date(year, month, 1).getDay();
    }
    const FirstDay = getFirstDayOfMonth(currentYear, currentMonth);

    const firstDay = FirstDay === 0 ? 6 : FirstDay - 1;
    const days = [];
    for (let i = 0; i < firstDay; i++) {
        days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    const rows = [];
    for (let i = 0; i < days.length; i += 7) {
        rows.push(days.slice(i, i + 7))
    }

    function changeMonth(month) {
        const newDate = new Date(currentYear, currentMonth + month, 1);
        setCurrentDate(newDate);
    }
    const [modal, setModal] = useState(false);

    function handleClick() {
        setModal(!modal)
    }
    return (
        <div className="calendar">
            <Modal open={modal} setOpen={setModal}/>
            <div className='year'> {month[currentMonth]} {currentYear}</div>
            <div className='button'>
                <button onClick={() => changeMonth(-1)}>Назад</button>
                <button onClick={() => changeMonth(1)}>Вперед</button>
            </div>
            <table>
                <thead>
                <tr>
                    {DaysOfWeek.map((day, index) => (
                        <td key={index}>{day}</td>
                    ))}
                </tr>
                {rows.map(function (day, index) {
                    return (
                        <tr key={index} className='day'>
                            {day.map(function (item, index2) {
                                return (
                                    <td key={index2} className={item===currentDay ? 'currentDay' : ''} onClick={handleClick}>{item}</td>
                                )
                            })}
                        </tr>
                    )
                })}
                </thead>
            </table>
        </div>
    );
};

export default Calendar;