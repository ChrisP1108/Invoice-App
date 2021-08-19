import { Url } from './fetchUrl';
import { createReduxModule } from 'hooks-for-redux';

// Redux Store Contains Both State And HTTP Request Management

// HTTP Requests & State Update

    // HTTP Response Timer.  Sets HTTP Response Status State And Reverts Back To Starting Default After 1 Second

    const httpStatusAndReset = (res) => {
            SETHTTPRES(res);
            console.log(res);
        setTimeout(() => {
            SETHTTPRES("No Request Made");
        }, 1000);
    }

    // GET INVOICES - Sent To App.Js For Formatting Date and Currency Fields

    const fetchInvoices = async () => { // HTTP GET
        const res = await fetch(Url)
        .catch((err) => console.log(err));   
        if (res === undefined) {
            INITINVOICES(["error"]);
        } else {
            const data = await res.json();
            INITINVOICES(data);
        }
    }

    fetchInvoices();

    // SAVE AND SEND

    const saveSendInvoice = (store, invoice) => { // STATE
        addReq(store,invoice);
        return store;
    }

    const addReq = async (store, invoice) => { // HTTP POST
        invoice.status = 'pending';
        await fetch( Url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({...invoice })
        })
        .then(() => { 
            httpStatusAndReset("Save & Send Invoice Request Fulfilled");
            const updateState = store;
            updateState.push(invoice);
            INITINVOICES(updateState);
        })
        .catch(() => httpStatusAndReset("Save & Send Invoice Request Failed")); 
    }

    // SAVE AS DRAFT

    const draftInvoice = (store, invoice) => { // STATE
        addDraftReq(store, invoice);
        return store;
    }

    const addDraftReq = async (store, invoice) => { // HTTP POST
        invoice.status = 'draft'
        await fetch( Url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({...invoice })
        })
        .then(() => { 
            httpStatusAndReset("Add Draft Invoice Request Fulfilled");
            const updateState = store.concat(invoice);
            INITINVOICES(updateState);
        })
        .catch(() => httpStatusAndReset("Add Draft Invoice Request Failed")); 
    }

    // MARK AS PAID

    const markPaidInvoice = (store, id) => { // STATE
        paidUpdateReq(store, id);
        return store;
    }

    const paidUpdateReq = async (store, id) => { // HTTP PUT
        const invoice = store.filter(store => store.id === id);
        await fetch(`${Url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({...invoice[0], status: 'paid' })
        })
        .then(() => { 
            httpStatusAndReset("Mark Paid Request Fulfilled");
            invoice[0].status = 'paid';
            const updateState = store.map(list => list.id === invoice[0].id 
                ? invoice[0] : list);
            INITINVOICES(updateState);
        })
        .catch(() => httpStatusAndReset("Mark Paid Request Failed")); 
    }

    // SAVE CHANGES

    const saveChangeInvoice = (store, invoice) => { // STATE
        updReq(store, invoice);
        return store;
    }

    const updReq = async (store, invoice) => { // HTTP PUT
        invoice.status = 'pending'
        await fetch(`${Url}/${invoice.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({...invoice, status: 'pending'})
        })
        .then(() => { 
            httpStatusAndReset("Save Changes Request Fulfilled");
            invoice.status = 'pending';
            const updateState = store.map(list => list.id === invoice.id 
                ? invoice : list);
            INITINVOICES(updateState);
        })
        .catch(() => httpStatusAndReset("Save Changes Request Failed")); 
    }

    // DELETE INVOICE

    const delInvoice = (store, id) => { // STATE DELETE
        delReq(store, id);
        return store;
    }

    const delReq = async (store, id) => {
        await fetch(`${Url}/${id}`, { // HTTP DELETE
            method: 'DELETE'
        })
        .then(() => { 
            httpStatusAndReset("Delete Request Fulfilled");
            const updateState = store.filter(invoice => invoice.id !== id);
            INITINVOICES(updateState);
        })
        .catch(() => httpStatusAndReset("Delete Request Failed"));
    }

// Invoice List - Fetched Data Is Modified in App.Js To Reformat Dates And Currencies And Then Sent To Invoice List

    const INVOICE_LIST_START = ['loading']

    export const [INVOICELIST, {INITINVOICES, SAVEANDSENDINVOICE, SAVEASDRAFTINVOICE, 
            MARKASPAIDINVOICE, SAVECHANGESINVOICE, DELETEINVOICE }] = 
        createReduxModule('invoice', INVOICE_LIST_START, {
            INITINVOICES: (store, invoice) => invoice,
            SAVEANDSENDINVOICE: (store, invoice) => saveSendInvoice(store, invoice),
            SAVEASDRAFTINVOICE: (store, invoice) => draftInvoice(store, invoice),
            MARKASPAIDINVOICE: (store, id) => markPaidInvoice(store, id),
            SAVECHANGESINVOICE: (store, invoice) => saveChangeInvoice(store, invoice),
            DELETEINVOICE: (store, id) =>  delInvoice(store, id)
        });

// Invoice Content For Viewer/Editor

    const INVOICE_START = [];

    export const [INVOICE, {SETINVOICE}] = 
        createReduxModule('invoiceSet', INVOICE_START, {
            SETINVOICE: (store, invoice) => invoice
        });

// NIGHTMODE Toggler

    const NIGHTMODE_START = true;

    export const [NIGHTMODE, {TOGGLENIGHTMODE}] = 
        createReduxModule('nightToggle', NIGHTMODE_START, {
            TOGGLENIGHTMODE: (toggle) => !toggle
        });

// Delete Modal Toggle

    const DELETEMODALTOGGLE_START = false;
        
    export const [TOGGLEDELETEMODAL, {SETTOGGLEDELETEMODAL}] =
        createReduxModule('deleteToggle', DELETEMODALTOGGLE_START, {
            SETTOGGLEDELETEMODAL: (store, toggle) => toggle
        });

// Error Modal Toggle

    const ERRORMODALTOGGLE_START = false;
        
    export const [TOGGLEERRORMODAL, {SETTOGGLEERRORMODAL}] =
        createReduxModule('errorToggle', ERRORMODALTOGGLE_START, {
            SETTOGGLEERRORMODAL: (store, toggle) => toggle
        });


// Viewer Toggle

    const VIEWERTOGGLE_START = false;
    
    export const [TOGGLEVIEWER, {SETTOGGLEVIEWER}] =
        createReduxModule('viewerToggle', VIEWERTOGGLE_START, {
            SETTOGGLEVIEWER: (store, toggle) => toggle
        });

// Create Or Edit Invoice Toggler

    const CREATEOREDITTOGGLE_START = false;

    export const [TOGGLECREATEEDIT, {SETTOGGLECREATEEDIT}] = 
        createReduxModule('createOrEditToggle', CREATEOREDITTOGGLE_START, {
            SETTOGGLECREATEEDIT: (store, toggle) => toggle
        });

// HTTP Request Response OK

    const HTTPOK_START = "No Request Made";
        
    export const [HTTPRES, {SETHTTPRES}] =
        createReduxModule('httpOk', HTTPOK_START, {
            SETHTTPRES: (store, toggle) => toggle
        });