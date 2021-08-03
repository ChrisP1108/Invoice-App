import CreateOrEdit from './components/CreateOrEdit';
import Header from './components/Header';
import List from './components/List';
import Viewer from './components/Viewer';
import './App.scss';
import { nightMode } from './redux/Store.js';
import { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const App = () => {

  return (
    <div className={nightMode() ? 'night-mode' : 'day-mode'}>
      <div className="d-flex flex-column flex-xl-row">
        <Header />
        <Viewer />
      </div>
    </div>
  )
}

export default App