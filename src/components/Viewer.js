import { monthsArray } from '../Arrays/Months';
import ButtonReqSpinner from './ButtonReqSpinner';

import { useState } from 'react';
import { INVOICE, INVOICELIST, MARKASPAIDINVOICE, SETTOGGLEDELETEMODAL, 
    SETTOGGLEVIEWER, SETTOGGLECREATEEDIT, UPDATEINVOICE,
    HTTPRES, SETHTTPRES, SETTOGGLEERRORMODAL, RESPONSIVE } from '../redux/Store.js';

const Viewer = () => {

    const response = RESPONSIVE();
    
    const [viewInvoice, setViewInvoice] = useState(INVOICE());
    const [markPaidSpinner, setMarkPaidSpinner] = useState(false);
    const [clicked, setClicked] = useState(false);

    if (HTTPRES() === "Mark Paid Request Failed") {
        setTimeout(() => {
            SETTOGGLEERRORMODAL(true);
            setMarkPaidSpinner(false);
        }, 500);
    } 
    if (HTTPRES() === "Mark Paid Request Fulfilled") {
        setTimeout(() => {
            setClicked(true);
            setMarkPaidSpinner(false);
            SETTOGGLEVIEWER(false);
            setViewInvoice({...viewInvoice, status: 'paid'});
        }, 500); 
    }

    const markPaid = () => {
        setMarkPaidSpinner(true);
        SETHTTPRES("Mark Paid Request Pending");
        MARKASPAIDINVOICE(viewInvoice.id);
    }

    const backHeader = () => {
        return (
            <div onClick={() => SETTOGGLEVIEWER(false)} 
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
                    <div className={response === 'mobile' ? `f-ca` : `d-none`}>
                        <h2>Status</h2>
                        <div className={`payment-button-${viewInvoice.status} f-c payment-button-container`}>
                            <div className="payment-status f-ca">
                                <div className={`dot-${viewInvoice.status} payment-dot`}></div>
                                <h5>{viewInvoice.status === 'paid' ? `Paid` : viewInvoice.status === 'pending' ? `Pending` : `Draft`}</h5>
                            </div>
                        </div>
                    </div>
                    <div className={response !== 'mobile' ? `f-sb` : `d-none`}>
                        <div className="f-sb viewer-status-closeto-width">
                            <h2>Status</h2>
                            <div className={`payment-button-${viewInvoice.status} f-c my-auto payment-button-container`}>
                                <div className="payment-status f-c">
                                    <div className={`dot-${viewInvoice.status} payment-dot`}></div>
                                    <h5>{viewInvoice.status === 'paid' ? `Paid` : viewInvoice.status === 'pending' ? `Pending` : `Draft`}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex">
                            <div onClick={() => {SETTOGGLECREATEEDIT(true); SETTOGGLEVIEWER(true)}} 
                                className="viewer-footer-edit-button-container f-c pointer">
                                <h3>Edit</h3>
                            </div>
                            <div className="viewer-footer-button-gap"></div>
                            <div onClick={() => SETTOGGLEDELETEMODAL(true)} className="viewer-footer-delete-button-container f-c pointer">
                                <h3>Delete</h3>
                            </div>
                            <div className={viewInvoice.status === 'paid' || viewInvoice.status === 'draft'
                                ? `d-none` : `viewer-footer-button-gap`}>
                            </div>
                            <div onClick={() => markPaid()} 
                                className={`${viewInvoice.status === 'pending' 
                                    ? `viewer-footer-paid-button-container` 
                                    : clicked  && viewInvoice.status === 'paid' ? `viewer-footer-paid-button-animation`
                                    : viewInvoice.status === 'paid' && !clicked ? `d-none` : ``} 
                                    f-c pointer position-relative`}>
                                {markPaidSpinner ? <ButtonReqSpinner /> : 
                                    viewInvoice.status === 'pending' &&  <h3>Mark as Paid</h3> }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    let grandTotal = 0;

    const calculateItemTotal = (item) => {
        const numberTotal = (item.quantity * item.price);
        grandTotal = grandTotal + numberTotal;
        const total = `£ ${numberTotal.toFixed(2)}`;
        return total;
    }

    const priceItemsMapping = viewInvoice.items.map(item => {

        return (
            <div key={item.name} className="viewer-main-pricing-item-container f-sb">
                <h3 className="w-40">{item.name}</h3>
                <h6 className="w-20 text-center">{item.quantity}</h6>
                <h6 className="w-15 text-right">£ {item.price.toFixed(2)}</h6>
                <h6 className="w-25 text-right">£ {(item.quantity * item.price).toFixed(2)}</h6>
            </div> 
        );
    });

    const priceItemsMappingMobile = viewInvoice.items.map(item => {

        return (
            <div key={item.name} className="viewer-main-pricing-item-container f-sb">
                <div className={`${item.name === '' && `d-none`} f-clb`}>
                    <h3>{item.name}</h3>
                    <h3><span>{`${item.quantity} x £ ${item.price.toFixed(2)}`}</span></h3>
                </div>
                <div className={`${item.name === '' && `d-none`} f-c`}>
                    <h3>{calculateItemTotal(item)}</h3>
                </div>
                <div className={`${item.name !== '' && `d-none`} f-c mx-auto`}>
                    <h3>No Items Have Been Added</h3>
                </div>
            </div> 
        );
    });

    const dateFormat = (input) => {
        const day= input.slice(8, 10);
        let month = monthsArray[Number(input.slice(5, 7)) - 1];
        const year = input.slice(0, 4);
        const formatted = `${day} ${month} ${year}`;
        return formatted;
    }

    const currencyFormat = (amount) => {
        const output = `£ ${new Intl.NumberFormat ('en-UK', { style: 'currency', currency: 'GBP'}).format(amount).toString().slice(1)}`;
        return output;
    }

    const addressEval = (input) => {
        let emptyTally = 0;
        Object.values(input).forEach(field => {
            if (field === '') {
                emptyTally += 1;
            }
        })
        return emptyTally > 0 ? false : true; 
    }

    const mainContainer = () => {
        return (
            <div className="viewer-main-outer-container">
                <div className="viewer-main-inner-container">
                    <div className="viewer-main-full-span-container f-sb"> 
                        <div className="viewer-main-id-subscription-container f-clb">
                            <h3><span>#</span>{viewInvoice.id}</h3>
                            <h2>{viewInvoice.description === '' 
                                ? `No description Added` : viewInvoice.description}</h2>
                        </div>
                        <div className={addressEval(viewInvoice.senderAddress) ? `viewer-main-address-container f-clb` : `d-none`}>
                            <h6>{viewInvoice.senderAddress.street}</h6>
                            <h6>{viewInvoice.senderAddress.city}</h6>
                            <h6>{viewInvoice.senderAddress.postCode}</h6>
                            <h6>{viewInvoice.senderAddress.country}</h6>
                        </div>
                        <div className={!addressEval(viewInvoice.senderAddress) ? `viewer-main-address-container f-clb` : `d-none`}>
                            <h6>Sender Address Has Not Been Entered</h6>
                        </div>
                    </div>
                    <div className="viewer-main-date-bill-email-container f-sb">
                        <div className="f-clb">   
                            <div className="viewer-main-due-container f-clb">
                                <h2>Invoice Date</h2>
                                <p>{viewInvoice.createdAt === '' ? `No Date Selected` 
                                    : dateFormat(viewInvoice.createdAt)}</p>
                            </div>
                            <div className="viewer-main-due-container f-clb">
                                <h2>Payment Due</h2>
                                <p>{viewInvoice.paymentDue === '' ? `No Date Selected` 
                                    : dateFormat(viewInvoice.paymentDue)}</p>
                            </div>
                        </div>
                        <div className="f-clb">
                            <div className="viewer-main-bill-container f-clb">
                                <h2>Bill To</h2>
                                <p>{viewInvoice.clientName === '' ? `Not Entered` 
                                    : viewInvoice.clientName}</p>
                            </div>
                            <div className="viewer-main-bill-address-outer-container">
                                <div className={addressEval(viewInvoice.clientAddress) 
                                        ? `viewer-main-bill-address-inner-container f-sb flex-column` : `d-none`}>
                                    <h6>{viewInvoice.clientAddress.street}</h6>
                                    <h6>{viewInvoice.clientAddress.city}</h6>
                                    <h6>{viewInvoice.clientAddress.postCode}</h6>
                                    <h6>{viewInvoice.clientAddress.country}</h6>
                                </div>
                                <div className={!addressEval(viewInvoice.clientAddress) 
                                        ? `viewer-main-bill-address-inner-container f-sb flex-column` : `d-none`}>
                                    <h6>Client Address Has Not Been Entered</h6>
                                </div>
                            </div>
                        </div>
                        <div className="viewer-main-email-container">
                            <div className="viewer-main-sent-inner-container f-clb">
                                <h2>Sent to</h2>
                                {viewInvoice.clientEmail === '' 
                                    ? <h2>Email not entered</h2> : <p>{viewInvoice.clientEmail}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="viewer-main-full-span-container f-ca">
                        
                        <div className="viewer-main-right-column-container"></div>
                    </div>
                    <div className="viewer-main-pricing-outer-container">
                        <div className="viewer-main-pricing-inner-container">
                            <div className="f-sb">
                                <h6 className="w-40">Item Name</h6>
                                <h6 className="w-20 text-center">QTY.</h6>
                                <h6 className="w-15 text-right">Price</h6>
                                <h6 className="w-25 text-right">Total</h6>
                            </div>
                            {priceItemsMapping}
                        </div>
                        <div className="viewer-main-pricing-grand-total-outer-container">
                            <div className="viewer-main-pricing-grand-total-inner-container">
                                <div className={`${grandTotal === 0 && `d-none`} f-ca`}>
                                    <h6> Amount Due</h6>
                                    <h1>{`£ ${grandTotal.toFixed(2)}`}</h1>
                                </div>
                                <div className={`${grandTotal !== 0 && `d-none`} f-c`}>
                                    <h1>No Total Calculated</h1>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        )
    }

    const mainContainerMobile = () => {
        return (
            <div className="viewer-main-outer-container">
                <div className="viewer-main-inner-container">
                    <div className="viewer-main-full-span-container f-ca"> 
                        <div className="viewer-main-left-column-container">
                            <div className="viewer-main-id-subscription-container f-clb">
                                <h3><span>#</span>{viewInvoice.id}</h3>
                                <h2>{viewInvoice.description === '' 
                                    ? `No description Added` : viewInvoice.description}</h2>
                            </div>
                            <div className={addressEval(viewInvoice.senderAddress) ? `viewer-main-address-container f-clb` : `d-none`}>
                                <h6>{viewInvoice.senderAddress.street}</h6>
                                <h6>{viewInvoice.senderAddress.city}</h6>
                                <h6>{viewInvoice.senderAddress.postCode}</h6>
                                <h6>{viewInvoice.senderAddress.country}</h6>
                            </div>
                            <div className={!addressEval(viewInvoice.senderAddress) ? `viewer-main-address-container f-clb` : `d-none`}>
                                <h6>Sender Address Has Not Been Entered</h6>
                            </div>
                        </div>
                        <div className="viewer-main-right-column-container"></div>
                    </div>
                    <div className="viewer-main-full-span-container f-ca">
                        <div className="viewer-main-left-column-container">   
                            <div className="viewer-main-invoice-container f-clb">
                                <h2>Invoice Date</h2>
                                <p>{viewInvoice.createdAt === '' ? `No Date Selected` 
                                    : dateFormat(viewInvoice.createdAt)}</p>
                            </div>
                            <div className="viewer-main-due-container f-clb">
                                <h2>Payment Due</h2>
                                <p>{viewInvoice.paymentDue === '' ? `No Date Selected` 
                                    : dateFormat(viewInvoice.paymentDue)}</p>
                            </div>
                        </div>
                        <div className="viewer-main-right-column-container">
                            <div className="viewer-main-bill-container f-clb">
                                <h2>Bill To</h2>
                                <p>{viewInvoice.clientName === '' ? `Not Entered` 
                                    : viewInvoice.clientName}</p>
                            </div>
                            <div className="viewer-main-bill-address-outer-container">
                                <div className={addressEval(viewInvoice.clientAddress) 
                                        ? `viewer-main-bill-address-inner-container f-sb flex-column` : `d-none`}>
                                    <h6>{viewInvoice.clientAddress.street}</h6>
                                    <h6>{viewInvoice.clientAddress.city}</h6>
                                    <h6>{viewInvoice.clientAddress.postCode}</h6>
                                    <h6>{viewInvoice.clientAddress.country}</h6>
                                </div>
                                <div className={!addressEval(viewInvoice.clientAddress) 
                                        ? `viewer-main-bill-address-inner-container f-sb flex-column` : `d-none`}>
                                    <h6>Client Address Has Not Been Entered</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="viewer-main-full-span-container f-ca">
                        <div className="viewer-main-left-column-container">
                            <div className="viewer-main-sent-outer-container">
                                <div className="viewer-main-sent-inner-container f-clb">
                                    <h2>Sent to</h2>
                                    {viewInvoice.clientEmail === '' 
                                        ? <h2>Email not entered</h2> : <p>{viewInvoice.clientEmail}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="viewer-main-right-column-container"></div>
                    </div>
                    <div className="viewer-main-pricing-outer-container">
                        <div className="viewer-main-pricing-inner-container">
                            {priceItemsMappingMobile}
                        </div>
                        <div className="viewer-main-pricing-grand-total-outer-container">
                            <div className="viewer-main-pricing-grand-total-inner-container">
                                <div className={`${grandTotal === 0 && `d-none`} f-ca`}>
                                    <h6> Amount Due</h6>
                                    <h1>{`£ ${grandTotal.toFixed(2)}`}</h1>
                                </div>
                                <div className={`${grandTotal !== 0 && `d-none`} f-c`}>
                                    <h1>No Total Calculated</h1>
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
                <div className="viewer-footer-inner-container f-e">
                    <div onClick={() => {SETTOGGLECREATEEDIT(true); SETTOGGLEVIEWER(true)}} 
                        className="viewer-footer-edit-button-container f-c pointer">
                        <h3>Edit</h3>
                    </div>
                    <div className="viewer-footer-button-gap"></div>
                    <div onClick={() => SETTOGGLEDELETEMODAL(true)} className="viewer-footer-delete-button-container f-c pointer">
                        <h3>Delete</h3>
                    </div>
                    <div className={viewInvoice.status === 'paid' || viewInvoice.status === 'draft'
                        ? `d-none` : `viewer-footer-button-gap`}></div>
                    <div onClick={() => markPaid()} 
                        className={`${viewInvoice.status === 'pending' 
                            ? `viewer-footer-paid-button-container` 
                            : clicked  && viewInvoice.status === 'paid' ? `viewer-footer-paid-button-animation`
                            : viewInvoice.status === 'paid' && !clicked ? `d-none` : ``} 
                            f-c pointer position-relative`}>
                        {markPaidSpinner ? <ButtonReqSpinner /> : 
                            viewInvoice.status === 'pending' &&  <h3>Mark as Paid</h3> }
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div id="viewer" className="d-flex flex-column">
            <div className="viewer-container">
                {backHeader()} 
                <div className="viewer-transition">  
                    {statusContainer()}   
                    {response === 'mobile' ? mainContainerMobile() : mainContainer()}
                </div>  
            </div>
            {response === 'mobile' && buttonsFooter()}
        </div>
    )
}

export default Viewer
