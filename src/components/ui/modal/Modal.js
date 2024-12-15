import React from 'react';
import './Modal.css'

const Modal = (props) => {

    return (
        <div className={props.open ? 'active_modal' : 'modal'} onClick={() => props.setOpen(false)}>
            <div className='modal_content' onClick={function (event) {
                event.stopPropagation();
            }}>
                <div>{props.selectedDay && <div>Дата: {props.currentMonth} {props.selectedDay}</div>}</div>
                <div><input/></div>
                <button onClick={() => props.setOpen(false)}>Добавить Событие</button>
            </div>
        </div>
    );
};

export default Modal;