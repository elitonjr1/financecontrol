import React from "react";
import { FaBars } from "react-icons/fa";

export const AccountItem = ({ description, amount, type }) => {
  return (
    <div>
      <FaBars />
      teste {description} R${amount} {type}
    </div>
  );
};
