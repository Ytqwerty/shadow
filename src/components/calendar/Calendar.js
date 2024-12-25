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

    const [currentNumber, setCurrentNumber] = useState(null);

    function dragStartHandler(e, item) {
        setCurrentNumber(item);
    }

    function dragEndHandler(e) {
        e.target.style.background = 'white';
    }

    function dragOverHandler(e) {
        e.preventDefault();
        e.target.style.background = 'lightgray';
    }

    function dropHandler(e, item) {
        e.preventDefault();
        let currentNum = ''
        let firstIndex = null;
        let secondIndex = null;
        const newRows = [...rows]
        for (let i = 0; i < newRows.length; i++) {
            for (let j = 0; j < newRows[i].length; j++) {
                if (newRows[i][j] === currentNumber) {
                    firstIndex = { i: i, j: j };
                }
                if (newRows[i][j] === item) {
                    secondIndex = {i: i, j: j };
                }
            }
        }
        if (firstIndex && secondIndex) {
            currentNum = newRows[firstIndex.i][firstIndex.j];
            newRows[firstIndex.i][firstIndex.j] = newRows[secondIndex.i][secondIndex.j];
            newRows[secondIndex.i][secondIndex.j] = currentNum;
        }
        setRows(newRows);
    }

    return (
        <div className="calendar">
            <div className='left'>
                <Modal open={modal} setOpen={setModal} selectedDay={selectedDay} currentMonth={month[currentMonth]}
                       information={information} setInformation={setInformation}/>
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
                                        <td key={index2}
                                            draggable={true}
                                            onDragStart={(e) => dragStartHandler(e, item)}
                                            onDragEnd={(e) => dragEndHandler(e)}
                                            onDragOver={(e) => dragOverHandler(e)}
                                            onDrop={(e) => dropHandler(e, item)}
                                            className={item === today.getDate()
                                            && currentMonth === today.getMonth()
                                            && currentYear === today.getFullYear() ? 'currentDay' : arrayDays.includes(item) ? 'selectedDay' : ''}
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