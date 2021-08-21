import CreateOrEdit from './components/CreateOrEdit';
import Header from './components/Header';
import List from './components/List';
import ErrorModal from './components/ErrorModal';
import Viewer from './components/Viewer';
import DeleteModal from './components/DeleteModal';
import './App.scss';
import { NIGHTMODE, 
  TOGGLEVIEWER, TOGGLECREATEEDIT, TOGGLEDELETEMODAL,
  TOGGLEERRORMODAL, SETTOGGLEERRORMODAL, SETTOGGLEDELETEMODAL, 
  SETTOGGLEVIEWER, SETTOGGLECREATEEDIT, HTTPRES, RESPONSIVE } from './redux/Store.js';


const App = () => {

  const response = RESPONSIVE();

  const createToggle = TOGGLECREATEEDIT();
  const viewerToggle = TOGGLEVIEWER();

  const invoiceSwitch = () => {
    return createToggle ? <CreateOrEdit />
      : viewerToggle ? <Viewer /> : <List /> 
  }

  return (
    <div className={`${NIGHTMODE() ? 'night-mode' 
      : 'day-mode'} window-height w-100  h-100 position-relative`}>
      {TOGGLEERRORMODAL() && <ErrorModal />}
      {TOGGLEDELETEMODAL() && <DeleteModal />}
      <div className="d-flex flex-column flex-xl-row">
        <Header />
        <div className="w-100 h-100 position-relative">
          {TOGGLECREATEEDIT() && 
            <div className="background-createoredit-filler"></div>
          }
          {TOGGLECREATEEDIT() && <CreateOrEdit />}
          {TOGGLEVIEWER() ? <Viewer /> : <List />}
        </div>
      </div>
    </div>
  )
}

export default App