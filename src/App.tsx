import riseInLogo from "/risein.svg";
import "./App.css";
import { ConnectButton, useCurrentAccount, useCurrentWallet } from "@mysten/dapp-kit";
import { Button } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const wallet = useCurrentWallet();
  const currentAccount = useCurrentAccount();

  return (
    <div>
      <div>
        <a href="https://www.risein.com" target="_blank">
          <img src={riseInLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: "2rem" }}>
        <h1>Sui Blockchain</h1>
        <nav style={{ display: "flex", alignItems: "center" }}>
          <ConnectButton></ConnectButton>
        </nav>
      </div>
      {wallet.isConnected && (
        <>
          <h4>Active network "{currentAccount?.chains[0].slice(4).toUpperCase()}"</h4>
          <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}>
            <Button radius="large" size="3" onClick={() => navigate("/integration")}>
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
