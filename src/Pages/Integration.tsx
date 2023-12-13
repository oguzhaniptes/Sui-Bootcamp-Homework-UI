import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { Button } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

const Integration = () => {
  const navigate = useNavigate();
  const currentAccount = useCurrentAccount();

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "row", gap: "2rem" }}>
        <h1>Integration</h1>
        <nav style={{ display: "flex", alignItems: "center" }}>
          <ConnectButton></ConnectButton>
        </nav>
      </div>
      {currentAccount && <h4>Active network "{currentAccount?.chains[0].slice(4).toUpperCase()}"</h4>}
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginTop: "2rem", maxWidth: "240px", justifyItems: "center" }}>
        <Button size={"4"} onClick={() => navigate("/create-developer-card")} disabled={!currentAccount}>
          Create Developer Card
        </Button>
        <Button size={"4"} onClick={() => navigate("/get-card-info")} disabled={!currentAccount}>
          Get Card Info
        </Button>
      </div>
    </div>
  );
};

export default Integration;
