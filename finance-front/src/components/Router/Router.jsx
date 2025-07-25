// src/components/Router/Routes.jsx
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Dashboard";
import TransactionList from "../TransactionList";

const Router = ({ refresh }) => (
  <Routes>
    <Route path="/" element={<Dashboard refresh={refresh} />} />
    <Route path="/transactions" element={<TransactionList />} />
  </Routes>
);

export default Router;
