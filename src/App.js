import CreateOrEdit from './components/CreateOrEdit';
import Header from './components/Header';
import List from './components/List';
import ErrorModal from './components/ErrorModal';
import Formatter from './components/List';
import Viewer from './components/Viewer';
import DeleteModal from './components/DeleteModal';
import './App.scss';
import { INITINVOICES, INVOICELIST, NIGHTMODE, 
  TOGGLEVIEWER, TOGGLECREATEEDIT, TOGGLEDELETEMODAL,
  TOGGLEERRORMODAL, SETTOGGLEERRORMODAL, SETTOGGLEDELETEMODAL, 
  SETTOGGLEVIEWER, SETTOGGLECREATEEDIT, HTTPRES } from './redux/Store.js';
import { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const App = () => {

  const createToggle = TOGGLECREATEEDIT();
  const viewerToggle = TOGGLEVIEWER();

  const invoiceSwitch = () => {
    return createToggle ? <CreateOrEdit />
      : viewerToggle ? <Viewer /> : <List /> 
  }

  return (
    <div className={`${NIGHTMODE() ? 'night-mode' : 'day-mode'} window-height position-relative`}>
      {TOGGLEERRORMODAL() && <ErrorModal />}
      {TOGGLEDELETEMODAL() && <DeleteModal />}
      <div className="d-flex flex-column flex-xl-row">
        <Header />
        <div className="w-100">
          {invoiceSwitch()}
        </div>
      </div>
    </div>
  )
}

export default App