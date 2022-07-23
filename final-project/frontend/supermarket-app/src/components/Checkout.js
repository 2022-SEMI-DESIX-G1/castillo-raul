import React from "react";
import { useLocation, useParams } from "react-router-dom";

const Checkout = () => {
  const { amount } = useParams();
  const total = useLocation().state.total;

  console.log(amount);
  console.log(total);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "0.01",
          },
        },
      ],
    });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture();
  };
  return (
    <div>Checkout Page</div>
    // <PayPalButton
    //   createOrder={(data, actions) => createOrder(data, actions)}
    //   onApprove={(data, actions) => onApprove(data, actions)}
    // />
  );
};

export default Checkout;
