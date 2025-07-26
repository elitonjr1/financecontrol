// src/components/Router/Routes.jsx
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import TransactionList from "../Transactions/TransactionList";
import Account from "../Account/Account";

const Router = ({ refresh }) => (
  <Routes>
    <Route path="/" element={<Dashboard refresh={refresh} />} />
    <Route path="/transactions" element={<TransactionList />} />
    <Route path="/accounts" element={<Account />} />
  </Routes>
);

export default Router;
