import CreateOrEdit from './components/CreateOrEdit';
import Header from './components/Header';
import List from './components/List';
import Viewer from './components/Viewer';
import './App.scss';
import { fetchData, invoiceList, initInvoices, nightMode, 
  toggleViewer, toggleCreate  } from './redux/Store.js';
import { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const App = () => {

  const [fetchedList, setFetchedList] = useState(["loading"]);
  const [toggleFormat, setToggleFormat] = useState(false);

  const getInvoices = async () => {
    const data = await fetchData;
    setFetchedList(data);
  }

  getInvoices();

  setTimeout(() => {
    if (fetchedList === ["loading"]) {
      setFetchedList(["error"]);
      initInvoices(["error"]);
    }
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
          total: currencyFormat(invoice.total) 
        })
      });

      initInvoices(formattedList);
      setToggleFormat(true);
    }
  }

  !toggleFormat && listFormatter();

  const createToggle = toggleCreate();
  const viewerToggle = toggleViewer();

  const invoiceSwitch = () => {
    return createToggle ? <CreateOrEdit />
      : viewerToggle ? <Viewer /> : <List /> 
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