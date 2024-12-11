import React, {useState} from 'react';
import './Calendar.css'

const Calendar = () => {
    const DaysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const [currentDate, setCurrentDate] = useState(new Date());

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

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

    return (
        <div className="calendar">
            <div>
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
                {days.map(function(day,index) {
                    return(
                        <div key={index}>{day}</div>
                    )
                })}
                </thead>
            </table>
        </div>
    );
};

export default Calendar;