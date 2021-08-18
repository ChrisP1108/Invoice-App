import CreateOrEdit from './components/CreateOrEdit';
import Header from './components/Header';
import List from './components/List';
import ErrorModal from './components/ErrorModal';
import Formatter from './components/List';
import Viewer from './components/Viewer';
import DeleteModal from './components/DeleteModal';
import './App.scss';
import { fetchData, initInvoices, invoiceList, nightMode, 
  toggleViewer, toggleCreateEdit, toggleDeleteModal,
  toggleErrorModal, setToggleErrorModal, setToggleDeleteModal, 
  setToggleViewer, setToggleCreateEdit, httpRes } from './redux/Store.js';
import { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const App = () => {

  const [fetchedList, setFetchedList] = useState(["loading"]);
  const [toggleFormat, setToggleFormat] = useState(false);

  const getInvoices = async () => {
    const data = await fetchData;
    if (data[0] === "error") {
      console.log("Failed To Load Invoices")
      initInvoices(data);
    } else {
      setFetchedList(data);
    }
  }

  useEffect(() => {
    getInvoices();
  });
  
  const listFormatter = () => {
    if (fetchedList[0] === "loading") {
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
        if (invoice.createdAt == '') {
          formattedList.push({...invoice,  
            paymentDue: dateFormat(invoice.paymentDue), 
            total: currencyFormat(invoice.total) 
          })
        } else if (invoice.paymentDue == '') {
          formattedList.push({...invoice,  
            createdAt: dateFormat(invoice.createdAt), 
            total: currencyFormat(invoice.total) 
          })
        } else if (invoice.total == '') {
          formattedList.push({...invoice,  
            createdAt: dateFormat(invoice.createdAt), 
            paymentDue: dateFormat(invoice.paymentDue)
          })
        } else if (invoice.createdAt == '' && invoice.paymentDue == '') {
          formattedList.push({...invoice,  
            total: currencyFormat(invoice.total)
          })
        } else if (invoice.createdAt == '' && invoice.total == '') {
          formattedList.push({...invoice,  
            paymentDue: dateFormat(invoice.paymentDue),
          })
        } else if (invoice.paymentDue == '' && invoice.total == '') {
          formattedList.push({...invoice,  
            createdAt: dateFormat(invoice.paymentDue),
          })
        } else if (invoice.createdAt == '' && invoice.paymentDue == '' && invoice.total == '') {
          formattedList.push(invoice)
        } else {
          formattedList.push({...invoice, 
            createdAt: dateFormat(invoice.createdAt), 
            paymentDue: dateFormat(invoice.paymentDue), 
            total: currencyFormat(invoice.total)
          }) 
        }     
      });

      let idAssign = 0;

      formattedList.forEach(itemlist => {
        itemlist.items.forEach(item => {
          item.id = idAssign;
          idAssign += 1;
        });
        idAssign = 0;
      });

      initInvoices(formattedList);
      setToggleFormat(true);

    }
  }

  !toggleFormat && listFormatter();

  const createToggle = toggleCreateEdit();
  const viewerToggle = toggleViewer();

  const invoiceSwitch = () => {
    return createToggle ? <CreateOrEdit />
      : viewerToggle ? <Viewer /> : <List /> 
  }

  return (
    <div className={`${nightMode() ? 'night-mode' : 'day-mode'} window-height position-relative`}>
      <div className="d-flex flex-column flex-xl-row">
        <Header />
        {toggleErrorModal() && <ErrorModal />}
        {toggleDeleteModal() && <DeleteModal />}
        {invoiceSwitch()}
      </div>
    </div>
  )
}

export default App