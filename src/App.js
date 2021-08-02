import CreateOrEdit from './components/CreateOrEdit';
import Header from './components/Header';
import List from './components/List';
import Viewer from './components/Viewer';
import './App.scss';
import { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const App = () => {

  return (
    <div>
      <Viewer />
    </div>
  )
}

export default App