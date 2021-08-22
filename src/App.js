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
  const errorToggle = TOGGLEERRORMODAL();
  const deleteToggle = TOGGLEDELETEMODAL();

  const invoiceSwitch = () => {
    return createToggle ? <CreateOrEdit />
      : viewerToggle ? <Viewer /> : <List /> 
  }

  const bodyScroller = document.body;

  if (createToggle && response !== 'mobile') {
    window.scrollTo(0, 0);
    bodyScroller.style.overflow = 'hidden';
  } else bodyScroller.style.overflow = 'auto';

  return (
    <div className={`${NIGHTMODE() ? 'night-mode' 
      : 'day-mode'} window-height w-100  h-100 position-relative`}>
      {errorToggle && <ErrorModal />}
      {deleteToggle && <DeleteModal />}
      {deleteToggle && <div className="modal-trans-background"></div>}
      {errorToggle && <div className="modal-trans-background"></div>}
      <div className="d-flex flex-column flex-xl-row position-relative">
        <Header />
        <div className="w-100 h-100 position-relative">
          {createToggle && 
            <div onClick={() => SETTOGGLECREATEEDIT(false)}
              className="trans-background"></div>
          }
          {createToggle && <CreateOrEdit />}
          {viewerToggle ? <Viewer /> : <List />}
        </div>
      </div>
    </div>
  )
}

export default App