import CreateOrEdit from './components/CreateOrEdit';
import Header from './components/Header';
import List from './components/List';
import Viewer from './components/Viewer';
import './App.scss';
import { nightMode, toggleFilter, setToggleFilter } from './redux/Store.js';
import { Switch, Route, Redirect } from 'react-router-dom';

const App = () => {

  const filterToggled = toggleFilter();

  return (
    <div onClick={() => filterToggled && setToggleFilter()}
      className={`${nightMode() ? 'night-mode' : 'day-mode'} window-height`}>
      <div className="d-flex flex-column flex-xl-row">
        <Header />
        <List />
      </div>
    </div>
  )
}

export default App