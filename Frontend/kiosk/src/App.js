import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Main from './components/Home';
import ResultPayment from './components/ResultPayment';
import ItemList from './components/ItemList';
import RfidRead from './components/RfidRead';
import CardCheck from './components/CardCheck';
import CardPayment from './components/CardPayment';
import Test from "./components/Test"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/kiosk" element={<Main />} />
        <Route path="/kiosk/resultpayment" element={<ResultPayment />} />
        <Route path="/kiosk/itemlist" element={<ItemList />} />
        <Route path="/kiosk/rfidread" element={<RfidRead />} />
        <Route path="/kiosk/cardcheck" element={<CardCheck />} />
        <Route path="/kiosk/cardpayment" element={<CardPayment />} />
        <Route path="/kiosk/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
