import { invoiceList, nightMode } from '../redux/Store.js';
import { useState } from 'react'

const Viewer = () => {

    const [list, setList] = useState([])

    const invoices = async () => {
        const data = await invoiceList();
        setList(data);
    }
    invoices();
    console.log(list);
    console.log(nightMode());

    return (
        <div>
            <h1>Test</h1>
        </div>
    )
}

export default Viewer
