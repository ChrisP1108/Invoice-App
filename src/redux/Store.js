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

    // FORMAT INVOICES TO BE ADDED/MARK PAID/UPDATED TO SERVER

    // const monthsArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July',
    //     'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // const toServerFormatting = (input) => {
    //     console.log(input);
    //     if (input.createdAt.slice(4,5) !== '-') {
    //         let createdDay = input.createdAt.slice(0, 2);
    //         createdDay = createdDay < 10 ? `0${createdDay}` : createdDay;
    //         let createdMonth = monthsArray.indexOf(input.createdAt.slice(3, 6)) + 1;
    //         createdMonth = createdMonth < 10 ? `0${createdMonth}` : createdMonth;
    //         const createdYear = input.createdAt.slice(7, 11);
    //         input.createdAt = `${createdYear}-${createdMonth}-${createdDay}`;
    //     }
    //     if (input.paymentDue.slice(4,5) !== '-') {
    //         let paymentDay = input.paymentDue.slice(0, 2);
    //         paymentDay = Number(paymentDay === 0 ? 1 : paymentDay);
    //         paymentDay = paymentDay < 10 ? `0${paymentDay}` : paymentDay;
    //         let paymentMonth = monthsArray.indexOf(input.paymentDue.slice(3, 6)) + 1;
    //         paymentMonth = paymentMonth < 10 ? `0${paymentMonth}` : paymentMonth;
    //         const paymentYear = input.paymentDue.slice(7, 11);
    //         input.paymentDue = `${paymentYear}-${paymentMonth}-${paymentDay}`;
    //     }
    //     if (typeof(input.total) == 'string') {
    //         let grandTotal = input.total.slice(2);
    //         input.total = grandTotal;
    //     }
    //     input.items.forEach(item => delete item.id);
    //     return input;
    // }

    // TALLYS ITEM TOTAL WHENEVER INVOICE IS SAVED OR UPDATED

    // const grandTotalTally = (input) => {
    //     let grandTotal = 0;
    //     input.items.forEach(item => {
    //         const amount = item.price * item.quantity;
    //         item.total = amount;
    //         grandTotal += amount;
    //     });
    //     input.total = grandTotal;
    //     return input;
    // }
    
    // FORMAT FETCHED INVOICES FOR STATE AND

    // const listFormatter = (data) => {

        // const dateFormat = (input) => {
        //     const day= input.slice(8, 10);
        //     let month = monthsArray[Number(input.slice(5, 7)) - 1];
        //     const year = input.slice(0, 4);
        //     const formatted = `${day} ${month} ${year}`;
        //     return formatted;
        // }

        // const currencyFormat = (amount) => {
        //     const output = `£ ${new Intl.NumberFormat ('en-UK', { style: 'currency', currency: 'GBP'}).format(amount).toString().slice(1)}`;
        //     return output;
        // }

    //     const formattedList = [];

    //     data.forEach(invoice => {
    //         if (invoice.createdAt === '') {
    //             formattedList.push({...invoice,  
    //             paymentDue: dateFormat(invoice.paymentDue), 
    //             total: currencyFormat(invoice.total) 
    //             })
    //         } else if (invoice.paymentDue === '') {
    //             formattedList.push({...invoice,  
    //             createdAt: dateFormat(invoice.createdAt), 
    //             total: currencyFormat(invoice.total) 
    //             })
    //         } else if (invoice.total === '') {
    //             formattedList.push({...invoice,  
    //             createdAt: dateFormat(invoice.createdAt), 
    //             paymentDue: dateFormat(invoice.paymentDue)
    //             })
    //         } else if (invoice.createdAt === '' && invoice.paymentDue === '') {
    //             formattedList.push({...invoice,  
    //             total: currencyFormat(invoice.total)
    //             })
    //         } else if (invoice.createdAt === '' && invoice.total === '') {
    //             formattedList.push({...invoice,  
    //             paymentDue: dateFormat(invoice.paymentDue),
    //             })
    //         } else if (invoice.paymentDue === '' && invoice.total === '') {
    //             formattedList.push({...invoice,  
    //             createdAt: dateFormat(invoice.paymentDue),
    //             })
    //         } else if (invoice.createdAt === '' && invoice.paymentDue === '' && invoice.total === '') {
    //             formattedList.push(invoice)
    //         } else {
    //             formattedList.push({...invoice, 
    //             createdAt: dateFormat(invoice.createdAt), 
    //             paymentDue: dateFormat(invoice.paymentDue), 
    //             total: currencyFormat(invoice.total)
    //             }) 
    //         }     
    //     });

    //     let idAssign = 0;

    //     formattedList.forEach(itemlist => {
    //         itemlist.items.forEach(item => {
    //             item.id = idAssign;
    //             idAssign += 1;
    //         });
    //         idAssign = 0;
    //     });
    //     INITINVOICES(formattedList);
    //     return(formattedList);
    // }

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
            const updateState = store.map(list => list.id === invoice.id 
                ? invoice : list);
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
        await fetch(`${Url}/${invoice.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({...invoice, status: 'pending'})
        })
        .then(() => { 
            httpStatusAndReset("Save Changes Request Fulfilled");
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