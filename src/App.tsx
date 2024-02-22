import "./App.css";
import riseInLogo from "/risein.svg";
import { ConnectButton, useCurrentAccount, useCurrentWallet, useSuiClientContext, useSuiClientQuery } from "@mysten/dapp-kit";
import { Button } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMoveCalls } from "./Sui/DevHubCaller";
import NetworkSelector from "./Components/NetworkChanger";

function App() {
  const navigate = useNavigate();
  const ctx = useSuiClientContext();
  const wallet = useCurrentWallet();
  const currentAccount = useCurrentAccount();
  const [balance, setBalance] = useState<number>();
  const { getBalance } = useMoveCalls();

  const { data } = useSuiClientQuery("getObject", {
    id: "0x040cd594e4bc888e2b9040a579d7809f2dbf95c913fb441668ea1f8ad3f95856",
    options: {
      showContent: true,
    },
  });

  console.log("data", data);

  useEffect(() => {
    const init = async () => {
      if (currentAccount) {
        const balance = await getBalance(currentAccount?.address);
        setBalance(balance);
      }
    };
    init();
  }, [currentAccount, getBalance]);

  return (
    <div>
      <div>
        <a href="https://www.risein.com" target="_blank">
          <img src={riseInLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: "2rem", justifyContent: "center" }}>
        <h1>Sui Blockchain</h1>
        <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <ConnectButton></ConnectButton>
          {currentAccount && <NetworkSelector ctx={ctx}></NetworkSelector>}
        </nav>
        {/* <div style={{ minWidth: "20px", display: }}> */}
        {/* </div> */}
      </div>
      {wallet.isConnected && (
        <>
          <div style={{ display: "flex", flexDirection: "row", gap: "1rem", marginBottom: "2rem", alignItems: "center" }}>
            <div
              style={{
                backgroundColor: "rgba(82 132 181 / 30%)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "400px",
                minHeight: "80px",
                padding: "1rem",
                borderRadius: "12px",
              }}
            >
              <h4 style={{ margin: "0" }}>Wallet network: {currentAccount?.chains[0].slice(4).toUpperCase()}</h4>
              <h4 style={{ margin: "0" }}>Current balance: {balance}</h4>
            </div>
            <div
              style={{
                backgroundColor: "rgba(82 132 181 / 30%)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "400px",
                minHeight: "80px",
                padding: "1rem",
                borderRadius: "12px",
              }}
            >
              <h4 style={{ margin: "0" }}>Client network: {ctx.network}</h4>
              <h4 style={{ margin: "0" }}>
                Client Url:{" "}
                <a href={ctx.config?.url} target="_blank" style={{ cursor: "pointer" }}>
                  {ctx.config?.url}
                </a>
              </h4>
            </div>
          </div>
          <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}>
            <Button radius="large" size="4" onClick={() => navigate("/integration")}>
              Bootcamp Frontend Integration
            </Button>
          </div>
        </>
      )}
      <p style={{ marginTop: "2rem" }} className="read-the-docs">
        Click on the Rise logos to learn more
      </p>
    </div>
  );
}

export default App;
