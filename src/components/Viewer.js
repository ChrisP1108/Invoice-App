import { invoice, setInvoice, deleteInvoice, 
    setToggleViewer } from '../redux/Store.js';

const Viewer = () => {

    const viewInvoice = invoice();
    console.log(viewInvoice);

    const backHeader = () => {
        return (
            <div onClick={() => setToggleViewer()} 
                className="back-container pointer">
                <div className="back-arrow"></div>
                <div className="d-flex">
                    <h3>Go back</h3>
                </div>
                <div className="back-container-filler"></div>
            </div>
        )
    }

    return (
        <div id="viewer">
            <div className="viewer-container">
                {backHeader()}          
            </div>
        </div>
    )
}

export default Viewer
