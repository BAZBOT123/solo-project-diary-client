import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import './addNew.css'

function AddNew(props) {
    const today = Date()
    const { setDiary, diary } = props
    let navigate = useNavigate()

    const [pageData, setPageData] = useState({
        plan: '',
        affirmation: '',
    })

    function handleChange(event) {
        const { name, value } = event.target
        setPageData(preVal => {
            return { ...preVal, [name]: value }
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
            body: JSON.stringify(pageData)
        }

        fetch('http://localhost:4000/diary/1', options)
            .then(res => res.json())
            .then(res => {
                console.log("this is diary", diary)
                console.log("this is res", res)
                setDiary([...diary, res.data])
                setPageData({
                    plan: '',
                    affirmation: ''
                })
                navigate('/diary/calendar')
            })
    }
    console.log("check pagedata:", pageData)
    return (
        <main className="add-new-page">
            <form className='data-input'
                onSubmit={handleSubmit}>
                <header className='my-diary-div'><i className="fa-light fa-face-awesome"></i>
                    <h1 className='diary-font'><Link to='/home'>MY DIARY...</Link></h1>
                </header>

                <main className='add-form-display'>
                    <div className='post-display'>
                        <div className='main-date'>
                            <h3>{today.slice(0, 15)}</h3>
                        </div>

                        <div className='question-one'>
                            <label htmlFor='plan'> What's your action plan?</label>
                            <br />
                            <textarea rows='7' id='plan' placeholder="Write your plan here" name='plan'
                                onChange={handleChange} value={pageData.plan} required />
                        </div>

                        <div className='question-two'>
                            <label htmlFor='affirmation'> Write some daily affirmations?</label>
                            <br />
                            <textarea rows='3' id='affirmation' placeholder="Write your action here" name='affirmation'
                                onChange={handleChange} value={pageData.affirmation} required />
                        </div>

                        <div className="actions-section">
                            <button className="post-button" type="submit">
                                Post
                            </button>
                        </div>
                    </div>
                </main>
            </form>
        </main>

    )
}

export default AddNew