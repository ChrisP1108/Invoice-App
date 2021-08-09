import { Url } from './fetchUrl';
import { createReduxModule } from 'hooks-for-redux';

let SERVERLIST = [];

// HTTP Requests From Server

    // GET INVOICES

    const fetchInvoices = async () => {
        const res = await fetch(Url);
        const data = await res.json();
        SERVERLIST = data;
        return data;
    }

    export const fetchData = fetchInvoices();

    // DELETE INVOICE

    const delInvoice = async (id) => {
        await fetch(`${Url}/${id}`, {
            method: 'DELETE'
        });
    }

    // MARK INVOICE PAID

    const paidInvoice = async (id) => {
        const invoice = SERVERLIST.filter(invoice => 
            invoice.id === id);
        const res = await fetch(`${Url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({...invoice[0], status: 'paid'})
        });

        const data = await res.json()
    }

// Invoice List

    const INVOICE_LIST = ['loading']

    export const [invoiceList, {initInvoices, addInvoice, markPaidInvoice, updateInvoice, deleteInvoice}] = 
        createReduxModule('invoice', INVOICE_LIST, {
            initInvoices: (store, invoice) => invoice,
            addInvoice: (store, invoice) => [...store, invoice],
            markPaidInvoice: (store, id) => paidInvoice(id),
            updateInvoice: (store, invoice) => (store.map((item) => item.id === invoice.id ? invoice : item)),
            deleteInvoice: (store, id) => delInvoice(id)
        });

// Invoice Content For Viewer

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

// Viewer Toggle

    const VIEWERTOGGLE = false;
    
    export const [toggleViewer, {setToggleViewer}] =
        createReduxModule('viewerToggle', VIEWERTOGGLE, {
            setToggleViewer: (toggle) => !toggle
        })

// Create Invoice Toggler

    const CREATETOGGLE = false;

    export const [toggleCreate, {setToggleCreate}] = 
        createReduxModule('createToggle', CREATETOGGLE, {
            setToggleCreate: (toggle) => !toggle
        });