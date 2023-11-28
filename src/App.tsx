import reactLogo from "./assets/react.svg";
import radixLogo from "./assets/radix-icon_128x128.png";
import "./App.css";
import { useAccounts } from "./hooks/useAccounts";
import { useSendTransaction } from "./hooks/useSendTransaction";
import { useConnected } from "./hooks/useConnected";
import { usePersona } from "./hooks/usePersona";
import { useState } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "radix-connect-button": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

function App() {
  const accounts = useAccounts();
  const persona = usePersona();
  const sendTransaction = useSendTransaction();
  const connected = useConnected();

  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);
  
  return (
    <div className="App">
      <div>
        <a
          href="https://github.com/radixdlt/radix-dapp-toolkit"
          target="_blank"
        >
          <img src={radixLogo} className="logo" alt="Radix logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>RDT + React</h1>
      <div className="card">
        <radix-connect-button/>
      </div>
      {persona.persona ? (
        <div>
          <h2>Persona: {persona.persona?.label}</h2>

          {persona.persona && accounts.state.accounts.length > 0 ? (
            <div style={{ marginBottom: 25 }}>
            <h2>Select account: </h2>
            {accounts.state?.accounts.map((account) => (
              <div
                key={account.appearanceId}
                style={{ cursor: 'pointer', marginBottom: 10 }}
                onClick={() => setSelectedAccount(account.appearanceId)}
              >
                <input
                  type="radio"
                  checked={selectedAccount === account.appearanceId}
                  readOnly
                />
                {account.label}
              </div>
            ))}
          </div>
          ): (
            <h4> Click on the Wallet button and update data sharing and choose at least 1 account.</h4>
          )}

        </div>
      ) : (
        <h4> Don't forget to enable Developer Mode on your Radix Wallet </h4>
      )}
      
      <div
        style={{
          textAlign: "center",
          display: "inline-block",
          width: 300,
        }}
      >

        {persona.persona && accounts.state.accounts.length > 0 && selectedAccount !== null && (
          <button
            style={{ display: "block", marginBottom: 10, width: "100%" }}
            onClick={() =>
              sendTransaction(`
              CREATE_FUNGIBLE_RESOURCE_WITH_INITIAL_SUPPLY
                  Enum<0u8>()
                  true
                  18u8
                  Decimal("100000")
                  Tuple(
                      Enum<0u8>(),
                      Enum<0u8>(),
                      Enum<0u8>(),
                      Enum<0u8>(),
                      Enum<0u8>(),
                      Enum<0u8>()
                  )
                  Tuple(
                      Map<String, Tuple>(
                          "name" => Tuple(
                              Enum<1u8>(
                                  Enum<0u8>(
                                      "Test Token"
                                  )
                              ),
                              false
                          )
                      ),
                      Map<String, Enum>()
                  )
                  Enum<0u8>()
              ;      

              CALL_METHOD
                Address("${accounts.state.accounts[selectedAccount].address}") 
                "deposit_batch"
                Expression("ENTIRE_WORKTOP");
            `)}
          >
            Create Fungible Resource
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
