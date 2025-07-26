import { useEffect, useState } from "react";
import api from "../../services/api";
import { AccountItem } from "./AccountItem";

const Account = ({ onEdit, onDelete, refresh }) => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get("/account")
      .then((response) => {
        console.error("Erro ao carregar contas:", response.data);
        setAccounts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar contas:", error);
        setLoading(false);
      });
  }, [refresh]);

  if (loading) return <p className="text-center">Carregando...</p>;

  if (accounts.length === 0)
    return <p className="text-center">Nenhuma conta encontrada.</p>;
  return (
    <div className="p-4 bg-white rounded shadow-md mb-6 w-full">
      <h2 className="text-xl font-bold mb-4"></h2>Account
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {accounts.map((acc) => (
          <AccountItem
            key={acc.id}
            description={acc.description}
            amount={acc.amount}
            type={acc.type}
          ></AccountItem>
        ))}
      </div>
    </div>
  );
};

export default Account;
