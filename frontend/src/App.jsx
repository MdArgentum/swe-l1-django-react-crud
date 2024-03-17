import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import AddContact from './pages/AddContact'
import Navbar from './components/Navbar'
import UpdateContact from './pages/UpdateContact'
import SingleContactView from './pages/SingleContactView'



function App() {


  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/add-contact' element={<AddContact/>}/>
          <Route path="/update-contact/:id" element={<UpdateContact/>}/>
          <Route path='/contact/:id' element={<SingleContactView/>}/>
        </Routes>
      </Router>
    </> 
  )
}

export default App
