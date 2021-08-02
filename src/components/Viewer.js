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
        <div id="viewer">
            <h1>{nightMode() ? 'Night Theme' : 'Day Theme'}</h1>
        </div>
    )
}

export default Viewer
