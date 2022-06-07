/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import './home.css'



export default function Home() {

  const [quote, setQuote] = useState([])
  const [counter, setCounter] = useState(0)
  const navigate = useNavigate();

  const date = new Date()
  const weekday = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]
  let day = weekday[date.getDay()]
  const quotes = process.env.REACT_APP_QUOTES_URL


  useEffect(() => {
    fetch(quotes)
      .then(res => res.json())
      .then(res => {
        setQuote(res[randomNum()].text)
      })
  }, [counter])

  function randomNum() {
    return Math.floor(1 + Math.random() * 100)
  }
 
  function logout(){
    localStorage.removeItem('jwt')
    navigate('/')
  }
  return (
    <nav className='centre-nav'>

      <header className='my-diary'>
        <h1 className='diary-font'><Link to='/'>MY DIARY...</Link></h1>
      </header>

      <ul className='main-menu'>

        <div className='div-write'>
          <li><Link to='/diary/addnew'>
            <p className='write-font'>Write New</p></Link></li>
        </div>

        <li><Link to={`/diary/calendar`}><div className="img-cal">
          <p className='cal-day'>{day}</p>
          <p className='cal-num'>{date.getDate()}</p>
        </div></Link></li>

        <button className='logout' onClick={ logout }>Logout</button>
        <div className='div-quote'>
          <p className='main-quote'>"{quote}"</p>
        </div>
        
      </ul>
    </nav>
  )
}