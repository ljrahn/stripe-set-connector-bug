import React, { useState } from "react";
import { loadConnectAndInitialize } from "@stripe/connect-js";
import {
  ConnectPayments,
  ConnectComponentsProvider,
} from "@stripe/react-connect-js";

interface Props {
  stripeSecretKey: string;
  stripePublishableKey: string;
  connectedAccountId: string;
}

export default function PaymentsComponent({
  stripeSecretKey,
  stripePublishableKey,
  connectedAccountId,
}: Props) {
  const [stripeConnectInstance] = useState(() => {
    const fetchClientSecret = async () => {
      // Fetch the AccountSession client secret
      const response = await fetch(
        "http://localhost:5000/create-account-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            stripeSecretKey,
            connectedAccountId,
          }),
        }
      );
      if (!response.ok) {
        // Handle errors on the client side here
        const { error } = await response.json();
        console.log("An error occurred: ", error);
        return undefined;
      } else {
        const { clientSecret } = await response.json();
        return clientSecret;
      }
    };
    return loadConnectAndInitialize({
      // This is your test publishable API key.
      publishableKey: stripePublishableKey,
      fetchClientSecret: fetchClientSecret,
      appearance: {
        overlays: "dialog",
        variables: {
          colorPrimary: "#625afa",
        },
      },
    });
  });

  return (
    <div style={{ maxWidth: "800px", marginRight: "auto", marginLeft: "auto" }}>
      <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
        <ConnectPayments />
      </ConnectComponentsProvider>
    </div>
  );
}
