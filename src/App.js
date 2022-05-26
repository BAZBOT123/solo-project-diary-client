import './App.css';
import { Routes, Route } from "react-router-dom"
import { useState } from "react"
import AddNew from './components/AddNew'
import ViewDiary from './components/ViewDiary'
import Calendar from './components/Calendar'
import UpdateDiary from './components/UpdateDiary'
import Home from './components/Home'
import { useEffect } from 'react';


export default function App() {


  const [diary, setDiary] = useState([])
const [toggle, setToggle] = useState(false)
const [applyDate, setApplyDate] = useState(true)


const [date, setDate] = useState([
  {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
  }
]);

const start = date[0].startDate;
const end = date[0].endDate;

const dateRange = `?startDate=${start}&endDate=${end}`
let url = 'http://localhost:4000/diary' + dateRange;

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log("Loaded initial entries:", res)
        setDiary(res.diaries)
      })
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle, applyDate])

  return (
    <div className='main-page'>
      
      <main>
        <Routes>
          <Route path='/' element={< Home />} />
          <Route path='/diary/addnew' element={< AddNew diary={diary} setDiary={setDiary} />} />
          <Route path='/diary/:id' element={< ViewDiary setDiary={setDiary} diary={diary} />} />
          <Route path='/diary/calendar' element={< Calendar diary={diary} setDate={setDate} date={date} applyDate={applyDate} setApplyDate={setApplyDate}/>} />
          <Route path='/diary/:id/view' element={< UpdateDiary diary={diary} setDiary={setDiary} setToggle={setToggle} />} />
        </Routes>
      </main>
    </div>
  )
}


