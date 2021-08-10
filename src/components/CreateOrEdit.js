import { useState } from 'react';
import { CardTitle } from 'reactstrap';
import { invoice, 
    markPaidInvoice, setToggleDeleteModal, 
    setToggleViewer, setToggleCreate } from '../redux/Store.js';

const CreateOrEdit = () => {

    const invoiceEdit = invoice();

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
            </>
        )
    }

    return (
        <div id="createoredit">
            <div className="createoredit-container">
            {backHeader()}
            {title()}
            {formBody()}
            </div>   
        </div>
    )
}

export default CreateOrEdit
