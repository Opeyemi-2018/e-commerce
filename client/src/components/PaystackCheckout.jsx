import React from "react";
import { usePaystackPayment } from "react-paystack";

const PaystackCheckout = ({ amount, userEmail, children }) => {
  const onSuccess = (reference) => {
    console.log(reference);
  };

  const onClose = () => {
    console.log("closed");
  };

  const config = {
    reference: new Date().getTime().toString(),
    email: userEmail,
    amount: amount * 100,
    publicKey: "pk_test_8dceb57d0bda5a68f8d9fc74e3189fd7d2638dc7",
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <div>
      <button
        onClick={() => {
          initializePayment(onSuccess, onClose);
        }}
      >
        {children}
      </button>
    </div>
  );
};

export default PaystackCheckout;
