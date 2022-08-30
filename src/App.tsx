import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './index.css'
import { AddUser, EditUser, Home, Users } from './pages'

function App() {
   return (
      <Routes>
         <Route path='/' element={<Home />} />
         <Route path='/users' element={<Users />} />
         <Route path='/users/add' element={<AddUser />} />
         <Route path='/users/:userId/edit' element={<EditUser />} />
         <Route path='*' element={<div>404</div>} />
      </Routes>
   )
}

export default App
