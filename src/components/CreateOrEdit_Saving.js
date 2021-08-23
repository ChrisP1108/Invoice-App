import { useState } from 'react';
import ButtonReqSpinner from './ButtonReqSpinner';
import { SETTOGGLECREATEEDIT, INVOICE, HTTPRES, SETINVOICE } from '../redux/Store.js';

const CreateOrEdit_Saving = () => {

    const [saveChangeSpinner, setSaveChangeSpinner] = useState(false);
    const [draftSpinner, setDraftSpinner] = useState(false);
    const [saveSendSpinner, setSaveSendSpinner] = useState(false);

    const idRef = INVOICE().id;

    if (HTTPRES() === "Save Changes Request Failed") {
        setTimeout(() => {
            SETTOGGLEERRORMODAL(true);
            setSaveChangeSpinner(false);
        }, 500);
    } 
    if (HTTPRES() === "Save Changes Request Fulfilled") {
        setTimeout(() => {
            setSaveChangeSpinner(false);
            SETINVOICE({...invoiceEdit, status: 'pending'});
            SETTOGGLECREATEEDIT(false);
        }, 500); 
    }
    if (HTTPRES() === "Save & Send Invoice Request Failed") {
        setTimeout(() => {
            SETTOGGLEERRORMODAL(true);
            setSaveSendSpinner(false);
        }, 500);
    } 
    if (HTTPRES() === "Save & Send Invoice Request Fulfilled") {
        setTimeout(() => {
            setSaveSendSpinner(false);
            SETTOGGLECREATEEDIT(false);
            setInvoiceEdit({...invoiceEdit, status: 'pending'})
        }, 500); 
    }
    if (HTTPRES() === "Add Draft Invoice Request Failed") {
        setTimeout(() => {
            SETTOGGLEERRORMODAL(true);
            setDraftSpinner(false);
        }, 500);
    } 
    if (HTTPRES() === "Add Draft Invoice Request Fulfilled") {
        setTimeout(() => {
            setDraftSpinner(false);
            SETTOGGLECREATEEDIT(false);
            setInvoiceEdit({...invoiceEdit, status: 'draft'});
        }, 500); 
    }

    const grandTotalTally = (input) => {
        let grandTotal = 0;
        input.items.forEach(item => {
            const amount = item.price * item.quantity;
            item.total = amount;
            grandTotal += amount;
        });
        input.total = grandTotal;
        return input;
    }

    const saveChangesInvoiceToggle = () => {
        const output = grandTotalTally(invoiceEdit);
        fieldsEval();
        if (fieldsEval()) {
            setSaveChangeSpinner(true);
            SETHTTPRES("Save Changes Request Pending");
            SAVECHANGESINVOICE(output);
        } else console.log("Fields & Or Items Are Empty");
    }

    const saveAndSendInvoiceInitiate = (type) => {
        const output = grandTotalTally(invoiceEdit);
        if (type === 'Save') {
            setSaveSendSpinner(true);
            SETHTTPRES("Save & Send Invoice Request Pending");
            SAVEANDSENDINVOICE(output);
        } else if (type === 'Draft') {
            setDraftSpinner(true);
            SETHTTPRES("Add Draft Invoice Request Pending");
            SAVEASDRAFTINVOICE(output);
        }
    }

    const saveAndSendInvoiceToggle = (evalFields) => {
        if (evalFields) {
            fieldsEval();
            if (fieldsEval()) {
                saveAndSendInvoiceInitiate('Save');
            } else console.log("Fields & Or Items Are Empty");
        } else {
            saveAndSendInvoiceInitiate('Draft');
        }     
    }

    return (
        <div className="createoredit-footer-outer-container f-c">
            <div className={`${idRef !== undefined ? `f-e f-sb` : `f-sb`} createoredit-footer-inner-container`}> 
                <div onClick={() => SETTOGGLECREATEEDIT(false)}
                    className={`${idRef !== undefined && `d-none`} createoredit-discard-button-container f-c pointer`}>
                        <h3>Discard</h3>
                </div>
                <div className="d-flex">
                    <div onClick={() => SETTOGGLECREATEEDIT(false)}
                        className={`${idRef === undefined && `d-none`} createoredit-cancel-button-container f-c pointer`}>
                            <h3>Cancel</h3>
                    </div>
                    <div className={`${idRef !== undefined && `d-none`} createoredit-footer-button-gap`}></div>
                    <div onClick={() => saveAndSendInvoiceToggle(false)}
                        className={`${idRef !== undefined && `d-none`} createoredit-saveasdraft-button-container f-c pointer`}>
                            {draftSpinner ? <ButtonReqSpinner /> : <h3>Save as Draft</h3>}
                    </div>
                    <div className="createoredit-footer-button-gap"></div>
                    <div onClick={() => saveChangesInvoiceToggle()}
                        className={`${idRef === undefined && `d-none`} 
                            createoredit-savechanges-button-container f-c pointer position-relative`}>
                        {saveChangeSpinner ? <ButtonReqSpinner /> : <h3>Save Changes</h3>}
                    </div>
                    <div onClick={() => saveAndSendInvoiceToggle(true)}
                        className={`${idRef !== undefined && `d-none`} 
                            createoredit-saveandsend-button-container f-c pointer`}>
                        {saveSendSpinner ? <ButtonReqSpinner /> : <h3>Save & Send</h3>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateOrEdit_Saving
