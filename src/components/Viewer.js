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

    const statusContainer = () => {
        return (
            <div className="viewer-status-outer-container">
                <div className="viewer-status-inner-container">
                    <div className="f-ca">
                        <h2>Status</h2>
                        <div className={`payment-button-${viewInvoice.status} f-c payment-button-container`}>
                            <div className="payment-status f-c">
                                <div className={`dot-${viewInvoice.status} payment-dot`}></div>
                                <h5>{viewInvoice.status === 'paid' ? `Paid` : viewInvoice.status === 'pending' ? `Pending` : `Draft`}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const mainContainer = () => {
        return (
            <div className="viewer-main-outer-container">
                <div className="viewer-main-inner-container">
                    <div className="viewer-main-left-column-container">
                        <div className="viewer-main-id-subscription-container">
                            <h3><span>#</span>{viewInvoice.id}</h3>
                            <h2>{viewInvoice.description}</h2>
                        </div>
                        <div className="viewer-main-address-container">
                            <h6>{viewInvoice.senderAddress.street}</h6>
                            <h6>{viewInvoice.senderAddress.city}</h6>
                            <h6>{viewInvoice.senderAddress.postCode}</h6>
                            <h6>{viewInvoice.senderAddress.country}</h6>
                        </div>
                        <div className="viewer-main-invoice-container f-clb">
                            <h2>Invoice Date</h2>
                            <p>{viewInvoice.createdAt}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div id="viewer">
            <div className="viewer-container">
                {backHeader()}     
                {statusContainer()}   
                {mainContainer()}  
            </div>
        </div>
    )
}

export default Viewer
