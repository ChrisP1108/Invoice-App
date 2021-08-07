import { setInvoice } from '../redux/Store.js';

const Invoices = ({ list }) => {

    const dateFormat = (date) => {
        const input = new Date(date).toString();
        const day= input.slice(8, 10);
        const month = input.slice(4, 7);
        const year = input.slice(11, 15);
        const formatted = `${day} ${month} ${year}`;
        return formatted;
    }

    const currencyFormat = (amount) => {
        const output = new Intl.NumberFormat ('en-UK', { style: 'currency', currency: 'GBP'}).format(amount).toString().slice(1);
        return output;
    }

    const invoiceMapping = list.map(item => {
        return (
            <div key={item.id} onClick={() => setInvoice(item)}
                id="invoices" className="invoice-outer-container position-relative pointer invoice-trans">
                <div className="invoice-inner-container position-absolute w-100 my-auto mx-auto">
                    <div className="invoice-container-row">
                        <h3><span>#</span>{item.id}</h3>
                        <h2>{item.clientName}</h2>
                    </div>
                    <div className="f-ca">
                        <div className="d-flex flex-column w-50">
                            <h2>Due {dateFormat(item.paymentDue)}</h2>
                            <div className="mt-2">
                                <h4>£ {currencyFormat(item.total)}</h4>
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
        <>
            {invoiceMapping}
        </>
    )
}

export default Invoices
