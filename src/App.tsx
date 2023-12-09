// import { useState } from "react";
import riseInLogo from "/risein.svg";
import "./App.css";
// import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";
// import { ConnectButton } from "@mysten/wallet-kit";
import { ConnectButton } from "@mysten/dapp-kit";
import { Button } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <a href="https://www.risein.com" target="_blank">
          <img src={riseInLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Sui Blockchain</h1>
      <nav>
        <ConnectButton></ConnectButton>
      </nav>
      <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}>
        <Button radius="large" size="3" onClick={() => navigate("/integration")}>
          Bootcamp Frontend Integration
        </Button>
      </div>
      <p className="read-the-docs">Click on the Rise logos to learn more</p>
    </div>
  );
}

export default App;
