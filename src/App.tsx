import reactLogo from "./assets/react.svg";
import radixLogo from "./assets/radix-icon_128x128.png";
import "./App.css";
import { useAccounts } from "./hooks/useAccounts";
import { useRequestData } from "./hooks/useRequestData";
import { useSendTransaction } from "./hooks/useSendTransaction";
import { useConnected } from "./hooks/useConnected";
import { usePersona } from "./hooks/usePersona";

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
  const requestData = useRequestData();
  const sendTransaction = useSendTransaction();
  const connected = useConnected();

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
        <radix-connect-button></radix-connect-button>
      </div>
      {connected && (
        <div style={{ marginBottom: 25 }}>
          <h2>Persona: {persona?.label}</h2>
        </div>
      )}
      {connected && (
        <div style={{ marginBottom: 25 }}>
          <h2>Accounts:</h2>
          {accounts.map((account) => (
            <div key={account.appearanceId}>{account.label}</div>
          ))}
        </div>
      )}
      <div
        style={{
          textAlign: "center",
          display: "inline-block",
          width: 200,
        }}
      >
        <button
          style={{ display: "block", marginBottom: 10, width: "100%" }}
          onClick={() =>
            requestData({
              accounts: { quantifier: "exactly", quantity: 2, oneTime: true },
            }).map(({ accounts }) => {
              alert(`Got wallet response!
            ${JSON.stringify(accounts, null, 2)}`);
            })
          }
        >
          Request data
        </button>

        {connected && (
          <button
            style={{ display: "block", marginBottom: 10, width: "100%" }}
            onClick={() =>
              sendTransaction(`
CREATE_FUNGIBLE_RESOURCE
    18u8
    Map<String, String>(
        "name", "MyResource",                                        # Resource Name
        "symbol", "RSRC",                                            # Resource Symbol
        "description", "A very innovative and important resource"    # Resource Description
    ) 
    Map<Enum, Tuple>(
        Enum("ResourceMethodAuthKey::Withdraw"), Tuple(Enum("AccessRule::AllowAll"), Enum("AccessRule::DenyAll")),
        Enum("ResourceMethodAuthKey::Deposit"), Tuple(Enum("AccessRule::AllowAll"), Enum("AccessRule::DenyAll"))
    )
    Some(Decimal("500000"));

  CALL_METHOD
    ComponentAddress("${accounts[0].address}") 
    "deposit_batch"
    Expression("ENTIRE_WORKTOP");
`)
            }
          >
            Send transaction
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
