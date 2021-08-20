import { SETINVOICE, SETTOGGLEVIEWER, RESPONSIVE } from '../redux/Store.js';
import { monthsArray } from '../Arrays/Months';

const Invoices = ({ listOutput }) => {

    const response = RESPONSIVE();

    const dateFormat = (input) => {
        const day= input.slice(8, 10);
        let month = monthsArray[Number(input.slice(5, 7)) - 1];
        const year = input.slice(0, 4);
        const formatted = `${day} ${month} ${year}`;
        return formatted;
    }

    const currencyFormat = (amount) => {
        const output = `£ ${new Intl.NumberFormat ('en-UK', { style: 'currency', currency: 'GBP'}).format(amount).toString().slice(1)}`;
        return output;
    }

    const invoiceMobileMapping = listOutput.map(item => {
        return (
            <div key={item.id} onClick={() => {SETINVOICE(item); SETTOGGLEVIEWER(true);}}
                id="invoices" className="invoice-outer-container position-relative pointer invoice-trans">
                <div className="invoice-inner-container position-absolute w-100 my-auto mx-auto">
                    <div className="invoice-container-row">
                        <h3><span>#</span>{item.id}</h3>
                        <h2>{item.clientName === '' ? `No Name Entered` : item.clientName}</h2>
                    </div>
                    <div className="f-ca">
                        <div className="d-flex flex-column w-50">
                            <h2>Due {item.paymentDue === '' ? `Date Not Selected` : dateFormat(item.paymentDue)}</h2>
                            <div className="mt-2">
                                <h4>{item.total === 0 ? `No total` : currencyFormat(item.total)}</h4>
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

    const invoiceMapping = listOutput.map(item => {
        return (
            <div key={item.id} onClick={() => {SETINVOICE(item); SETTOGGLEVIEWER(true);}}
                id="invoices" className="invoice-outer-container position-relative pointer invoice-trans">
                <div className="invoice-inner-container">
                    <div className="d-flex align-items-center"> 
                        <div className="invoice-container-width-15">
                            <h3><span>#</span>{item.id}</h3>
                        </div>
                        <div className="invoice-container-width-22">
                            <h2>Due {item.paymentDue === '' ? `Date Not Selected` : dateFormat(item.paymentDue)}</h2>
                        </div>
                        <div className="invoice-container-width-20">
                            <h2>{item.clientName === '' ? `No Name Entered` : item.clientName}</h2>
                        </div>
                        <div className="invoice-container-width-17 f-ae">
                            <h4>{item.total === 0 ? `No total` : currencyFormat(item.total)}</h4>
                        </div>
                        <div className="invoice-container-width-28 d-flex f-ae">
                            <div className={`payment-button-${item.status} f-c payment-button-container`}>
                                <div className="payment-status f-c">
                                    <div className={`dot-${item.status} payment-dot`}></div>
                                    <h5>{item.status === 'paid' ? `Paid` : item.status === 'pending' ? `Pending` : `Draft`}</h5>
                                </div>
                            </div>
                            <div className="">
                                <div className="invoice-right-arrow"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    });

    return (
        <>
            {response === 'mobile' ? invoiceMobileMapping : invoiceMapping}
        </>
    )
}

export default Invoices
