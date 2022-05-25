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
            
                <div className='diary-date-div'>
                <h2 className='view-diary-date'>{diary.createdAt.substring(0, 10)}</h2>
                </div>
                <main className='view-display'>
                <div className='div-view-plan'>
                    <h3>Your action plan:</h3>
                    <p>{diary.plan}</p>
                </div>

                <div className='div-view-affirm'>
                    <h3>Your daily affirmations:</h3>
                    <p>{diary.affirmation}</p>
                </div>
                </main>
                <div className='view-edit-button'>
                <Link to={`/diary/${diary.id}/edit`}><button className='edit-button'>Edit</button></Link>
                </div>
        </div>
    )
}