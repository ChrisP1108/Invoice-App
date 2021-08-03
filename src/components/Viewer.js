import { invoiceList, nightMode } from '../redux/Store.js';
import { useState } from 'react'

const Viewer = () => {

    const [list, setList] = useState([])

    const invoices = async () => {
        const data = await invoiceList();
        setList(data);
    }
    invoices();

    const invoiceMapping = list.map(item => {
        return (
            <div className="invoice-outer-container position-relative pointer">
                <div className="invoice-inner-container position-absolute w-100 my-auto mx-auto">
                    <div className="invoice-container-row">
                        <h3><span>#</span>{item.id}</h3>
                        <h2>{item.clientName}</h2>
                    </div>
                    <div className="f-ca">
                        <div className="d-flex flex-column w-50">
                            <h2>Due {item.paymentDue}</h2>
                            <div className="mt-2">
                                <h4>{item.total}</h4>
                            </div>
                        </div>
                        <div className="f-ae">
                            <div className={`payment-button-${item.status} f-c payment-button-container`}>
                                <div className="payment-status f-c">
                                    <div className={`dot-${item.status} payment-dot`}></div>
                                    <h5>{item.status === 'paid' ? `Paid` : item.status === 'pending' ? `Pending` : `Draft`}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    });

    return (
        <div id="viewer">
            <div className="viewer-container">
                <div className="row m-0 viewer-container-filter d-flex justify-content-between">
                    <div className="col-5 ns d-flex flex-column justify-content-around">
                        <h1>Invoices</h1>
                        <h2>{list.length === 0 ? `No invoices` : `${list.length} invoices`}</h2>
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
                <div className="invoice-top-margin"></div>
                {invoiceMapping}
            </div>
        </div>
    )
}

export default Viewer
