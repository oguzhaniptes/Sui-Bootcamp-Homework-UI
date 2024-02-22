import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { Button } from "@radix-ui/themes";
import { useMoveCalls } from "../Sui/DevHubCaller";

const DeveloperCard = () => {
  const currentAccount = useCurrentAccount();
  const { createDeveloperCard } = useMoveCalls();

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row", gap: "2rem" }}>
        <h1>Create Developer Card</h1>
        <nav style={{ display: "flex", alignItems: "center" }}>
          <ConnectButton></ConnectButton>
        </nav>
      </div>
      {currentAccount && <h4>Active network "{currentAccount?.chains[0].slice(4).toUpperCase()}"</h4>}
      <div style={{ marginTop: "2rem" }}>
        <Button size={"4"} onClick={() => createDeveloperCard(currentAccount!)} disabled={!currentAccount}>
          Create
        </Button>
      </div>
    </div>
  );
};

export default DeveloperCard;
