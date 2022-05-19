/* eslint-disable no-unused-vars */
import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

function Calendar(props) {

    //"contacts" must be passed as prop to this component
    const { diary } = props

    console.log('diary list:', diary)

    return (
        <>
            <header className='my-diary'>
                <h1 className='diary-font2'><Link to='/'>MY DIARY...</Link></h1>
            </header>
            <ul className="diary-list">
                {diary.map((entry, index) => {
                    // console.log("Mike", entry)
                    const { plan, affirmation, createdAt, id } = entry
                    console.log("created:", createdAt)
                    return (
                        <li className="diary" key={index}>
                            <p>
                                {plan}
                            </p>
                            <p>
                                <Link to={`/diary/${id}`}>{createdAt.subString(0, 10)}</Link>
                                <br />
                                {/* <Link to={`/diary/${diary.id}/update`}>Edit</Link>
                <br />
                <Link to={`/diary/${diary.id}/delete`}>Delete</Link> */}
                            </p>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default Calendar