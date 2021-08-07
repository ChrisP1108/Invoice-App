import { invoice, deleteInvoice } from '../redux/Store.js';

const Viewer = () => {

    const invoiceToView = invoice();
    console.log(invoiceToView);

    return (
        <div id="viewer">
            <div className="d-flex">
                <h3>Filter</h3>
            </div>
            <div className="filter-container f-c">
                <div className="filter-arrow"></div>
            </div>
        </div>
    )
}

export default Viewer
