import React, { useState } from "react";
import PaymentsComponent from "./PaymentsComponent";

export default function Home() {
  const [stripeSecretKey, setStripeSecretKey] = useState("");
  const [stripePublishableKey, setStripePublishableKey] = useState("");
  const [connectedAccountId, setConnectedAccountId] = useState("");
  const [show, setShow] = useState(false);

  return (
    <div>
      <p>Enter Stripe Secret Key</p>
      <input
        style={{ padding: "5px", width: "300px" }}
        type="text"
        placeholder="Stripe Secret Key"
        value={stripeSecretKey}
        onChange={(e) => setStripeSecretKey(e.target.value)}
      />

      <p>Enter Stripe Publishable Key</p>
      <input
        style={{ padding: "5px", width: "300px" }}
        type="text"
        placeholder="Stripe Publishable Key"
        value={stripePublishableKey}
        onChange={(e) => setStripePublishableKey(e.target.value)}
      />

      <p>Enter Connected Account Id</p>
      <input
        type="text"
        style={{ padding: "5px", width: "300px" }}
        placeholder="Connected Account ID"
        value={connectedAccountId}
        onChange={(e) => setConnectedAccountId(e.target.value)}
      />
      <div style={{ marginTop: "10px" }}>
        <label>
          <input
            type="checkbox"
            checked={show}
            onChange={() => setShow(!show)}
          />
          Show Payments Component
        </label>
      </div>

      {show &&
        stripeSecretKey !== "" &&
        stripePublishableKey &&
        connectedAccountId !== "" && (
          <PaymentsComponent
            stripeSecretKey={stripeSecretKey}
            connectedAccountId={connectedAccountId}
            stripePublishableKey={stripePublishableKey}
          />
        )}
    </div>
  );
}
