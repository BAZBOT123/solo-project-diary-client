/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link, useNavigate } from "react-router-dom"
import './viewDiary.css'



export default function ViewDiary() {
    const [diary, setDiary] = useState(false)

    const params = useParams()
    console.log("hello", params)

    useEffect(() => {
        fetch(`http://localhost:4000/diary/${params.id}`)
            .then(res => res.json())
            .then(res => {
                console.log('Baz', res)
                setDiary(res.data)

            })
    }, [params])

    if (!diary) {
        return <p>Wait there a sec...</p>
    }

    console.log('Diary?', diary)

    return (
        <div className='view-main-page'>
            <header className='my-diary'>
                <h1 className='diary-font'><Link to='/'>MY DIARY...</Link></h1>
            </header>
            <main className='view-display'>
                <div className='diary-date-div'>
                <h2 className='view-diary-date'>{diary.createdAt.substring(0, 10)}</h2>
                </div>

                <div className='div-view-plan'>
                    <h3>What's your action plan?</h3>
                    <p>{diary.plan}</p>
                </div>

                <div className='div-affirm'>
                    <h3>Write some daily affirmations?</h3>
                    <p>{diary.affirmation}</p>
                </div>
                </main>
                <button className='edit-button'><Link to={`/diary/${diary.id}/edit`}>Edit</Link></button>

        </div>
    )
}