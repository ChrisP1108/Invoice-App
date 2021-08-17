import { useState, useEffect } from 'react';
import { optionTerms } from '../Arrays/Options';
import { NewInvoiceTemplate, ItemAddSchema } from '../New-Invoice-Template';
import { invoice, setInvoice,
    markPaidInvoice, setToggleDeleteModal, setHttpRes, httpRes,
    setToggleErrorModal, setToggleViewer, 
    setToggleCreateEdit, updateInvoice } from '../redux/Store.js';

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
    const monthsArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July',
        'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const fieldsEval = () => {
        setInvoiceEdit({...invoiceEdit});
        blankFieldTally = 0;
        blankItemTally = 0;
        valuesCheck(invoiceEdit, 'fields');
        valuesCheck(invoiceEdit.senderAddress, 'fields');
        valuesCheck(invoiceEdit.clientAddress, 'fields');
        invoiceEdit.items.forEach(item => valuesCheck(item, 'items'));
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

    if (httpRes() === "Update Invoice Request Failed") {
        setTimeout(() => {
            setToggleErrorModal(true);
            setSaveSendSpinner(false);
        }, 500);
    } 
    if (httpRes() === "Update Invoice Request Fulfilled") {
        setTimeout(() => {
            setSaveSendSpinner(false);
            setToggleCreateEdit(false);
        }, 500); 
    }

    const serverFormatting = (input) => {
        let createdDay = input.createdAt.slice(0, 2);
        createdDay = createdDay < 10 ? `0${createdDay}` : createdDay;
        let createdMonth = monthsArray.indexOf(input.createdAt.slice(3, 6)) + 1;
        createdMonth = createdMonth < 10 ? `0${createdMonth}` : createdMonth;
        const createdYear = input.createdAt.slice(7, 11);
        input.createdAt = `${createdYear}-${createdMonth}-${createdDay}`;
        let paymentDay = input.paymentDue.slice(0, 2);
        paymentDay = paymentDay < 10 ? `0${paymentDay}` : paymentDay;
        let paymentMonth = monthsArray.indexOf(input.paymentDue.slice(3, 6)) + 1;
        paymentMonth = paymentMonth < 10 ? `0${paymentMonth}` : paymentMonth;
        const paymentYear = input.paymentDue.slice(7, 11);
        input.paymentDue = `${paymentYear}-${paymentMonth}-${paymentDay}`;
        input.total = input.total.slice(2);
        input.items.forEach(item => item.total = item.quantity * item.price);
        return input;
    }

    const updateInvoice = () => {
        const data = serverFormatting(invoiceEdit);
        console.log(data);
        // setSaveSendSpinner(true);
        // setHttpRes("Update Invoice Request Pending");
        // fieldsEval() && updateInvoice(invoiceEdit);
    }

    const input = invoice().id === undefined ? NewInvoiceTemplate : invoice();

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

    invoiceEdit.id === '' && setInvoiceEdit({...invoiceEdit, id: newInvoiceId});

    let blankFieldTally;
    let blankItemTally;

    const valuesCheck = (items, type) => {
        Object.values(items).forEach(item => {
            if (item === '' || item === null || item == 0 || item < 0) {
                if (type === 'fields') {
                    blankFieldTally += 1;
                }
                if (type === 'items') {
                    blankItemTally += 1;
                }
            }
        });
    }

    blankFieldTally > 0 && setEmptyFields(true);
    
    const backHeader = () => {
        return (
            <div onClick={() => setToggleCreateEdit(false)} 
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
                {invoice().id === undefined ?
                    <h1>New Invoice</h1>
                    : <h1>Edit <span>#</span>{invoiceEdit.id}</h1>
                }
            </div>
        )
    }

    const formStateUpdate = (type, value, indexId) => {
        const data = invoiceEdit;
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
                break;
            case 'description':
                data.description = value;
                break;
            case 'item.name':
                data.items[indexId].name = value;
                break;
            case 'item.quantity':
                value < 0  ? data.items[indexId].quantity = Number(0)
                : data.items[indexId].quantity = Number(value);
                break;
            case 'item.price':
                value < 0  ? data.items[indexId].price = 0
                : data.items[indexId].price = Number(value);
                break;
            case 'deleteItem':
                if (data.items.length == 1) {
                    break;
                }
                data.items.splice(indexId, 1)
                console.log(data);
                break;
            case 'addItem':
                data.items.push(ItemAddSchema);
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
                style={{ borderBottom: option.id == 4 && '0rem $white solid' }}>
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
        const indexId = invoiceEdit.items.indexOf(item);
        
        return (
            <div key={indexId} className="createoredit-trans-item">
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
                        onChange={(e) => formStateUpdate(e.target.name, e.target.value, indexId)}                            
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
                            onChange={(e) => formStateUpdate(e.target.name, e.target.value, indexId)}
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
                            onChange={(e) => formStateUpdate(e.target.name, e.target.value, indexId)}
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
                                <div className={indexId == 1 && `d-none`}>
                                    <div className="createoredit-item-trash-icon"></div>
                                <div 
                                    onClick={() => formStateUpdate('deleteItem', item, indexId)}
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
        const actualMonth = calState.monthTally + 1;
        const month = actualMonth < 10 ? `0${actualMonth}` 
            : actualMonth;
        const number = input < 10 ? `0${input}` 
            : input;
        const randomMonth = Math.ceil(Math.random() * 11);
        let randomDay = Math.ceil(Math.random() * 28);
        randomDay = randomDay < 10 ? randomDay = `0${randomDay}` : randomDay;
        const randomYear = calState.yearTally + Math.ceil(Math.random() * 1);
        setInvoiceEdit({...invoiceEdit, createdAt: `${number} ${calState.header}`,
            paymentDue: `${randomDay} ${monthsArray[randomMonth]} ${randomYear}`});
        setToggleCalendar(false);
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
                <div className={`${invoice().id === undefined && `d-none`} createoredit-form-row-full-container 
                    createoredit-invoice-disabled f-clb`}>
                    <h4>Invoice Date</h4>
                    <div className="createoredit-date-disabled f-sb">
                        <h4><span>{invoiceEdit.createdAt}</span></h4>
                        <div className="createoredit-calendar-icon"></div>
                    </div>   
                </div>
                <div className={`${invoice().id !== undefined && `d-none`} 
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
                    onClick={() => formStateUpdate('addItem')}
                    className={`${invoiceEdit.items.length === 0 
                        && `createoredit-item-empty-button-gap`} 
                        createoredit-item-add-button pointer f-c`}>
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
                    <div onClick={() => setToggleCreateEdit(false)}
                        className={`${invoice().id === undefined && `d-none`} createoredit-cancel-button-container f-c pointer`}>
                            <h3>Cancel</h3>
                    </div>
                    <div onClick={() => setToggleCreateEdit(false)}
                        className={`${invoice().id !== undefined && `d-none`} createoredit-cancel-button-container f-c pointer`}>
                            <h3>Discard</h3>
                    </div>
                    <div className={`${invoice().id !== undefined && `d-none`} createoredit-footer-button-gap`}></div>
                    <div
                        className={`${invoice().id !== undefined && `d-none`} createoredit-saveasdraft-button-container f-c`}>
                            <h3>Save as Draft</h3>
                    </div>
                    <div className="createoredit-footer-button-gap"></div>
                    <div onClick={() => updateInvoice()}
                        className={`${invoice().id === undefined && `d-none`} 
                            createoredit-savechanges-button-container f-c pointer`}>
                        <h3>Save Changes</h3>
                    </div>
                    <div onClick={() => fieldsEval()}
                        className={`${invoice().id !== undefined && `d-none`} 
                            createoredit-saveandsend-button-container f-c pointer`}>
                        <h3>Save & Send</h3>
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
