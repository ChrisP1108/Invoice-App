import ButtonReqSpinner from './ButtonReqSpinner';
import { useState } from 'react';
import { optionTerms } from '../Arrays/Options';
import { monthsArray } from '../Arrays/Months';
import { NewInvoiceTemplate, ItemAddSchema } from '../New-Invoice-Template';
import { INVOICE, SETINVOICE,
    MARKASPAIDINVOICE, SETTOGGLEDELETEMODAL, SETHTTPRES, HTTPRES, 
    TOGGLEERRORMODAL, SETTOGGLEERRORMODAL, SETTOGGLEVIEWER, 
    SETTOGGLECREATEEDIT, SAVECHANGESINVOICE, SAVEANDSENDINVOICE, 
    SAVEASDRAFTINVOICE, UPDATEINVOICE } from '../redux/Store.js';

const CreateOrEdit = () => {

    const date = new Date();
    const dayOfWeek = date.getDay();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const currentDate = new Date().toString();
    const currentMonth = currentDate.slice(4, 7);
    const currentYear = currentDate.slice(11, 15);
    const startingDate = `${currentMonth} ${currentYear}`;

    const valuesCheck = (items) => {
        Object.values(items).forEach(item => {
            if (item === '' || item === null || item === 0 || item < 0) {
                blankFieldTally += 1;
            }
        });
    }

    const fieldsEval = () => {
        const data = invoiceEdit; 
        // Final Item Price Calculations Before Evaluating Object
        setInvoiceEdit({...data});
        blankFieldTally = 0;
        blankItemTally = 0;
        valuesCheck(invoiceEdit);
        valuesCheck(invoiceEdit.senderAddress);
        valuesCheck(invoiceEdit.clientAddress);
        invoiceEdit.items.forEach(item => {
            if (item.name === '') {
                blankItemTally += 1;
            }
            if (item.quantity === 0) {
                blankItemTally += 1;
            }
            if (item.price === 0) {
                blankItemTally += 1;
            }
        });
        blankFieldTally > 0 ? setEmptyFields(true) : setEmptyFields(false);
        const fieldPass = blankFieldTally > 0 ? false : true;
        const itemPass = blankItemTally > 0 ? false : true;
        if (fieldPass) { 
            setEmptyFields(false);
        } else {
            setEmptyFields(true);
        }
        if (itemPass) { 
            setEmptyItems(false);
        } else {
            setEmptyItems(true);
        }
        return itemPass && fieldPass ? true : false;
    }

    if (HTTPRES() === "Save Changes Request Failed") {
        setTimeout(() => {
            SETTOGGLEERRORMODAL(true);
            setSaveChangeSpinner(false);
        }, 500);
    } 
    if (HTTPRES() === "Save Changes Request Fulfilled") {
        setTimeout(() => {
            setSaveChangeSpinner(false);
            SETINVOICE(invoiceEdit);
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

    const saveChangesInvoiceToggle = () => {
        fieldsEval();
        if (fieldsEval()) {
            setSaveChangeSpinner(true);
            SETHTTPRES("Save Changes Request Pending");
            SAVECHANGESINVOICE(invoiceEdit);
        } else console.log("Fields & Or Items Are Empty");
    }

    const saveAndSendInvoiceInitiate = (type) => {
        if (type === 'Save') {
            setSaveSendSpinner(true);
            SETHTTPRES("Save & Send Invoice Request Pending");
            SAVEANDSENDINVOICE(invoiceEdit);
        } else if (type === 'Draft') {
            setDraftSpinner(true);
            SETHTTPRES("Add Draft Invoice Request Pending");
            SAVEASDRAFTINVOICE(invoiceEdit);
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

    const input = INVOICE().id === undefined ? NewInvoiceTemplate : INVOICE();

    const randomIdGenerator = () => {  
        let alphabet;
        let letters;
        let numbers;
        let id;
        for (let i = 0; i < 1; i++) {
            alphabet = "abcdefghijklmnopqrstuvwxyz";
            letters = alphabet[Math.floor(Math.random() * alphabet.length)].toUpperCase()
                + alphabet[Math.floor(Math.random() * alphabet.length)].toUpperCase();
            numbers = Math.ceil(Math.random() * 9999);
            numbers < 10 ? numbers = `000${numbers}`
            : numbers < 100 ? numbers = `00${numbers}`
            : numbers < 1000 ? numbers = `0${numbers}`
            : numbers = `${numbers}`
            id = `${letters}${numbers}`;
            if (input.id.includes(id)) {
                i -= 1;
            }
        }
        return id;
    }

    const newInvoiceId = randomIdGenerator();

    input.id = input.id === '' ? newInvoiceId : input.id;

    const calStartingState = {
        header: startingDate,
        totalTally: 0,
        monthTally: month,
        yearTally: year,
        prevMonthNumbers: [],
        monthNumbers: [],
        postMonthNumbers: []
    }

    const [invoiceEdit, setInvoiceEdit] = useState(input);
    const [toggleTerms, setToggleTerms] = useState(false);
    const [emptyFields, setEmptyFields] = useState(false);
    const [emptyItems, setEmptyItems] = useState(false);
    const [toggleCalendar, setToggleCalendar] = useState(false);
    const [calState, setCalState] = useState(calStartingState);
    const [saveChangeSpinner, setSaveChangeSpinner] = useState(false);
    const [draftSpinner, setDraftSpinner] = useState(false);
    const [saveSendSpinner, setSaveSendSpinner] = useState(false);
    const [itemClicked, setItemClicked] = useState(false);


    invoiceEdit.id === '' && setInvoiceEdit({...invoiceEdit, id: newInvoiceId});

    let blankFieldTally;
    let blankItemTally;

    blankFieldTally > 0 && setEmptyFields(true);
    
    const backHeader = () => {
        return (
            <div onClick={() => SETTOGGLECREATEEDIT(false)} 
                className="back-container pointer position-relative">
                <div className="back-arrow"></div>
                <div className="d-flex">
                    <h3>Go back</h3>
                </div>
                <div className="back-container-filler"></div>
            </div>
        )
    }

    const title = () => {
        return (
            <div className="createoredit-title">
                {INVOICE().id === undefined ?
                    <h1>New Invoice</h1>
                    : <h1>Edit <span>#</span>{invoiceEdit.id}</h1>
                }
            </div>
        )
    }

    const formStateUpdate = (type, value, id) => {
        let data = invoiceEdit;
        const index = id === undefined ? invoiceEdit.items.length - 1 : id; 
        switch (type) {
            case 'senderAddress.street':
                data.senderAddress.street = value;
                break;
            case 'senderAddress.city':
                data.senderAddress.city = value;
                break;
            case 'senderAddress.postCode':
                data.senderAddress.postCode = value;
                break;
            case 'senderAddress.country':
                data.senderAddress.country = value;
                break;
            case 'clientName':
                data.clientName = value;
                break;
            case 'clientEmail':
                data.clientEmail = value;
                break;
            case 'clientAddress.street':
                data.clientAddress.street = value;
                break;
            case 'clientAddress.city':
                data.clientAddress.city = value;
                break;
            case 'clientAddress.postCode':
                data.clientAddress.postCode = value;
                break;
            case 'clientAddress.country':
                data.clientAddress.country = value;
                break;
            case 'createdAt':
                data.clientAddress.createdAt = value;
                break;
            case 'paymentTerms':
                data.paymentTerms = value;
                setToggleTerms(false);
                setCalendarDate('payment');
                break;
            case 'description':
                data.description = value;
                break;
            case 'item.name':
                data.items[index].name = value;
                break;
            case 'item.quantity':
                value < 0  ? data.items[index].quantity = Number(0)
                : data.items[index].quantity = Number(value);
                break;
            case 'item.price':
                value < 0  ? data.items[index].price = 0
                : data.items[index].price = Number(value);
                break;
            case 'deleteItem':
                if (data.items.length == 1) {
                    break;
                }
                data.items.splice(index, 1)
                console.log(data);
                break;
            case 'addItem':
                const newItem = ItemAddSchema;
                const id = index;
                newItem.id = id;
                data.items.push(newItem);
            default:
                break;
        }
        setInvoiceEdit({...data});
    }

    const termsMapping = optionTerms.map(option => {
        return (
            <div onClick={() => formStateUpdate('paymentTerms', option.days)}
                key={option.id} 
                className={`${option.id == 1 ? `createoredit-option-first`
                : option.id == 4 ? `createoredit-option-last` : ``} createoredit-option pointer`}
                style={{ borderBottom: option.id == 4 && `0rem $white solid` }}>
                <span>{option.name}</span>
            </div>
        )
    });

    const errorStylingEval = (field) => {
        if (!emptyFields && !emptyItems) {
            return false
        }
        if (field === '' || field == 0 || field === null) {
            return true
        } else return false
    }

    const itemsMapping = invoiceEdit.items.map(item => {

        const itemTotal = (item.quantity * item.price).toFixed(2);

        return (
            <div key={item.id} className="createoredit-trans-item">
                <div className="createoredit-form-row-full-container f-clb">
                    <div className="f-sb">
                        <h4 className={errorStylingEval(item.name) 
                                && `createoredit-error-highlight`}>Item Name</h4>
                        {errorStylingEval(item.name) 
                            && <p>can't be empty</p>}
                    </div>
                    <input 
                        type="text"
                        name="item.name"
                        value={item.name}
                        onChange={(e) => formStateUpdate(e.target.name, e.target.value, item.id)}                            
                        className={errorStylingEval(item.name) 
                            ? `createoredit-field-error` : `createoredit-field`}> 
                    </input>
                </div>
                <div className="d-flex">
                    <div className="createoredit-form-row-full-container f-clb">
                    <div className="f-sb">
                        <h4 className={errorStylingEval(item.quantity) 
                                && `createoredit-error-highlight`}>Qty.</h4>
                        {errorStylingEval(item.quantity) 
                            && <p>can't be 0</p>}
                    </div>
                        <input 
                            type="number"
                            name="item.quantity"
                            value={item.quantity}
                            onChange={(e) => formStateUpdate(e.target.name, e.target.value, item.id)}
                            className={errorStylingEval(item.quantity)  
                                ? `createoredit-field-error` : `createoredit-field`}> 
                        </input>
                    </div>
                    <div className="createoredit-column-gap"></div>
                    <div className="createoredit-form-row-full-container f-clb">
                        <div className="f-sb">
                            <h4 className={errorStylingEval(item.price) 
                                && `createoredit-error-highlight`}>Price</h4>
                            {errorStylingEval(item.price)
                            && <p>can't be 0</p>}
                        </div>
                        <input 
                            type="number"
                            name="item.price"
                            value={item.price.toFixed(2)}
                            onChange={(e) => formStateUpdate(e.target.name, e.target.value, item.id)}
                            className={errorStylingEval(item.price) 
                            ? `createoredit-field-error` : `createoredit-field`}> 
                        </input>
                    </div>
                    <div className="createoredit-column-gap"></div>
                    <div className="createoredit-form-row-full-container f-clb">
                        <h4>Total</h4>
                        <div className="createoredit-item-total">
                            <h4><span>{itemTotal}</span></h4>
                            <div className="position-relative">
                                <div>
                                    <div className="createoredit-item-trash-icon"></div>
                                <div 
                                    onClick={() => {formStateUpdate('deleteItem', item, item.id);
                                        setItemClicked(false)}}
                                    className="createoredit-item-trash-filler pointer">         
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="createoredit-item-separation-margin"></div>
            </div>
        )
    });

    const calendarDateGenerator = (increment) => {
        const data = calState;

        if (increment === '-') {
            if (data.totalTally == 0) {
                return;
            }
            data.totalTally -= 1;
            data.monthTally -= 1;
        } else if (increment === '+') {
            data.totalTally += 1;
            data.monthTally += 1;
        }

        if (data.monthTally > 11) {
            data.monthTally = 0;
            data.yearTally += 1;
        } else if (data.monthTally < 0) {
            data.monthTally = 11;
            data.yearTally -= 1;
        } 

        const monthText = monthsArray[data.monthTally];       
        const headerOutput = `${monthText} ${data.yearTally}`;
        data.header = headerOutput;

        const daysInMonth = new Date(data.yearTally, data.monthTally, 0).getDate();
        const prevDaysInMonth = new Date(data.monthTally == 0 ? data.yearTally - 1 
            : data.yearTally, data.monthTally - 1, 0).getDate();
        const startingDayOfWeek = new Date(data.yearTally, data.monthTally, 1).getDay();
        let numbersTally = 0;
        const prevNumbersArray = [];
        const numbersArray = [];
        const postNumbersArray = [];
        if (startingDayOfWeek !== 0) {
            let prevDaysOfMonth = prevDaysInMonth - startingDayOfWeek;
            for (let i = 1; i <= startingDayOfWeek; i++) {
                prevNumbersArray.push(prevDaysOfMonth);
                prevDaysOfMonth += 1;
                numbersTally += 1;
            }
        }
        for (let j = 1; j <= daysInMonth; j++) {
            numbersArray.push(j);
            numbersTally += 1;
        }
        if (numbersTally < 42) {
            for (let k = 1; numbersTally < 42; k++) {
                postNumbersArray.push(k);
                numbersTally += 1;
            }
        }
        data.prevMonthNumbers = prevNumbersArray;
        data.monthNumbers = numbersArray;
        data.postMonthNumbers = postNumbersArray;
        setCalState({...calState, data});
    }

    const setCalendarDate = (input) => {
        if (input !== 'payment') {
            const actualMonth = calState.monthTally + 1;
            const month = actualMonth < 10 ? `0${actualMonth}` 
                : actualMonth;
            const number = input < 10 ? `0${input}` 
                : input;
            const createdAtUpdate = invoiceEdit;
            createdAtUpdate.createdAt = `${number} ${calState.header}`;
            setInvoiceEdit({...createdAtUpdate});
            console.log(`${number} ${calState.header}`);
            setToggleCalendar(false);
        }
        const createdDateNumber = Number(invoiceEdit.createdAt.slice(0, 2));
        const paymentDueFullDate = new Date(calState.yearTally, 
            calState.monthTally, createdDateNumber + invoiceEdit.paymentTerms);
        let paymentDueDate = paymentDueFullDate.getDate();
        paymentDueDate = paymentDueDate == 0 ? 1 : paymentDueDate;
        paymentDueDate = paymentDueDate < 10 ? `0${paymentDueDate}` : paymentDueDate;
        let paymentDueMonth = paymentDueFullDate.getMonth() + 1;
        paymentDueMonth = paymentDueMonth < 10 ? `0${paymentDueMonth}` : paymentDueMonth;
        let paymentDueYear = paymentDueFullDate.getFullYear();
        const paymentDueUpdate = invoiceEdit;
        paymentDueUpdate.paymentDue = `${paymentDueYear}-${paymentDueMonth}-${paymentDueDate}`;
        setInvoiceEdit({...paymentDueUpdate});
    }

    const calendarPrevNumbers = calState.prevMonthNumbers.map(number => {
        return (
            <h6 className="o10">{number}</h6>
        )
    });

    const calendarNumbers = calState.monthNumbers.map(number => {
        return (
            <h6 onClick={() => setCalendarDate(number)}
                className="createoredit-calendar-day">{number}</h6>
        )
    });

    const calendarPostNumbers = calState.postMonthNumbers.map(number => {
        return (
            <h6 className="o10">{number}</h6>
        )
    });

    const calendarMenu = () => {
        return (
            <div className="createoredit-calendar-outer-container position-absolute">
                <div className="createoredit-calendar-inner-main-container f-sb flex-column">
                    <div className="createoredit-calendar-inner-top-container">  
                        <div className="f-ca">
                            <div className="createoredit-calendar-left-arrow position-relative">
                                <div onClick={() => calendarDateGenerator('-')}
                                    className="createoredit-calendar-arrow-left-filler pointer"></div>
                            </div>
                                <span>{calState.header}</span>
                            <div className="createoredit-calendar-right-arrow position-relative">
                                <div onClick={() => calendarDateGenerator('+')}
                                    className="createoredit-calendar-arrow-right-filler pointer"></div>
                            </div>
                        </div>
                    </div>
                    <div className="createoredit-calendar-days-container">
                        {calendarPrevNumbers}
                        {calendarNumbers}
                        {calendarPostNumbers}
                    </div>
                </div>
            </div>
        )
    }

    const dateFormat = (input) => {
        const day= input.slice(8, 10);
        let month = monthsArray[Number(input.slice(5, 7)) - 1];
        const year = input.slice(0, 4);
        const formatted = `${day} ${month} ${year}`;
        return formatted;
    }

    const formBody = () => {
        return (
            <>
                <div className="createoredit-bill-top-margin">
                    <h2>Bill From</h2>
                </div>
                <div 
                    className="createoredit-form-row-full-container f-clb">
                        <div className="f-sb">
                            <h4 className={errorStylingEval(invoiceEdit.senderAddress.street) 
                                && `createoredit-error-highlight`}>Street Address</h4>
                            {errorStylingEval(invoiceEdit.senderAddress.street)
                            && <p>can't be empty</p>}
                        </div>
                        <input 
                            type="text"
                            name="senderAddress.street"
                            value={invoiceEdit.senderAddress.street}
                            onChange={(e) => formStateUpdate(e.target.name, e.target.value)}
                            className={errorStylingEval(invoiceEdit.senderAddress.street) 
                                ? `createoredit-field-error` : `createoredit-field`}>
                        </input>
                </div>
                <div className="d-flex">
                    <div className="createoredit-form-row-full-container f-clb">
                        <div className="f-sb">
                            <h4 className={errorStylingEval(invoiceEdit.senderAddress.city) 
                                && `createoredit-error-highlight`}>City</h4>
                            {errorStylingEval(invoiceEdit.senderAddress.city)
                            && <p>can't be empty</p>}
                        </div>
                        <input  
                            type="text"
                            name="senderAddress.city"
                            value={invoiceEdit.senderAddress.city}
                            onChange={(e) => formStateUpdate(e.target.name, e.target.value)}
                            className={errorStylingEval(invoiceEdit.senderAddress.city) 
                            ? `createoredit-field-error` : `createoredit-field`}>
                        </input>
                    </div>
                    <div className="createoredit-column-gap"></div>
                    <div className="createoredit-form-row-full-container f-clb">
                        <div className="f-sb">
                            <h4 className={errorStylingEval(invoiceEdit.senderAddress.postCode) 
                                && `createoredit-error-highlight`}>Post Code</h4>
                            {errorStylingEval(invoiceEdit.senderAddress.postCode)
                            && <p>can't be empty</p>}
                        </div>
                        <input 
                            type="text"
                            name="senderAddress.postCode"
                            value={invoiceEdit.senderAddress.postCode}
                            onChange={(e) => formStateUpdate(e.target.name, e.target.value)}
                            className={errorStylingEval(invoiceEdit.senderAddress.postCode) 
                                ? `createoredit-field-error` : `createoredit-field`}> 
                            </input>
                    </div>
                </div>
                <div className="createoredit-form-row-full-container f-clb">
                        <div className="f-sb">
                            <h4 className={errorStylingEval(invoiceEdit.senderAddress.country) 
                                && `createoredit-error-highlight`}>Country</h4>
                            {errorStylingEval(invoiceEdit.senderAddress.country)
                            && <p>can't be empty</p>}
                        </div>
                    <input 
                        type="text"
                        name="senderAddress.country"
                        value={invoiceEdit.senderAddress.country}
                        onChange={(e) => formStateUpdate(e.target.name, e.target.value)}
                        className={errorStylingEval(invoiceEdit.senderAddress.country) 
                            ? `createoredit-field-error` : `createoredit-field`}> 
                    </input>
                </div>
                <div className="createoredit-bill-margin">
                    <h2>Bill To</h2>
                </div>
                <div className="createoredit-form-row-full-container f-clb">
                    <div className="f-sb">
                        <h4 className={errorStylingEval(invoiceEdit.clientName) 
                                && `createoredit-error-highlight`}>Client's Name</h4>
                        {errorStylingEval(invoiceEdit.clientName)
                            && <p>can't be empty</p>}
                    </div>
                    <input  
                        type="text"
                        name="clientName"
                        value={invoiceEdit.clientName}
                        onChange={(e) => formStateUpdate(e.target.name, e.target.value)}
                        className={errorStylingEval(invoiceEdit.clientName) 
                            ? `createoredit-field-error` : `createoredit-field`}>
                    </input>
                </div>
                <div className="createoredit-form-row-full-container f-clb">
                    <div className="f-sb">
                        <h4 className={errorStylingEval(invoiceEdit.clientEmail) 
                                && `createoredit-error-highlight`}>Client's Email</h4>
                        {errorStylingEval(invoiceEdit.clientEmail)
                            && <p>can't be empty</p>}
                    </div>
                    <input  
                        type="text"
                        name="clientEmail"
                        value={invoiceEdit.clientEmail}
                        onChange={(e) => formStateUpdate(e.target.name, e.target.value)}
                        className={errorStylingEval(invoiceEdit.clientEmail) 
                        ? `createoredit-field-error` : `createoredit-field`}>
                    </input>
                </div>
                <div className="createoredit-form-row-full-container f-clb">
                    <div className="f-sb">
                        <h4 className={errorStylingEval(invoiceEdit.clientAddress.street) 
                                && `createoredit-error-highlight`}>Street Address</h4>
                        {errorStylingEval(invoiceEdit.clientAddress.street)
                            && <p>can't be empty</p>}
                    </div>
                    <input 
                        type="text"
                        name="clientAddress.street"
                        value={invoiceEdit.clientAddress.street}
                        onChange={(e) => formStateUpdate(e.target.name, e.target.value)}
                        className={errorStylingEval(invoiceEdit.clientAddress.street) 
                        ? `createoredit-field-error` : `createoredit-field`}> 
                    </input>
                </div>
                <div className="d-flex">
                    <div className="createoredit-form-row-full-container f-clb">
                        <div className="f-sb">
                            <h4 className={errorStylingEval(invoiceEdit.clientAddress.city) 
                                && `createoredit-error-highlight`}>City</h4>
                            {emptyFields && invoiceEdit.clientAddress.city === ''
                            && <p>can't be empty</p>}
                        </div>
                        <input 
                            type="text"
                            name="clientAddress.city"
                            value={invoiceEdit.clientAddress.city}
                            onChange={(e) => formStateUpdate(e.target.name, e.target.value)}
                            className={errorStylingEval(invoiceEdit.clientAddress.city) 
                            ? `createoredit-field-error` : `createoredit-field`}> 
                        </input>
                    </div>
                    <div className="createoredit-column-gap"></div>
                    <div className="createoredit-form-row-full-container f-clb">
                        <div className="f-sb">
                            <h4 className={errorStylingEval(invoiceEdit.clientAddress.postCode) 
                                && `createoredit-error-highlight`}>Post Code</h4>
                            {errorStylingEval(invoiceEdit.clientAddress.postCode)
                            && <p>can't be empty</p>}
                        </div>
                        <input 
                            type="text"
                            name="clientAddress.postCode"
                            value={invoiceEdit.clientAddress.postCode}
                            onChange={(e) => formStateUpdate(e.target.name, e.target.value)}
                            className={errorStylingEval(invoiceEdit.clientAddress.postCode) 
                            ? `createoredit-field-error` : `createoredit-field`}> 
                        </input>
                    </div>
                </div>
                <div className="createoredit-form-row-full-container f-clb">
                    <div className="f-sb">
                        <h4 className={errorStylingEval(invoiceEdit.clientAddress.country) 
                                && `createoredit-error-highlight`}>Country</h4>
                        {errorStylingEval(invoiceEdit.clientAddress.country)
                            && <p>can't be empty</p>}
                    </div>
                    <input 
                        type="text"
                        name="clientAddress.country"
                        value={invoiceEdit.clientAddress.country}
                        onChange={(e) => formStateUpdate(e.target.name, e.target.value)}
                        className={errorStylingEval(invoiceEdit.clientAddress.country) 
                        ? `createoredit-field-error` : `createoredit-field`}> 
                    </input>
                </div>
                <div className="createoredit-invoice-top-gap"></div>
                <div className={`${INVOICE().id === undefined && `d-none`} createoredit-form-row-full-container 
                    createoredit-invoice-disabled f-clb`}>
                    <h4>Invoice Date</h4>
                    <div className="createoredit-date-disabled f-sb">
                        <h4><span>{dateFormat(invoiceEdit.createdAt)}</span></h4>
                        <div className="createoredit-calendar-icon"></div>
                    </div>   
                </div>
                <div className={`${INVOICE().id !== undefined && `d-none`} 
                        createoredit-form-row-full-container f-clb position-relative`}>
                    <div className="f-sb">
                        <h4 className={errorStylingEval(invoiceEdit.createdAt) 
                                && `createoredit-error-highlight`}>Invoice Date</h4>
                        {emptyFields && invoiceEdit.createdAt === ''
                            && <p>date must be selected</p>}
                    </div>
                    <div className="f-sb">
                        <div onClick={() => {setToggleCalendar(!toggleCalendar); 
                            setToggleTerms(false); calendarDateGenerator()}}
                            className={`${errorStylingEval(invoiceEdit.createdAt) 
                            ? `createoredit-field-error` : `createoredit-field`} 
                            createoredit-date-active f-sb pointer`}> 
                                <span>{invoiceEdit.createdAt === '' ? `Select Invoice Date` : invoiceEdit.createdAt}</span>
                                <div className="createoredit-calendar-icon"></div>
                        </div>
                    </div>
                    {toggleCalendar && !toggleTerms && calendarMenu()}
                </div>
                <div className="position-relative">
                    <div className="createoredit-form-row-full-container f-clb">
                        <div className="f-sb">
                            <h4 className={errorStylingEval(invoiceEdit.paymentTerms) 
                                && `createoredit-error-highlight`}>Payment Terms</h4>
                            {errorStylingEval(invoiceEdit.paymentTerms)
                            && <p>payment term must be selected</p>}
                        </div>
                        <div onClick ={() => {setToggleTerms(!toggleTerms); setToggleCalendar(false)}} 
                            className={`${errorStylingEval(invoiceEdit.paymentTerms) 
                                ? `createoredit-field-error` : `createoredit-field`} f-sb pointer`}>
                            <span className={`${invoiceEdit.paymentTerms !== null && `d-none`}`}>
                                Select Payment Status
                            </span>
                            <span className={`${invoiceEdit.paymentTerms == null && `d-none`}`}>
                                Net {invoiceEdit.paymentTerms} Day{invoiceEdit.paymentTerms > 1 ? 's' : ''}
                            </span>
                            <div className="f-c">
                                <div className={`${toggleTerms 
                                    && `createoredit-option-arrow-clicked`} createoredit-option-arrow`}></div>
                            </div>
                        </div>
                    </div>
                    <div className={`${toggleTerms && !toggleCalendar ? `createoredit-option-trans` : `d-none`} position-absolute w-100`}>
                        {termsMapping}
                    </div>
                </div>
                <div className="createoredit-form-row-full-container f-clb">
                    <div className="f-sb">
                        <h4 className={errorStylingEval(invoiceEdit.description) 
                                && `createoredit-error-highlight`}>Project / Description</h4>
                        {emptyFields && invoiceEdit.description === ''
                            && <p>can't be empty</p>}
                    </div>
                    <input 
                        type="text"
                        name="description"
                        value={invoiceEdit.description}
                        onChange={(e) => formStateUpdate(e.target.name, e.target.value)}
                        className={errorStylingEval(invoiceEdit.description) 
                            ? `createoredit-field-error` : `createoredit-field`}> 
                    </input>
                </div>
                <div className="createoredit-item-list-container">
                    <h5>Item List</h5>
                    {itemsMapping}
                </div>
                <div 
                    onClick={() => {formStateUpdate('addItem', null, invoiceEdit.items.length);
                                    setItemClicked(true);}}
                    className={`${invoiceEdit.items.length === 0 
                        && `createoredit-item-empty-button-gap`} 
                        ${itemClicked && `d-none`} createoredit-item-add-button pointer f-c`}>
                    <h4>+ Add New Item</h4>
                </div>
                <div className="createoredit-bottom-filler">
                    <div className="createoredit-bottom-filler-error-text f-clb">
                        <p className={!emptyFields && `d-none`}>- All fields must be added</p>
                        <p className={!emptyItems && `d-none`}>- An item must be added</p>
                    </div>
                </div>
            </>
        )
    }



    const footerButtons = () => { 
        return (
            <div className="createoredit-footer-outer-container f-c">
                <div className="createoredit-footer-inner-container f-e f-c">
                    <div onClick={() => SETTOGGLECREATEEDIT(false)}
                        className={`${INVOICE().id === undefined && `d-none`} createoredit-cancel-button-container f-c pointer`}>
                            <h3>Cancel</h3>
                    </div>
                    <div onClick={() => SETTOGGLECREATEEDIT(false)}
                        className={`${INVOICE().id !== undefined && `d-none`} createoredit-cancel-button-container f-c pointer`}>
                            <h3>Discard</h3>
                    </div>
                    <div className={`${INVOICE().id !== undefined && `d-none`} createoredit-footer-button-gap`}></div>
                    <div onClick={() => saveAndSendInvoiceToggle(false)}
                        className={`${INVOICE().id !== undefined && `d-none`} createoredit-saveasdraft-button-container f-c pointer`}>
                            {draftSpinner ? <ButtonReqSpinner /> : <h3>Save as Draft</h3>}
                    </div>
                    <div className="createoredit-footer-button-gap"></div>
                    <div onClick={() => saveChangesInvoiceToggle()}
                        className={`${INVOICE().id === undefined && `d-none`} 
                            createoredit-savechanges-button-container f-c pointer position-relative`}>
                        {saveChangeSpinner ? <ButtonReqSpinner /> : <h3>Save Changes</h3>}
                    </div>
                    <div onClick={() => saveAndSendInvoiceToggle(true)}
                        className={`${INVOICE().id !== undefined && `d-none`} 
                            createoredit-saveandsend-button-container f-c pointer`}>
                        {saveSendSpinner ? <ButtonReqSpinner /> : <h3>Save & Send</h3>}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div id="createoredit">
            <div className="createoredit-container">
                {backHeader()}
                <div className="createoredit-transition">
                    {title()}
                    {formBody()}
                </div>
            </div>
            {footerButtons()}   
        </div>
    )
}

export default CreateOrEdit