import Loading from './Loading';
import Invoices from './Invoices';
import { SETTOGGLECREATEEDIT, INVOICELIST, 
    SETINVOICE, RESPONSIVE } from '../redux/Store.js';
import { useState, useEffect } from 'react';
import { filterItems } from '../Arrays/Filters';

const List = () => {

    const list = INVOICELIST();
    const response = RESPONSIVE();
    
    const [toggleFilter, setToggleFilter] = useState(false);
    const [draftFilter, setDraftFilter] = useState(false);
    const [pendingFilter, setPendingFilter] = useState(false);
    const [paidFilter, setPaidFilter] = useState(false);

    const filterInvoices = () => {
        const type = draftFilter ? 'draft' 
            : pendingFilter ? 'pending'
            : paidFilter ? 'paid' : '';
        const filtered = (list.filter(invoice => 
            invoice.status === type));
        return type === '' ? list : filtered;
        
    }

    const toggleFilterType = (type) => {
        switch(type) {
            case 'Draft':
                setDraftFilter(!draftFilter)
                setPendingFilter(false);
                setPaidFilter(false);
                break;
            case 'Pending':
                setDraftFilter(false)
                setPendingFilter(!pendingFilter);
                setPaidFilter(false);
                break;
            case 'Paid':
                setDraftFilter(false)
                setPendingFilter(false);
                setPaidFilter(!paidFilter);
                break;
            default:
                setDraftFilter(false)
                setPendingFilter(false);
                setPaidFilter(false);
                break;
        }
    }

    const noInvoices = () => {
        return (
            <div className="f-ca flex-column no-invoices-container invoice-trans">
                <div className="no-invoices-logo"></div>
                <div>
                    <h1>{list.length === 0
                        ? `There is nothing here` : `No Results`}</h1>
                </div>
                <div className="f-ca flex-column no-invoices-text-margin">
                    <h2>{list.length === 0 
                        ? `Create an invoice by clicking the` 
                        : `No invoices based upon the status`}</h2>
                    <h2><span className="no-invoices-space">
                        {list.length === 0 ? 'New' : draftFilter ? 'Draft' 
                        : pendingFilter ? 'Pending' 
                        : 'Paid'}</span>
                        {list.length === 0  
                        ? `button and get started` : ` were found`}</h2>
                </div>
            </div>
        )
    }

    const loadingError = () => {
        return (
            <div className="f-ca flex-column no-invoices-container-error invoice-trans">
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

    const filterItemMapping = filterItems.map(item => {
        return (
            <div key={item.id}
                className={`${eval(item.checkedValue) && `list-filter-modal-selected`} 
                list-filter-modal-item`} onClick ={() => {toggleFilterType(item.name); setToggleFilter(!toggleFilter)}}>
                <input className="checkbox d-none" type="checkbox" defaultChecked={eval(item.checkedValue)}></input>
                <h3>{item.name}</h3>
            </div>
        )
    });

    const loadedEval = () => {
        if (list[0] === "loading" || list[0] === "error") {
            return false;       
        } else return true
    }

    const createNewInvoice = () => {
        SETINVOICE([]);
        loadedEval() && SETTOGGLECREATEEDIT(true);
    }

    const listHeader = () => {
        return (
            <div className="row m-0 list-container-filter d-flex justify-content-between position-relative">
                <div className="col-5 ns d-flex flex-column justify-content-around">
                    <h1>Invoices</h1>
                    <h2>{list[0] === 'loading' ? `Loading invoices`
                            : list[0] === 'error' ? `Error`
                            : list.length === 0 ? `No invoices` 
                            : list.length === 1 ? `1 invoice`
                            : response === 'mobile' ? `${list.length} invoices`
                            : `There are ${list.length} total invoices`}</h2>
                </div>
                <div className="col-7 ns f-ae pointer">
                    <div className="d-flex">
                        <div className="d-flex">
                            <div onClick={() => loadedEval() && list.length > 0 
                                && setToggleFilter(!toggleFilter)} className="d-flex">
                                <h3>{response === 'mobile' ? `Filter` : `Filter by status`}</h3>
                                <div className="filter-container f-c">
                                    <div className={`${toggleFilter && `filter-arrow-clicked`} filter-arrow`}></div>
                                </div>
                            </div>
                            <div className={`${toggleFilter ? `list-filter-modal-trans-on`
                                : loadedEval() ? `list-filter-modal-trans-off` : `d-none`} list-filter-modal position-absolute`}>
                                <div className="list-modal-outer-container">
                                    <div className="d-flex flex-column h-100 justify-content-between">
                                        {filterItemMapping}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => createNewInvoice()}
                        className="button-container pointer f-c">
                        <div className="f-c">
                            <div className="button-circle f-c">
                                <div className="button-icon"></div>
                            </div>
                        </div>
                        <div className="button"><span>{response === 'mobile' ? `New` : `New Invoice`}</span></div>
                    </div>
                </div>
            </div>

        )
    }

    const loadingEval = () => {
        return (
            list[0] === 'loading' ? <Loading />
            : list[0] === 'error' ? loadingError() 
            : filterInvoices().length === 0 ? noInvoices()
            : list.length > 0 ? <Invoices listOutput={filterInvoices()} />
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
