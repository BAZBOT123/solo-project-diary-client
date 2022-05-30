/* eslint-disable no-unused-vars */
import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { addDays, closestIndexTo } from 'date-fns';
import { DateRange } from 'react-date-range'
import './calendar.css'

function Calendar(props) {

    //"contacts" must be passed as prop to this component
    const { diary, date, setDate, applyDate, setApplyDate } = props
    console.log('diary list:', diary)
    console.log('check state:', date)

    return (
        <div className='calendar-main'>

            <header className='my-diary'>

                <h1 className='diary-font'><Link to='/'>MY DIARY...</Link></h1>
            </header>
            <h2 className='calendar-text'>Choose your diary entry dates, treacle:</h2>
            <div className='calendar-display'>
                <DateRange
                    editableDateInputs={true}
                    onChange={item => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                />
                <button className='apply-button' onClick={() => setApplyDate(!applyDate)}> Apply </button>
            </div>
            <ul className="diary-list">

                {diary.map((entry, index) => {
                    // console.log("Hello", entry)
                    const { plan, createdAt, id } = entry
                    console.log("created:", createdAt)

                    return (
                        <Link to={`/diary/${id}`}><li className="diary" key={index}>
                            <p>
                                {createdAt.substring(0, 10)}                
                            </p>
                            <p>
                                {plan}
                            </p>
                        </li></Link>
                    )
                })}
            </ul>
        </div>
    )
}






export default Calendar