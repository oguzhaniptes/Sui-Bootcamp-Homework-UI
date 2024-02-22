import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { Button } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { useMoveCalls } from "../Sui/DevHubCaller";
import { useEffect, useState } from "react";

const Integration = () => {
  const navigate = useNavigate();
  const currentAccount = useCurrentAccount();
  const { faucetRequest, getBalance } = useMoveCalls();

  const [balance, setBalance] = useState<number>();

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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "row", gap: "2rem" }}>
        <h1>Integration</h1>
        <nav style={{ display: "flex", alignItems: "center" }}>
          <ConnectButton></ConnectButton>
        </nav>
      </div>
      {currentAccount && (
        <>
          <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
            <div>
              Active network
              <p style={{ margin: "0", fontWeight: "bold" }}> {currentAccount?.chains[0].slice(4).toUpperCase()}</p>
            </div>
            <div>
              Current balance
              <p style={{ margin: "0", fontWeight: "bold" }}>{balance}</p>
            </div>
            <h4 style={{ margin: "0" }}></h4>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginTop: "2rem", maxWidth: "240px", justifyItems: "center" }}>
            <Button size={"4"} onClick={() => navigate("/create-developer-card")} disabled={!currentAccount}>
              Create Developer Card
            </Button>
            <Button size={"4"} onClick={() => navigate("/get-card-info")} disabled={!currentAccount}>
              Get Card Info
            </Button>

            <Button size={"4"} onClick={() => faucetRequest(currentAccount?.address)} disabled={!currentAccount}>
              Faucet Request
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Integration;
