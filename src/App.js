import './App.css';
import { Routes, Route } from "react-router-dom"
import { useState } from "react"
import AddNew from './components/AddNew'
import ViewDiary from './components/ViewDiary'
import Calendar from './components/Calendar'
import Home from './components/Home'
import { useEffect } from 'react';

export default function App() {

  const [diary, setDiary] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/diary')
      .then(res => res.json())
      .then(res => {
        console.log("Barry", res)
        setDiary(res)
      })
  }, [])

  // console.log("Help", diary[diary.length-1].id)

  return (
    <div className='main-page'>
      
      <main>
        <Routes>
          <Route path='/' element={< Home />} />
          <Route path='/diary/addnew' element={< AddNew diary={diary} setDiary={setDiary} />} />
          <Route path='/diary/:id' element={< ViewDiary />} />
          <Route path='/diary/calendar' element={< Calendar diary={diary} />} />
        </Routes>
      </main>
    </div>



  )
}


