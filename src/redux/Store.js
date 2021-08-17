import { Url } from './fetchUrl';
import { createReduxModule } from 'hooks-for-redux';

let SERVERLIST = [];

// Redux Store Contains Both State And HTTP Request Management

// HTTP Requests & State Update

    // HTTP Response Timer.  Sets HTTP Response Status State And Reverts Back To Starting Default After 1 Second

    const httpStatusAndReset = (res) => {
            setHttpRes(res);
        setTimeout(() => {
            setHttpRes("No Request Made");
        }, 1000);
    }

    // GET INVOICES - Sent To App.Js For Formatting Date and Currency Fields

    const fetchInvoices = async () => { // HTTP GET
        const res = await fetch(Url)
        .catch((err) => console.log(err));     
        if (res === undefined) {
            const data = ["error"]
            return data;
        } else {
            const data = await res.json();
            SERVERLIST = data;
            return data;
        }
    }

    export const fetchData = fetchInvoices();

    // MARK INVOICE PAID

    const paidInvoice = (store, id) => { // STATE PAID
        paidUpdateReq(store, id);
        const state = store.map(item => item.id === id 
            ? {...item, status: 'paid'} : item);
        return state;
    }

    const paidUpdateReq = async (store, id) => { // HTTP PUT
        const invoice = SERVERLIST.filter(item => 
            item.id === id
        );
        const res = await fetch(`${Url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({...invoice[0], status: 'paid'})
        })
        .then(() => httpStatusAndReset("Mark Paid Request Fulfilled"))
        .catch(() => httpStatusAndReset("Mark Paid Request Failed")); 
    }

    // UPDATE INVOICE

    const updInvoice = (store, invoice) => { // STATE PAID
        updReq(store, invoice);
        const state = store.map(item => item.id === invoice.id 
            ? invoice : item);
        return state;
    }

    const updReq = async (store, invoice) => { // HTTP PUT
        const res = await fetch(`${Url}/${invoice.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(invoice)
        })
        .then(() => httpStatusAndReset("Update Invoice Request Fulfilled"))
        .catch(() => httpStatusAndReset("Update Invoice Request Failed")); 
    }

    // DELETE INVOICE

    const delInvoice = (store, id) => { // STATE DELETE
        delReq(id);
        const updateState = store.filter(invoice => invoice.id !== id);
        return updateState;
    }

    const delReq = async (id) => {
        const res = await fetch(`${Url}/${id}`, { // HTTP DELETE
            method: 'DELETE'
        })
        .then(() => httpStatusAndReset("Delete Request Fulfilled"))
        .catch(() => httpStatusAndReset("Delete Request Failed"));
        const data = await res; 
    }

// Invoice List - Fetched Data Is Modified in App.Js To Reformat Dates And Currencies And Then Sent To Invoice List

    const INVOICE_LIST = ['loading']

    export const [invoiceList, {initInvoices, addInvoice, markPaidInvoice, updateInvoice, deleteInvoice}] = 
        createReduxModule('invoice', INVOICE_LIST, {
            initInvoices: (store, invoice) => invoice,
            addInvoice: (store, invoice) => [...store, invoice],
            markPaidInvoice: (store, id) => paidInvoice(store, id),
            updateInvoice: (store, invoice) => updInvoice(store, invoice),
            deleteInvoice: (store, id) =>  delInvoice(store, id)
        });

// Invoice Formatted Toggle

    const FORMATTOGGLE = false;
        
    export const [toggleFormat, {setToggleFormat}] =
        createReduxModule('formatToggle', FORMATTOGGLE, {
            setToggleFormat: (toggle) => toggle
        });

// Invoice Content For Viewer/Editor

    const INVOICE = [];

    export const [invoice, {setInvoice}] = 
        createReduxModule('invoiceSet', INVOICE, {
            setInvoice: (store, invoice) => invoice
        });

// NightMode Toggler

    const NIGHTMODE = true;

    export const [nightMode, {toggleNightMode}] = 
        createReduxModule('nightToggle', NIGHTMODE, {
            toggleNightMode: (toggle) => !toggle
        });

// Delete Modal Toggle

    const DELETEMODALTOGGLE = false;
        
    export const [toggleDeleteModal, {setToggleDeleteModal}] =
        createReduxModule('deleteToggle', DELETEMODALTOGGLE, {
            setToggleDeleteModal: (store, toggle) => toggle
        });

// Error Modal Toggle

    const ERRORMODALTOGGLE = false;
        
    export const [toggleErrorModal, {setToggleErrorModal}] =
        createReduxModule('errorToggle', ERRORMODALTOGGLE, {
            setToggleErrorModal: (store, toggle) => toggle
        });


// Viewer Toggle

    const VIEWERTOGGLE = false;
    
    export const [toggleViewer, {setToggleViewer}] =
        createReduxModule('viewerToggle', VIEWERTOGGLE, {
            setToggleViewer: (store, toggle) => toggle
        });

// Create Or Edit Invoice Toggler

    const CreateEditTOGGLE = false;

    export const [toggleCreateEdit, {setToggleCreateEdit}] = 
        createReduxModule('createOrEditToggle', CreateEditTOGGLE, {
            setToggleCreateEdit: (store, toggle) => toggle
        });

// HTTP Request Response OK

    const HTTPOK = "No Request Made";
        
    export const [httpRes, {setHttpRes}] =
        createReduxModule('httpOk', HTTPOK, {
            setHttpRes: (store, toggle) => toggle
        });