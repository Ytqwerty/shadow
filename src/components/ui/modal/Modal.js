import './Modal.css'
import {useState} from "react";

const Modal = (props) => {
    const[inputValue,setInputValue] = useState('')
    function OnChange_information(event) {
            setInputValue(event.target.value)
    }
    function addEvent () {
        props.setInformation(function(prev) {
            let newState = [...prev];
            let obj = {
                day:props.selectedDay,
                month:props.currentMonth,
                text:inputValue
            }
            newState.push(obj)
            return newState
        })
        props.setOpen(false)
        setInputValue('')
    }
    return (
        <div className={props.open ? 'active_modal' : 'modal'} onClick={() => props.setOpen(false)}>
            <div className='modal_content' onClick={function (event) {
                event.stopPropagation();
            }}>
                <div>{props.selectedDay && <div>Дата: {props.currentMonth} {props.selectedDay}</div>}</div>
                <div><input placeholder='Введите событие' value={inputValue} onChange={OnChange_information}/></div>
                <button onClick={addEvent}>Добавить cобытие</button>
            </div>
        </div>
    );
};

export default Modal;