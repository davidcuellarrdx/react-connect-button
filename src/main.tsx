import { RadixDappToolkit, RadixNetwork } from "@radixdlt/radix-dapp-toolkit";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RdtProvider } from "./RdtProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RdtProvider
      value={RadixDappToolkit({
        dAppDefinitionAddress:
          'account_tdx_2_12yu2cg9a93lypuyu999j82dh3cd69n9u3vu84jh3uv22ehjavwlrej', //Use your dAppDefinitionAddress
        networkId: RadixNetwork.Stokenet, //RadixNetwork.Mainnet
        applicationName: 'Radix Web3 dApp',
        applicationVersion: '1.0.0',
      })}
    >
      <App />
    </RdtProvider>
  </React.StrictMode>
);
