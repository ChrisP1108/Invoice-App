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

    const stateUpdate = (type, value, indexId) => {
        const data = invoiceEdit;

        switch (type) {
            case 'senderAddress.street':
                data.senderAddress.street = value;
                break;
            case 'senderAddress.city':
                data.senderAddress.city = value;
                break;
            case 'senderAddress.postCode':
                data.senderAddress.postCode = value;
                break;
            case 'senderAddress.country':
                data.senderAddress.country = value;
                break;
            case 'clientName':
                data.clientName = value;
                break;
            case 'clientEmail':
                data.clientEmail = value;
                break;
            case 'clientAddress.street':
                data.clientAddress.street = value;
                break;
            case 'clientAddress.city':
                data.clientAddress.city = value;
                break;
            case 'clientAddress.postCode':
                data.clientAddress.postCode = value;
                break;
            case 'clientAddress.country':
                data.clientAddress.country = value;
                break;
            case 'createdAt':
                data.clientAddress.createdAt = value;
                break;
            case 'paymentTerms':
                data.paymentTerms = value;
                setToggleTerms(false);
                break;
            case 'description':
                data.description = value;
                break;
            case 'item.name':
                data.items[indexId].name = value;
                break;
            case 'item.quantity':
                data.items[indexId].quantity = value;
                break;
            case 'item.price':
                data.items[indexId].price = Number(value);
                break;
            case 'deleteItem':
                data.items.splice(indexId, 1)
                console.log(data);
                break;
            default:
                break;
        }
        setInvoiceEdit({...invoiceEdit, data});
    }

    const termsMapping = optionTerms.map(option => {
        return (
            <div onClick={() => stateUpdate('paymentTerms', option.days)}
                key={option.id} className="createoredit-option pointer">
                <h4>{option.name}</h4>
            </div>
        )
    });

    const itemsMapping = invoiceEdit.items.map(item => {

        const itemTotal = (item.quantity * item.price).toFixed(2);
        const indexId = invoiceEdit.items.indexOf(item);

        return (
            <div key={indexId}>
                <div className="createoredit-form-row-full-container f-clb">
                    <h4>Item Name</h4>
                    <input 
                        type="text"
                        name="item.name"
                        value={item.name}
                        onChange={(e) => stateUpdate(e.target.name, e.target.value, indexId)}                            
                        className="createoredit-field"> 
                    </input>
                </div>
                <div className="d-flex">
                    <div className="createoredit-form-row-full-container f-clb">
                        <h4>Qty.</h4>
                        <input 
                            type="text"
                            name="item.quantity"
                            value={item.quantity}
                            onChange={(e) => stateUpdate(e.target.name, e.target.value, indexId)}
                            className="createoredit-field"> 
                        </input>
                    </div>
                    <div className="createoredit-column-gap"></div>
                    <div className="createoredit-form-row-full-container f-clb">
                        <h4>Price</h4>
                        <input 
                            type="text"
                            name="item.price"
                            value={item.price.toFixed(2)}
                            onChange={(e) => stateUpdate(e.target.name, e.target.value, indexId)}
                            className="createoredit-field"> 
                        </input>
                    </div>
                    <div className="createoredit-column-gap"></div>
                    <div className="createoredit-form-row-full-container f-clb">
                        <h4>Total</h4>
                        <div className="createoredit-item-total">
                            <h4><span>{itemTotal}</span></h4>
                            <div className="position-relative">
                                <div className="createoredit-item-trash-icon"></div>
                                <div 
                                    onClick={() => stateUpdate('deleteItem', item, indexId)}
                                    className="createoredit-item-trash-filler pointer">         
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="createoredit-item-separation-margin"></div>
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
                        onChange={(e) => stateUpdate(e.target.name, e.target.value)}
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
                            onChange={(e) => stateUpdate(e.target.name, e.target.value)}
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
                            onChange={(e) => stateUpdate(e.target.name, e.target.value)}
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
                        onChange={(e) => stateUpdate(e.target.name, e.target.value)}
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
                        onChange={(e) => stateUpdate(e.target.name, e.target.value)}
                        className="createoredit-field">
                    </input>
                </div>
                <div className="createoredit-form-row-full-container f-clb">
                    <h4>Client's Email</h4>
                    <input  
                        type="text"
                        name="clientEmail"
                        value={invoiceEdit.clientEmail}
                        onChange={(e) => stateUpdate(e.target.name, e.target.value)}
                        className="createoredit-field">
                    </input>
                </div>
                <div className="createoredit-form-row-full-container f-clb">
                    <h4>Street Address</h4>
                    <input 
                        type="text"
                        name="clientAddress.street"
                        value={invoiceEdit.clientAddress.street}
                        onChange={(e) => stateUpdate(e.target.name, e.target.value)}
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
                            onChange={(e) => stateUpdate(e.target.name, e.target.value)}
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
                            onChange={(e) => stateUpdate(e.target.name, e.target.value)}
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
                        onChange={(e) => stateUpdate(e.target.name, e.target.value)}
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
                        <div onClick ={() => setToggleTerms(!toggleTerms)} className="createoredit-field f-sb pointer">
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
                        name="description"
                        value={invoiceEdit.description}
                        onChange={(e) => stateUpdate(e.target.name, e.target.value)}
                        className="createoredit-field"> 
                    </input>
                </div>
                <div className="createoredit-item-list-container">
                    <h5>Item List</h5>
                    {itemsMapping}
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
