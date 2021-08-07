import CreateOrEdit from './components/CreateOrEdit';
import Header from './components/Header';
import List from './components/List';
import Viewer from './components/Viewer';
import './App.scss';
import { nightMode, toggleFilter, setToggleFilter, 
  invoice, setInvoice, toggleCreate } from './redux/Store.js';
import { Switch, Route, Redirect } from 'react-router-dom';

const App = () => {

  const invoiceSelected = invoice();
  const createToggle = toggleCreate();

  const invoiceSwitch = () => {
    return createToggle ? <CreateOrEdit />
      : invoiceSelected == '' ? <List /> : <Viewer />
  }

  return (
    <div className={`${nightMode() ? 'night-mode' : 'day-mode'} window-height`}>
      <div className="d-flex flex-column flex-xl-row">
        <Header />
        {invoiceSwitch()}
      </div>
    </div>
  )
}

export default App