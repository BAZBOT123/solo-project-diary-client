import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"


function UpdateDiary(props) {
    const today = Date()
    let navigate = useNavigate()
    const params = useParams()

    const [pageData, setFormData] = useState({
        plan: '',
        affirmation: ''
    })

    useEffect(() => {
        fetch(`http://localhost:4000/diary/${params.id}`)
            .then(response => response.json())
            .then(response => {
                console.log("response:", response)
                setFormData(response.data)
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { setDiary, setToggle } = props

    function handleChange(event) {
        const { name, value } = event.target
        setFormData(preVal => {
            return { ...preVal, [name]: value }
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log("this is formData:", pageData)

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pageData)
        }

        fetch(`http://localhost:4000/diary/${params.id}`, options)
            .then(response => response.json())
            .then(response => {
                console.log("Check data:", response.data)
                setDiary(preVal => preVal.map(diary => diary.id === params.id ? response.data : diary))
                setToggle(toggle => !toggle)
                setFormData({
                    plan: '',
                    affirmation: ''
                })
                navigate('/')
            })
    }

    return (
        <form onSubmit={handleSubmit}
            className='data-input'>
            <header className='my-diary'>
                <h1 className='diary-font2'><Link to='/'>MY DIARY...</Link></h1>
            </header>
            <div className='form-display'>
                <h2>Write New</h2>

                <div className='main-date'>
                    <h3>{today.slice(0, 15)}</h3>
                </div>

                <div className='question-two'>
                    <label htmlFor='plan'> What's your action plan?</label>
                    <br />
                    <textarea rows='7' id='plan' placeholder="Write your plan here" name='plan'
                        onChange={handleChange} value={pageData.plan} required />
                </div>

                <div className='question-three'>
                    <label htmlFor='affirmation'> Write some daily affirmations?</label>
                    <br />
                    <textarea rows='3' id='affirmation' placeholder="Write your plan here" name='affirmation'
                        onChange={handleChange} value={pageData.affirmation} required />
                </div>

                <div className="actions-section">
                    <button className="button" type="submit">
                        Add
                    </button>
                </div>
            </div>
        </form>
    )
}

export default UpdateDiary