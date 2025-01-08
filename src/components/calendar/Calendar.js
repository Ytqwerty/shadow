import React, {useState, useEffect} from 'react';
import './Calendar.css';
import Modal from "../ui/modal/Modal";
import Event from "../event/Event";

const Calendar = () => {

    const DaysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const [currentDate, setCurrentDate] = useState(new Date());
    const month = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate()
    const [modal, setModal] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [information, setInformation] = useState([])
    const today = new Date();

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
    const [rows, setRows] = useState([]);
    useEffect(() => {
        const newRows = [];
        for (let i = 0; i < days.length; i += 7) {
            newRows.push(days.slice(i, i + 7));
        }
        setRows(newRows);
    }, [currentDate]);

    function changeMonth(month) {
        const newDate = new Date(currentYear, currentMonth + month, 1);
        setCurrentDate(newDate);
        setSelectedDay(null);
        setRows([]);
    }

    function handleClick(day) {
        const selectedDate = new Date(currentYear, currentMonth, day);
        if (selectedDate <= today) {
            return
        }
        setSelectedDay(day);
        setModal(true);
    }

    let arrayDays = information.map(item => item.day);
    console.log(arrayDays);

    const [currentNumber, setCurrentNumber] = useState(null);

    function dragStartHandler(e, item) {
        setCurrentNumber(item);
    }

    function dragEndHandler(e) {
        e.target.style.background = 'white';
    }
    const [hoverTimeout, setHoverTimeout] = useState(null);

    function dragOverHandler() {
        if (!hoverTimeout && arrayDays.includes(currentNumber)) {
            setHoverTimeout(setTimeout(() => {
                changeMonth(1);
            }, 1000));
        }
    }
    function dragLeaveHandler() {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            setHoverTimeout(null);
        }
    }
    console.log(information)

    function dropHandler(e, item) {
        e.preventDefault();
        const selectedDate = new Date(currentYear, currentMonth, item);
        if (selectedDate < today) {
            return;
        }
        if (currentNumber === item) {
            return;
        }
        const updatedInformation = [...information];
        for (let i = 0; i < updatedInformation.length; i++) {
            if (updatedInformation[i].day === currentNumber) {
                updatedInformation[i].day = item;
                updatedInformation[i].month = month[currentMonth];  // Обновляем месяц
                updatedInformation[i].year = currentYear

            }
        }
        setInformation(updatedInformation);
        e.target.style.background = 'white';
    }
    console.log(information)
    return (
        <div className="calendar">
            <div className='left'>
                <Modal open={modal} setOpen={setModal} selectedDay={selectedDay} currentMonth={month[currentMonth]}
                       information={information} setInformation={setInformation}/>
                <div className='year'> {month[currentMonth]} {currentYear}</div>
                <div className='button'>
                    <button onClick={() => changeMonth(-1)}>Назад</button>
                    <button onClick={() => changeMonth(1)}
                            onDragOver={dragOverHandler}
                            onDragLeave={dragLeaveHandler}>Вперед
                    </button>
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
                                        <td key={index2}
                                            draggable={true}
                                            onDragStart={(e) => dragStartHandler(e, item)}
                                            onDragEnd={(e) => dragEndHandler(e)}
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={(e) => dropHandler(e, item)}
                                            className={item === today.getDate()
                                            && currentMonth === today.getMonth()
                                            && currentYear === today.getFullYear() ? 'currentDay' :
                                                information.some(info => info.day === item && info.month === month[currentMonth]) ? 'selectedDay' : ''}
                                            onClick={() => handleClick(item)}>{item}</td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                    </thead>
                </table>
            </div>
            <div className='right'>
                <Event information={information} month={month[currentMonth]}/>
            </div>
        </div>
    );
};

export default Calendar;