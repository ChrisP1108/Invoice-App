import { SETTOGGLEERRORMODAL, TOGGLECREATEEDIT, 
    RESPONSIVE } from '../redux/Store.js';

const ErrorModal = () => {

    const response = RESPONSIVE();
    const createoredit = TOGGLECREATEEDIT();

    return (
        <div id="errorModal" className="d-flex" 
            style={{ top: response === 'mobile' && createoredit ? '133%' : '50%'}}>
            <div className="error-modal-page-container f-c error-fill-transition">
                <div className="error-modal-outer-container error-modal-transition">
                    <div className="error-modal-inner-container">
                        <h1>Error</h1>
                        <div className="error-modal-content-spacing">
                            <h2>This is a demo version.  Changes cannot be saved.</h2>
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
