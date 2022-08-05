import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Includes/Header'
import Menu from './Components/Includes/Menu'
import Footer from './Components/Includes/Footer'
import PageNotFound from './Components/Includes/PageNotFound'
import Home from './Components/Pages/Home';
import AddEvent from './Components/Pages/AddEvent';
import AddNotes from './Components/Pages/AddNotes';
import MyNotes from './Components/Pages/MyNotes';
import MyEvents from './Components/Pages/MyEvents';
import Login from './Components/Auth/Login';
import Auth from './Auth';
import UserData from './Components/Context/UserData';
import ViewNotes from './Components/Pages/ViewNotes';
function App() {
  return (
    <>
      <UserData>
        <BrowserRouter>
          <div class="wrapper">
            <Header />
            <Menu />
            <Routes>
              <Route exact path="/" element={<Auth Com={Home} />} />
              <Route exact path="/login" element={< Login />} />
              <Route exact path="/add-event" element={<Auth Com={AddEvent} />} />
              <Route exact path="/add-notes" element={<Auth Com={AddNotes} />} />
              <Route exact path="/my-notes" element={<Auth Com={MyNotes} />} />
              <Route exact path="/my-events" element={<Auth Com={MyEvents} />} />
              <Route exact path="/view-notes/:id" element={<Auth Com={ViewNotes} />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </UserData>

    </>
  );
}

export default App;
