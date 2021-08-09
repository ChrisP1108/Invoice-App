import { useState } from 'react';
import { invoice, 
    markPaidInvoice, setToggleDeleteModal, 
    setToggleViewer, setToggleCreate } from '../redux/Store.js';

const Viewer = () => {

    const [viewInvoice, setViewInvoice] = useState(invoice());

    const markPaid = () => {
        if (viewInvoice.status !== 'paid') {
            setViewInvoice({...viewInvoice, status: 'paid'})
            markPaidInvoice(viewInvoice.id);
        }       
    }

    const backHeader = () => {
        return (
            <div onClick={() => setToggleViewer()} 
                className="back-container pointer position-relative">
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

    let grandTotal = 0;

    const priceItemsMapping = viewInvoice.items.map(item => {

        const calculateItemTotal = (item) => {
            const numberTotal = (item.quantity * item.price);
            grandTotal = grandTotal + numberTotal;
            const total = `£ ${numberTotal.toFixed(2)}`;
            return total;
        }
        return (
            <div key={item.name} className="viewer-main-pricing-item-container f-sb">
                <div className="f-clb">
                    <h3>{item.name}</h3>
                    <h3><span>{`${item.quantity} x £ ${item.price.toFixed(2)}`}</span></h3>
                </div>
                <div className="f-c">
                    <h3>{calculateItemTotal(item)}</h3>
                </div>
            </div> 
        );
    });

    const mainContainer = () => {
        return (
            <div className="viewer-main-outer-container">
                <div className="viewer-main-inner-container">
                    <div className="viewer-main-full-span-container f-ca">
                        <div className="viewer-main-left-column-container">
                            <div className="viewer-main-id-subscription-container f-clb">
                                <h3><span>#</span>{viewInvoice.id}</h3>
                                <h2>{viewInvoice.description}</h2>
                            </div>
                            <div className="viewer-main-address-container f-clb">
                                <h6>{viewInvoice.senderAddress.street}</h6>
                                <h6>{viewInvoice.senderAddress.city}</h6>
                                <h6>{viewInvoice.senderAddress.postCode}</h6>
                                <h6>{viewInvoice.senderAddress.country}</h6>
                            </div>
                        </div>
                        <div className="viewer-main-right-column-container"></div>
                    </div>
                    <div className="viewer-main-full-span-container f-ca">
                        <div className="viewer-main-left-column-container">   
                            <div className="viewer-main-invoice-container f-clb">
                                <h2>Invoice Date</h2>
                                <p>{viewInvoice.createdAt}</p>
                            </div>
                            <div className="viewer-main-due-container f-clb">
                                <h2>Payment Due</h2>
                                <p>{viewInvoice.paymentDue}</p>
                            </div>
                        </div>
                        <div className="viewer-main-right-column-container">
                            <div className="viewer-main-bill-container f-clb">
                                <h2>Bill To</h2>
                                <p>{viewInvoice.clientName}</p>
                            </div>
                            <div className="viewer-main-bill-address-outer-container">
                                <div className="viewer-main-bill-address-inner-container f-sb flex-column">
                                    <h6>{viewInvoice.clientAddress.street}</h6>
                                    <h6>{viewInvoice.clientAddress.city}</h6>
                                    <h6>{viewInvoice.clientAddress.postCode}</h6>
                                    <h6>{viewInvoice.clientAddress.country}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="viewer-main-full-span-container f-ca">
                        <div className="viewer-main-left-column-container">
                            <div className="viewer-main-sent-outer-container">
                                <div className="viewer-main-sent-inner-container f-clb">
                                    <h2>Sent to</h2>
                                    <p>{viewInvoice.clientEmail}</p>
                                </div>
                            </div>
                        </div>
                        <div className="viewer-main-right-column-container"></div>
                    </div>
                    <div className="viewer-main-pricing-outer-container">
                        <div className="viewer-main-pricing-inner-container">
                            {priceItemsMapping}
                        </div>
                        <div className="viewer-main-pricing-grand-total-outer-container">
                            <div className="viewer-main-pricing-grand-total-inner-container">
                                <div className="f-ca">
                                    <h6> Amount Due</h6>
                                    <h1>{`£ ${grandTotal.toFixed(2)}`}</h1>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        )
    }

    const buttonsFooter = () => {
        return (
            <div className="viewer-footer-outer-container">
                <div className="viewer-footer-inner-container f-sb">
                    <div onClick={() => {setToggleCreate(); setToggleViewer()}} 
                        className="viewer-footer-edit-button-container f-c pointer">
                        <h3>Edit</h3>
                    </div>
                    <div onClick={() => setToggleDeleteModal(true)} className="viewer-footer-delete-button-container f-c pointer">
                        <h3>Delete</h3>
                    </div>
                    <div onClick={() => markPaid()} 
                        className={`${viewInvoice.status === 'paid' && `d-none`} 
                            viewer-footer-paid-button-container f-c pointer`}>
                        <h3>Mark as Paid</h3>
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
            {buttonsFooter()}
        </div>
    )
}

export default Viewer
