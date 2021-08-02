import { Url } from './fetchUrl';
import { createReduxModule } from 'hooks-for-redux';

// Invoices 

    const fetchInvoices = async () => {
        const res = await fetch(Url);
        const data = await res.json();
        return data;
    }

    const ACTUAL_INVOICELIST = fetchInvoices();

    export const [invoiceList, {addInvoice, updateInvoice, deleteInvoice}] = 
        createReduxModule('invoice', ACTUAL_INVOICELIST, {
            addInvoice: (store, invoice) => [...store, invoice],
            updateInvoice: (store, invoice) => store.map((item) => item.id === invoice.id ? {...store, invoice} : invoice),
            deleteInvoice: (store, invoice) => store.filter((item) => item.id !== invoice.id)
        });

// NightMode Toggler

    const NIGHTMODE = false;

    export const [nightMode, {toggleNightMode}] = 
        createReduxModule('nightToggle', NIGHTMODE, {
            toggleNightMode: (state) => !state
        });