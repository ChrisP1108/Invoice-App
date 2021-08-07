import { Url } from './fetchUrl';
import { createReduxModule } from 'hooks-for-redux';


// HTTP Requests From Server

    const fetchInvoices = async () => {
        const res = await fetch(Url);
        const data = await res.json();
        return data;
    }

    
    const FETCH_INVOICELIST = fetchInvoices();

    export const [fetchInvoiceList, {addInvoice, updateInvoice, deleteInvoice}] = 
        createReduxModule('invoice', FETCH_INVOICELIST, {
            addInvoice: (store, invoice) => [...store, invoice],
            updateInvoice: (store, invoice) => store.map((item) => item.id === invoice.id ? {...store, invoice} : invoice),
            deleteInvoice: (store, invoice) => store.filter((item) => item.id !== invoice.id)
        });

// NightMode Toggler

    const NIGHTMODE = false;

    export const [nightMode, {toggleNightMode}] = 
        createReduxModule('nightToggle', NIGHTMODE, {
            toggleNightMode: (toggle) => !toggle
        });

// Viewer Toggle

    const VIEWERTOGGLE = false;
    
    export const [toggleViewer, {setToggleViewer}] =
        createReduxModule('viewerToggle', VIEWERTOGGLE, {
            setToggleViewer: (toggle) => !toggle
        })

// Invoice Content For Viewer

    const INVOICE = [];

    export const [invoice, {setInvoice}] = 
        createReduxModule('invoiceSet', INVOICE, {
            setInvoice: (store, invoice) => invoice
        });

// Create Invoice Toggler

    const CREATETOGGLE = false;

    export const [toggleCreate, {setToggleCreate}] = 
        createReduxModule('createToggle', CREATETOGGLE, {
            setToggleCreate: (toggle) => !toggle
        });