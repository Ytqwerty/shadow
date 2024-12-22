import React from 'react';
import './Event.css'


const Event = (props) => {

    return (
        <div className='event'>
            <div>{props.information.map(function (item, index) {
                return (
                    <div key={index} className='event_content'>
                        <div className='event_day'>{item.day}</div>
                        <div className='event_month'>{item.month}</div>
                        <div className='event_text'>{item.text}</div>
                    </div>
                )
            })}</div>
        </div>
    );
};

export default Event;