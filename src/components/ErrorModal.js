import { SETTOGGLEERRORMODAL, TOGGLEVIEWER, 
    TOGGLECREATEEDIT } from '../redux/Store.js';

const ErrorModal = () => {

    return (
        <div id="errorModal" className="d-flex align-items-stretch">
            <div className={`${TOGGLEVIEWER() && !TOGGLECREATEEDIT()? `error-modal-page-container-viewer` 
                : `error-modal-page-container-createoredit`} f-c error-fill-transition`}>
                <div className="error-modal-outer-container error-modal-transition">
                    <div className="error-modal-inner-container">
                        <h1>Error</h1>
                        <div className="error-modal-content-spacing">
                            <h2>Your changes were not able to be saved.  Please 
                            try again.</h2>
                        </div>
                        <div className="f-ae">
                            <div onClick={() => SETTOGGLEERRORMODAL(false)}
                                className="error-modal-ok-button-container f-c pointer">
                                <h3>Ok</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    )
}

export default ErrorModal
