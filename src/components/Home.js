/* eslint-disable no-unused-vars */
import { Link, } from "react-router-dom"
import { useEffect, useState } from 'react'
import './home.css'


export default function Home() {

  const [quote, setQuote] = useState([])
  const [counter, setCounter] = useState(0)

  const date = new Date()
  const weekday = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]
  let day = weekday[date.getDay()]

  useEffect(() => {
    fetch('https://type.fit/api/quotes')
      .then(res => res.json())
      .then(res => {
        // console.log("Apple", res)
        setQuote(res[randomNum()].text)
        // console.log('JR', res[randomNum()].text)
      })
  }, [counter])

  function randomNum() {
    return Math.floor(1 + Math.random() * 100)
  }
  // console.log("ch", randomNum())
  // console.log('JR', quote[randomNum()])
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

        <div className='div-quote'>
        <p className='main-quote'>"{quote}"</p>
        </div>
      </ul>
    </nav>
  )
}