import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import VacationList from './components/VacationList'
import NewVacation from './components/NewVacation'
import Reports from './components/Reports';

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Route path="/" exact component={Login} />
        <Route path="/home" exact component={VacationList} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/add" component={NewVacation} />
        <Route path="/reports" component={Reports} />

      </div>
    </BrowserRouter>
  )
}
