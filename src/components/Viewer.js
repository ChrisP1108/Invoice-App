import { invoiceList, nightMode } from '../redux/Store.js';
import { useState } from 'react'

const Viewer = () => {

    const [list, setList] = useState([])

    const invoices = async () => {
        const data = await invoiceList();
        setList(data);
    }
    invoices();

    return (
        <div id="viewer" className={nightMode() ? 'night-mode' : 'day-mode'}>
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
            </div>
        </div>
    )
}

export default Viewer
