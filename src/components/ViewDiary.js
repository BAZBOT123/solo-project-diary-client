/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link, useNavigate } from "react-router-dom"
import './viewDiary.css'



export default function ViewDiary({setDiary, diary}) {

const [newDiary, setNewDiary] = useState(null)

    const params = useParams()
    const id = params.id

    console.log("hello", params)

    useEffect(() => {
        fetch(`http://localhost:4000/diary/${id}`)
            .then(res => res.json())
            .then(res => {
                console.log('Baz', res)
                setNewDiary(res.data)

            })
    }, [id])

    let navigate = useNavigate()
    
    function deleteItem(){
        const options = {

            method: 'DELETE'
    
            //A DELETE request has no request body - using REST, we identify we resource
            //we want to delete via the URL. So we don't need to specify the other options
            //here
        }
        // eslint-disable-next-line eqeqeq
        setDiary(preVal => preVal.filter(diary => diary.id != id))
        //The URL in this case means to delete the delete.id
    
        fetch(`http://localhost:4000/diary/${id}`, options)
            .then(response => response.json())
            .then(response => {
                //log it out.
                console.log("Diary deleted", response)
                navigate('/')
            })
    }


    if (!newDiary) {
        return <p>Wait there a sec...</p>
    }

    console.log('Diary?', newDiary)



    return (
        <div className='view-main-page'>
            <header className='my-diary'>
                <h1 className='diary-font'><Link to='/'>MY DIARY...</Link></h1>
            </header>
            
                <div className='diary-date-div'>
                <h2 className='view-diary-date'>{newDiary.createdAt.substring(0, 10)}</h2>
                </div>
                <main className='view-display'>
                <div className='div-view-plan'>
                    <h3>Your action plan:</h3>
                    <p>{newDiary.plan}</p>
                </div>

                <div className='div-view-affirm'>
                    <h3>Your daily affirmations:</h3>
                    <p>{newDiary.affirmation}</p>
                </div>
                </main>
                <div className='view-edit-button'>
                <button onClick={ deleteItem } className='delete-button'>Delete</button>
                <Link to={`/diary/${newDiary.id}/view`}><button className='edit-button'>Edit</button></Link>
                </div>
        </div>
    )
}