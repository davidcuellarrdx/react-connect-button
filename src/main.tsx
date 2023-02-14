import { RadixDappToolkit } from "@radixdlt/radix-dapp-toolkit";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RdtProvider } from "./RdtProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RdtProvider
      value={RadixDappToolkit(
        {
          dAppName: "Radix dApp",
          dAppDefinitionAddress:
            "account_tdx_b_1pzv5m8xqy39jmjkk60jluwhrctcs4qpafrxs7rr54jwq0899y3",
        },
        (requestData) => {
          requestData({
            accounts: { quantifier: "atLeast", quantity: 1 },
          });
        },
        {
          networkId: 34,
        }
      )}
    >
      <App />
    </RdtProvider>
  </React.StrictMode>
);
