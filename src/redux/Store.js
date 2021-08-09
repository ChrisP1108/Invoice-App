import { Url } from './fetchUrl';
import { createReduxModule } from 'hooks-for-redux';

let SERVERLIST = [];

// HTTP Requests & State Update

    // GET INVOICES

    const fetchInvoices = async () => {
        const res = await fetch(Url)
        .catch((err) => console.log(err)); 
        console.log(res);      
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

    const delInvoice = (store, id) => {
        delReq(id);
        const state = store.filter(item => item.id !== id);
        return state;
    }

    const delReq = async (id) => {
        const res = await fetch(`${Url}/${id}`, {
            method: 'DELETE'
        });
        const data = await res;
        console.log(`Delete Invoice Response: ${data.status} Ok: ${data.ok}`);       
    }

    // MARK INVOICE PAID

    const paidInvoice = (store, id) => {
        paidUpdateReq(id);
        const state = store.map(item => item.id === id 
            ? {...item, status: 'paid'} : item);
        return state;
    }

    const paidUpdateReq = async (id) => {
        const invoice = SERVERLIST.filter(invoice => 
            invoice.id === id);
        const res = await fetch(`${Url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({...invoice[0], status: 'paid'})
        });
        const data = await res;
        console.log(`Mark Invoice Paid Response: ${data.status} Ok: ${data.ok}`);
    }

// Invoice List

    const INVOICE_LIST = ['loading']

    export const [invoiceList, {initInvoices, addInvoice, markPaidInvoice, updateInvoice, deleteInvoice}] = 
        createReduxModule('invoice', INVOICE_LIST, {
            initInvoices: (store, invoice) => invoice,
            addInvoice: (store, invoice) => [...store, invoice],
            markPaidInvoice: (store, id) => paidInvoice(store, id),
            updateInvoice: (store, invoice) => (store.map((item) => item.id === invoice.id ? invoice : item)),
            deleteInvoice: (store, id) => delInvoice(store, id)
        });

// Invoice Formatted Toggle

const FORMATTOGGLE = false;
    
export const [toggleFormat, {setToggleFormat}] =
    createReduxModule('formatToggle', FORMATTOGGLE, {
        setToggleFormat: (toggle) => !toggle
    })

// Invoice Content For Viewer/Editor

    const INVOICE = [];

    export const [invoice, {setInvoice}] = 
        createReduxModule('invoiceSet', INVOICE, {
            setInvoice: (store, invoice) => invoice
        });

// NightMode Toggler

    const NIGHTMODE = false;

    export const [nightMode, {toggleNightMode}] = 
        createReduxModule('nightToggle', NIGHTMODE, {
            toggleNightMode: (toggle) => !toggle
        });

// Delete Modal Toggle

const DELETEMODALTOGGLE = false;
    
export const [toggleDeleteModal, {setToggleDeleteModal}] =
    createReduxModule('deleteToggle', DELETEMODALTOGGLE, {
        setToggleDeleteModal: (store, toggle) => toggle
    })

// Viewer Toggle

    const VIEWERTOGGLE = false;
    
    export const [toggleViewer, {setToggleViewer}] =
        createReduxModule('viewerToggle', VIEWERTOGGLE, {
            setToggleViewer: (toggle) => !toggle
        })

// Create Or Edit Invoice Toggler

    const CREATETOGGLE = false;

    export const [toggleCreate, {setToggleCreate}] = 
        createReduxModule('createToggle', CREATETOGGLE, {
            setToggleCreate: (toggle) => !toggle
        });