import { Url } from './fetchUrl';
import { createReduxModule } from 'hooks-for-redux';


// HTTP Requests From Server

    // GET

    const fetchInvoices = async () => {
        const res = await fetch(Url);
        const data = await res.json(); 
        return data;
    }

    export const fetchData = fetchInvoices();

// Invoice List

    const INVOICE_LIST = ['loading']

    export const [invoiceList, {initInvoices}] = 
        createReduxModule('invoice', INVOICE_LIST, {
            initInvoices: (store, invoice) => invoice,        
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