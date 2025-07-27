import React from "react";

export const AccountItem = ({ description, amount, type }) => {
  return (
    <div
      className={`w-60 p-2 rounded-xl ${
        amount ? "bg-green-100" : "bg-red-100"
      }`}
    >
      <div className="p-2">
        <h2 className="font-bold text-lg">{type}</h2>
        <p className="text-md text-gray-600">{description}</p>
      </div>
      <div className="m-2">
        <a
          role="button"
          href="#"
          className="text-white bg-blue-400 px-3 py-1 rounded-xl"
        >
          Saldo: {amount}
        </a>
      </div>
    </div>
  );
};
