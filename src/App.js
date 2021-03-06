import CreateOrEdit from './components/CreateOrEdit';
import Header from './components/Header';
import List_Main from './components/List_Main';
import ErrorModal from './components/ErrorModal';
import Viewer from './components/Viewer';
import DeleteModal from './components/DeleteModal';
import './App.scss';
import { NIGHTMODE, 
  TOGGLEVIEWER, TOGGLECREATEEDIT, TOGGLEDELETEMODAL,
  TOGGLEERRORMODAL, SETTOGGLECREATEEDIT, RESPONSIVE } from './redux/Store.js';


const App = () => {

  

  const response = RESPONSIVE();

  const createToggle = TOGGLECREATEEDIT();
  const viewerToggle = TOGGLEVIEWER();
  const errorToggle = TOGGLEERRORMODAL();
  const deleteToggle = TOGGLEDELETEMODAL();

  const bodyScroller = document.body;



  if (createToggle && response !== 'mobile') {
    window.scrollTo(0, 0);
    bodyScroller.style.overflow = 'hidden';
  } else bodyScroller.style.overflow = 'auto';

  return (
    <div className={`${NIGHTMODE() ? 'night-mode' 
      : 'day-mode'} window-height w-100 h-100 position-relative`}>
      {errorToggle && <ErrorModal />}
      {deleteToggle && <DeleteModal />}
      {deleteToggle && <div className="modal-trans-background"></div>}
      {errorToggle && response === 'mobile' && createToggle 
        ? <div className="modal-mobile-createoredit-background"></div>
        : errorToggle ? <div className="modal-trans-background"></div>
        : ``
      }
      <div className="d-flex flex-column flex-xl-row position-relative w-100">
        <Header /> 
        <div className="d-flex w-100">
          {createToggle && <CreateOrEdit />}
          {createToggle && 
            <div onClick ={() => SETTOGGLECREATEEDIT(false)}
              className="createoredit-trans-background">
            </div>
          }
          <div className="app-container">
            {viewerToggle ? <Viewer /> : <List_Main />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App