import { useState, useEffect } from 'react';
import ButtonReqSpinner from './ButtonReqSpinner';
import { invoice, setToggleViewer, setToggleDeleteModal, 
    deleteInvoice, httpRes, setHttpRes, setToggleErrorModal,
    setToggleCreateEdit, initInvoices, invoiceList } from '../redux/Store.js';

const DeleteModal = () => {

    const deletingId = invoice().id;

    const [deleteSpinner, setDeleteSpinner] = useState(false);
    
    if (httpRes() === "Delete Request Failed") {
        setToggleDeleteModal(false);
        setToggleErrorModal(true); 
    }
    if (httpRes() === "Delete Request Fulfilled") {
        setToggleDeleteModal(false);
        setToggleViewer(false);
    }

    const confirmDelete = () => {
        setDeleteSpinner(true);   
        setHttpRes("Delete Request Pending");
        deleteInvoice(deletingId); 
    }

    return (
        <div id="deleteModal" className="d-flex align-items-stretch">
            <div className="delete-modal-page-container f-c delete-fill-transition">
                <div className="delete-modal-outer-container delete-modal-transition">
                    <div className="delete-modal-inner-container">
                        <h1>Confirm Deletion</h1>
                        <div className="delete-modal-content-spacing">
                            <h2>Are you sure you want to delete invoice
                            #{deletingId}? This action cannot be undone.</h2>
                        </div>
                        <div className="f-ae">
                            <div onClick={() => setToggleDeleteModal(false)}
                                className="delete-modal-cancel-button-container f-c pointer">
                                <h3>Cancel</h3>
                            </div>
                            <div className="delete-modal-button-gap"></div>
                            <div onClick={() => confirmDelete()} 
                                className="delete-modal-delete-button-container f-c pointer position-relative">
                                {deleteSpinner ? <ButtonReqSpinner /> : <h3>Delete</h3>} 
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    )
}

export default DeleteModal
