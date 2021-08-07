import CreateOrEdit from './components/CreateOrEdit';
import Header from './components/Header';
import List from './components/List';
import Viewer from './components/Viewer';
import './App.scss';
import { fetchInvoiceList, nightMode, toggleViewer, toggleCreate } from './redux/Store.js';
import { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const App = () => {

  const [fetchedList, setFetchedList] = useState(["loading"]);

  const getInvoices = async () => {
    const data = await fetchInvoiceList();
    setFetchedList(data);
  }

  getInvoices();

  setTimeout(() => {
    fetchedList[0] === "loading" && setFetchedList(["error"])
  }, 15000);

  const listFormatter = () => {
    if (fetchedList[0] === "loading" || fetchedList[0] === "error") {
      return fetchedList;
    } else {
      const monthsArray =['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July',
        'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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

      const formattedList = [];

      fetchedList.forEach(invoice => {
        formattedList.push({...invoice, 
          createdAt: dateFormat(invoice.createdAt), 
          paymentDue: dateFormat(invoice.paymentDue), 
          items: {
            ...invoice.items[0],
            price: currencyFormat(invoice.items[0].price), 
            total: currencyFormat(invoice.items[0].total)},
          total: currencyFormat(invoice.total)
        })
      });

      return formattedList;
    }
  }

  const createToggle = toggleCreate();
  const viewerToggle = toggleViewer();

  const invoiceSwitch = () => {
    return createToggle ? <CreateOrEdit />
      : viewerToggle ? <Viewer /> : <List list={listFormatter()}/> 
  }

  return (
    <div className={`${nightMode() ? 'night-mode' : 'day-mode'} window-height`}>
      <div className="d-flex flex-column flex-xl-row">
        <Header />
        {invoiceSwitch()}
      </div>
    </div>
  )
}

export default App