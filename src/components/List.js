import Loading from './Loading';
import Invoices from './Invoices';
import { fetchInvoiceList, toggleFilter, setToggleFilter, 
    setToggleCreate } from '../redux/Store.js';
import { useState } from 'react';
import { filterItems } from '../Arrays/Filters';

const List = () => {

    const [list, setList] = useState(["loading"]);
    const [draftFilter, setDraftFilter] = useState(false);
    const [pendingFilter, setPendingFilter] = useState(false);
    const [paidFilter, setPaidFilter] = useState(false);

    const getInvoices = async () => {
        const data = await fetchInvoiceList();
        setList(data);
    }

    getInvoices();

    const filterInvoices = () => {
        const type = draftFilter ? 'draft' 
            : pendingFilter ? 'pending'
            : paidFilter ? 'paid' : '';
        const filtered = list.filter(invoice => 
            invoice.status === type);
        return type === '' ? list : filtered;
    }

    setTimeout(() => {
        list[0] === 'loading' && setList(["error"])
    }, 15000)

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
            <div key={item.it} 
                className={`${eval(item.checkedValue) && `list-filter-modal-selected`} 
                list-filter-modal-item`} onClick ={() => toggleFilterType(item.name)}>
                <input className="checkbox d-none" type="checkbox" checked={eval(item.checkedValue)}></input>
                <h3>{item.name}</h3>
            </div>
        )
    });

    const listHeader = () => {
        return (
            <div className="row m-0 list-container-filter d-flex justify-content-between position-relative">
                <div className="col-5 ns d-flex flex-column justify-content-around">
                    <h1>Invoices</h1>
                    <h2>{list[0] === 'loading' ? `Loading invoices`
                            : list[0] === 'error' ? `Error`
                            : list.length === 0 ? `No invoices` 
                            : `${list.length} invoice${list.length > 1 && `s`}`}</h2>
                </div>
                <div className="col-7 ns f-ae pointer">
                    <div className="d-flex">
                        <div className="d-flex">
                            <div onClick={() => setToggleFilter()} className="d-flex">
                                <h3>Filter</h3>
                                <div className="filter-container f-c">
                                    <div className={`${toggleFilter() && `filter-arrow-clicked`} filter-arrow`}></div>
                                </div>
                            </div>
                            <div className={`${toggleFilter() ? `list-filter-modal-trans-on` : `list-filter-modal-trans-off`} list-filter-modal`}>
                                <div className="list-modal-outer-container">
                                    <div className="d-flex flex-column h-100 justify-content-between">
                                        {filterItemMapping}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => setToggleCreate()}
                        className="button-container pointer f-c">
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
            : list.length > 0 ? <Invoices list={filterInvoices()} />
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
