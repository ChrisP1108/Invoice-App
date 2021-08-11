import { useState } from 'react';
import { optionTerms } from '../Arrays/Options';
import { Schema } from '../Schema-Invoice';
import { invoice, 
    markPaidInvoice, setToggleDeleteModal, 
    setToggleViewer, setToggleCreate } from '../redux/Store.js';

const CreateOrEdit = () => {

    const input = invoice().id === undefined ? Schema : invoice();

    const [invoiceEdit, setInvoiceEdit] = useState(input);
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
                {invoice().id === undefined ?
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
                    <input 
                        type="text"
                        name="senderAddress.street"
                        value={invoiceEdit.senderAddress.street}
                        onChange={(e) => 
                            setInvoiceEdit({...invoiceEdit, senderAddress: 
                                {...invoiceEdit.senderAddress, street: e.target.value}})}
                        className="createoredit-field">
                    </input>
                </div>
                <div className="d-flex">
                    <div className="createoredit-form-row-full-container f-clb">
                        <h4>City</h4>
                        <input  
                            type="text"
                            name="senderAddress.city"
                            value={invoiceEdit.senderAddress.city}
                            onChange={(e) => 
                                setInvoiceEdit({...invoiceEdit, senderAddress: 
                                    {...invoiceEdit.senderAddress, city: e.target.value}})}
                            className="createoredit-field">
                        </input>
                    </div>
                    <div className="createoredit-column-gap"></div>
                    <div className="createoredit-form-row-full-container f-clb">
                        <h4>Post Code</h4>
                        <input 
                            type="text"
                            name="senderAddress.postCode"
                            value={invoiceEdit.senderAddress.postCode}
                            onChange={(e) => 
                                setInvoiceEdit({...invoiceEdit, senderAddress: 
                                    {...invoiceEdit.senderAddress, postCode: e.target.value}})}
                            className="createoredit-field"> 
                            </input>
                    </div>
                </div>
                <div className="createoredit-form-row-full-container f-clb">
                    <h4>Country</h4>
                    <input 
                        type="text"
                        name="senderAddress.country"
                        value={invoiceEdit.senderAddress.country}
                        onChange={(e) => 
                            setInvoiceEdit({...invoiceEdit, senderAddress: 
                                {...invoiceEdit.senderAddress, country: e.target.value}})}
                        className="createoredit-field"> 
                    </input>
                </div>
                <div className="createoredit-bill-margin">
                    <h2>Bill To</h2>
                </div>
                <div className="createoredit-form-row-full-container f-clb">
                    <h4>Client's Name</h4>
                    <input  
                        type="text"
                        name="clientName"
                        value={invoiceEdit.clientName}
                        onChange={(e) => 
                            setInvoiceEdit({...invoiceEdit, clientName: e.target.value})}
                        className="createoredit-field">
                    </input>
                </div>
                <div className="createoredit-form-row-full-container f-clb">
                    <h4>Client's Email</h4>
                    <input  
                        type="text"
                        name="clientEmail"
                        value={invoiceEdit.clientEmail}
                        onChange={(e) => 
                            setInvoiceEdit({...invoiceEdit, clientEmail: e.target.value})}
                        className="createoredit-field">
                    </input>
                </div>
                <div className="createoredit-form-row-full-container f-clb">
                    <h4>Street Address</h4>
                    <input 
                        type="text"
                        name="clientAddress.street"
                        value={invoiceEdit.clientAddress.street}
                        onChange={(e) => 
                            setInvoiceEdit({...invoiceEdit, clientAddress: 
                                {...invoiceEdit.clientAddress, street: e.target.value}})}
                        className="createoredit-field"> 
                    </input>
                </div>
                <div className="d-flex">
                    <div className="createoredit-form-row-full-container f-clb">
                        <h4>City</h4>
                        <input 
                            type="text"
                            name="clientAddress.city"
                            value={invoiceEdit.clientAddress.city}
                            onChange={(e) => 
                                setInvoiceEdit({...invoiceEdit, clientAddress: 
                                    {...invoiceEdit.clientAddress, city: e.target.value}})}
                            className="createoredit-field"> 
                        </input>
                    </div>
                    <div className="createoredit-column-gap"></div>
                    <div className="createoredit-form-row-full-container f-clb">
                        <h4>Post Code</h4>
                        <input 
                            type="text"
                            name="clientAddress.postCode"
                            value={invoiceEdit.clientAddress.postCode}
                            onChange={(e) => 
                                setInvoiceEdit({...invoiceEdit, clientAddress: 
                                    {...invoiceEdit.clientAddress, postCode: e.target.value}})}
                            className="createoredit-field"> 
                        </input>
                    </div>
                </div>
                <div className="createoredit-form-row-full-container f-clb">
                    <h4>Country</h4>
                    <input 
                        type="text"
                        name="clientAddress.country"
                        value={invoiceEdit.clientAddress.country}
                        onChange={(e) => 
                            setInvoiceEdit({...invoiceEdit, clientAddress: 
                                {...invoiceEdit.clientAddress, country: e.target.value}})}
                        className="createoredit-field"> 
                    </input>
                </div>
                <div className="createoredit-invoice-top-gap"></div>
                <div className={`${invoice().id === undefined && `d-none`} createoredit-form-row-full-container createoredit-invoice-disabled f-clb`}>
                    <h4>Invoice Date</h4>
                    <div className="createoredit-date-disabled f-sb">
                        <h4><span>{invoiceEdit.createdAt}</span></h4>
                        <div className="createoredit-calendar-icon"></div>
                    </div>   
                </div>
                <div className={`${invoice().id !== undefined && `d-none`} createoredit-form-row-full-container f-clb`}>
                    <h4>Invoice Date</h4>
                    <div className="f-sb">
                        <input 
                            type="date"
                            className="createoredit-field"> 
                        </input>
                    </div>
                </div>
                <div className="position-relative">
                    <div className="createoredit-form-row-full-container f-clb">
                        <h4>Payment Terms</h4>
                        <div onClick ={() => setToggleTerms(!toggleTerms)}className="createoredit-field f-sb pointer">
                        <span className={`${invoiceEdit.paymentTerms !== null && `d-none`}`}>
                                Select Payment Status
                            </span>
                            <span className={`${invoiceEdit.paymentTerms === null && `d-none`}`}>
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
                    <input 
                        type="text"
                        value={invoiceEdit.description}
                        onChange={(e) => 
                            setInvoiceEdit({...invoiceEdit, description: e.target.value})}
                        className="createoredit-field"> 
                    </input>
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
