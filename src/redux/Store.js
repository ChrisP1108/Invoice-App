import { Url } from './fetchUrl';
import { createReduxModule } from 'hooks-for-redux';

let SERVERLIST = [];

// Redux Store Contains Both State And HTTP Request Management

// HTTP Requests & State Update

    // HTTP Response Timer.  Sets HTTP Response Status State And Reverts Back To Starting Default After 1 Second

    const httpStatusAndReset = (res) => {
        switch (res) {
            case false:
                console.log("Request Failed");
                setHttpRes("Request Failed");
                break;
            case true:
                console.log("Request Fulfilled");
                setHttpRes("Request Fulfilled");
                break;
            default:
                console.log(res);
                break;
        }
        setTimeout(() => {
            setHttpRes("No Request Made");
        }, 2000);
    }

    // GET INVOICES - Sent To App.Js For Formatting

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
        .then((res) => httpStatusAndReset(true))
        .catch((err) => httpStatusAndReset(false)); 
        // const data = await res;
        // if (data === undefined) {
        //     httpStatusAndReset(false)
        // } else {
        //     httpStatusAndReset(true);
        // }
    }

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
        .catch((err) => console.log(err)); 
        const data = await res;
        if (data === undefined) {
            httpStatusAndReset(false)
        } else {
            httpStatusAndReset(true);
        }
    }

// Invoice List - Fetched Data Is Modified in App.Js To Reformat Dates And Currencies And Then Sent To Invoice List

    const INVOICE_LIST = ['loading']

    export const [invoiceList, {initInvoices, addInvoice, markPaidInvoice, updateInvoice, deleteInvoice}] = 
        createReduxModule('invoice', INVOICE_LIST, {
            initInvoices: (store, invoice) => invoice,
            addInvoice: (store, invoice) => [...store, invoice],
            markPaidInvoice: (store, id) => paidInvoice(store, id),
            updateInvoice: (store, invoice) => (store.map((item) => item.id === invoice.id ? invoice : item)),
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

// Loading Spinner Toggle

    const SPINNERTOGGLE = false;
        
    export const [toggleButtonSpinner, {setToggleButtonSpinner}] =
        createReduxModule('spinnerToggle', SPINNERTOGGLE, {
            setToggleButtonSpinner: (store, toggle) => toggle
        });