import { useState } from 'react';
import { optionTerms } from '../Arrays/Options';
import { invoice, 
    markPaidInvoice, setToggleDeleteModal, 
    setToggleViewer, setToggleCreate } from '../redux/Store.js';

const CreateOrEdit = () => {

    const [invoiceEdit, setInvoiceEdit] = useState(invoice());
    const [toggleTerms, setToggleTerms] = useState(false);

    const backHeader = () => {
        return (
            <div onClick={() => setToggleCreate()} 
                className="back-container pointer position-relative">
                <div className="back-arrow"></div>
                <div className="d-flex">
                    <h3>Go back</h3>
                </div>
                <div className="back-container-filler"></div>
            </div>
        )
    }

    const title = () => {
        return (
            <div className="createoredit-title">
                {invoiceEdit.length === 0 ?
                    <h1>New Invoice</h1>
                    : <h1>Edit <span>#</span>{invoiceEdit.id}</h1>
                }
            </div>
        )
    }

    const setPaymentTerms = (days) => {
        setInvoiceEdit({...invoiceEdit, paymentTerms: days})
        setToggleTerms(false);
    }

    const termsMapping = optionTerms.map(option => {
        return (
            <div onClick={() => setPaymentTerms(option.days)}
                key={option.id} className="createoredit-option pointer">
                <h4>{option.name}</h4>
            </div>
        )
    });

    const formBody = () => {
        return (
            <>
                <div className="createoredit-bill-top-margin">
                    <h2>Bill From</h2>
                </div>
                <div className="createoredit-form-row-full-container f-clb">
                    <h4>Street Address</h4>
                    <input className="createoredit-field" 
                        type="text"></input>
                </div>
                <div className="d-flex">
                    <div className="createoredit-form-row-full-container f-clb">
                        <h4>City</h4>
                        <input className="createoredit-field" 
                            type="text"></input>
                    </div>
                    <div className="createoredit-column-gap"></div>
                    <div className="createoredit-form-row-full-container f-clb">
                        <h4>Post Code</h4>
                        <input className="createoredit-field" 
                            type="text"></input>
                    </div>
                </div>
                <div className="createoredit-form-row-full-container f-clb">
                    <h4>Country</h4>
                    <input className="createoredit-field" 
                        type="text"></input>
                </div>
                <div className="createoredit-bill-margin">
                    <h2>Bill To</h2>
                </div>
                <div className="createoredit-form-row-full-container f-clb">
                    <h4>Client's Name</h4>
                    <input className="createoredit-field" 
                        type="text"></input>
                </div>
                <div className="createoredit-form-row-full-container f-clb">
                    <h4>Client's Email</h4>
                    <input className="createoredit-field" 
                        type="text"></input>
                </div>
                <div className="createoredit-form-row-full-container f-clb">
                    <h4>Street Address</h4>
                    <input className="createoredit-field" 
                        type="text"></input>
                </div>
                <div className="d-flex">
                    <div className="createoredit-form-row-full-container f-clb">
                        <h4>City</h4>
                        <input className="createoredit-field" 
                            type="text"></input>
                    </div>
                    <div className="createoredit-column-gap"></div>
                    <div className="createoredit-form-row-full-container f-clb">
                        <h4>Post Code</h4>
                        <input className="createoredit-field" 
                            type="text"></input>
                    </div>
                </div>
                <div className="createoredit-form-row-full-container f-clb">
                    <h4>Country</h4>
                    <input className="createoredit-field" 
                        type="text"></input>
                </div>
                <div className="createoredit-invoice-top-gap"></div>
                <div className={`${invoiceEdit.length === 0 && `d-none`} createoredit-form-row-full-container createoredit-invoice-disabled f-clb`}>
                    <h4>Invoice Date</h4>
                    <input className="createoredit-field" 
                        type="date" disabled></input>
                </div>
                <div className={`${invoiceEdit.length !== 0 && `d-none`} createoredit-form-row-full-container f-clb`}>
                    <h4>Invoice Date</h4>
                    <input className="createoredit-field" 
                        type="date" ></input>
                </div>
                <div className="position-relative">
                    <div className="createoredit-form-row-full-container f-clb">
                        <h4>Payment Terms</h4>
                        <div onClick ={() => setToggleTerms(!toggleTerms)}className="createoredit-field f-sb pointer">
                        <span className={`${invoiceEdit.length !== 0 && `d-none`}`}>
                                Select Payment Status
                            </span>
                            <span className={`${invoiceEdit.length === 0 && `d-none`}`}>
                                Net {invoiceEdit.paymentTerms} Day{invoiceEdit.paymentTerms > 1 ? 's' : ''}
                            </span>
                            <div className="f-c">
                                <div className={`${toggleTerms 
                                    && `createoredit-option-arrow-clicked`} createoredit-option-arrow`}></div>
                            </div>
                        </div>
                    </div>
                    <div className={`${toggleTerms ? `createoredit-option-trans` : `d-none`} position-absolute w-100`}>
                        {termsMapping}
                    </div>
                </div>
                <div className="createoredit-form-row-full-container f-clb">
                    <h4>Project / Description</h4>
                    <input className="createoredit-field" 
                        type="text"></input>
                </div>
            </>
        )
    }

    return (
        <div id="createoredit">
            <div className="createoredit-container">
                {backHeader()}
                <div className="createoredit-transition">
                    {title()}
                    {formBody()}
                </div>
            </div>   
        </div>
    )
}

export default CreateOrEdit
