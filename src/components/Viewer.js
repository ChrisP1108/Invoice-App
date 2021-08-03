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
                <div className="row m-0 viewer-container-filter">
                    <div className="col-5 m-0 p-0 d-flex flex-column justify-content-around">
                        <h1>Invoices</h1>
                        <h2>{list.length === 0 ? `No invoices` : `${list.length} invoices`}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Viewer
