import Loading from './Loading';
import Invoices from './Invoices';
import { invoiceList } from '../redux/Store.js';
import { useState } from 'react'

const List = () => {

    const [list, setList] = useState(["loading"])

    const getInvoices = async () => {
        const data = await invoiceList();
        setList(data);
    }
    getInvoices();

    setTimeout(() => {
        list[0] === 'loading' && setList(["error"])
    }, 15000)

    const noInvoices = () => {
        return (
            <div className="f-ca flex-column no-invoices-container">
                <div className="no-invoices-logo"></div>
                <div>
                    <h1>There is nothing here</h1>
                </div>
                <div className="f-ca flex-column no-invoices-text-margin">
                    <h2>Create an invoice by clicking the</h2>
                    <h2><span className="no-invoices-space">New</span>button and get started</h2>
                </div>
            </div>
        )
    }

    const loadingError = () => {
        return (
            <div className="f-ca flex-column no-invoices-container-error">
                <div className="no-invoices-error-logo"></div>
                <div>
                    <h1>Something went wrong</h1>
                </div>
                <div className="f-ca flex-column no-invoices-text-margin">
                    <h2>Try refreshing the page</h2>
                    <h2>or check your internet connection</h2>
                </div>
            </div>
        )
    }

    const listHeader = () => {
        return (
            <div className="row m-0 list-container-filter d-flex justify-content-between">
                <div className="col-5 ns d-flex flex-column justify-content-around">
                    <h1>Invoices</h1>
                    <h2>{list[0] === 'loading' ? `Loading invoices`
                            : list[0] === 'error' ? `Error`
                            : list.length === 0 ? `No invoices` 
                            : `${list.length} invoice${list.length > 1 && `s`}`}</h2>
                </div>
                <div className="col-7 ns f-ae pointer">
                    <h3>Filter</h3>
                    <div className="filter-container f-c">
                        <div className="filter-arrow"></div>
                    </div>
                    <div className="button-container pointer f-c">
                        <div className="f-c">
                            <div className="button-circle f-c">
                                <div className="button-icon"></div>
                            </div>
                        </div>
                        <div className="button"><span>New</span></div>
                    </div>
                </div>
            </div>
        )
    }

    const loadingEval = () => {
        return (
            list[0] === 'loading' ? <Loading />
            : list[0] === 'error' ? loadingError()
            : list.length > 0 ? <Invoices list={list} />
            : noInvoices()
        )
    }

    return (
        <div id="list">
            <div className="list-container">
                {listHeader()}
                <div className="invoice-top-margin"></div>
                {loadingEval()}
            </div>
        </div>
    )
}

export default List
