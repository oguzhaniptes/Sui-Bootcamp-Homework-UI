import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { Button } from "@radix-ui/themes";
import { useMoveCalls } from "../Sui/DevHubCaller";
// import { useWalletKit } from "@mysten/wallet-kit";

const DeveloperCard = () => {
  const currentAccount = useCurrentAccount();
  console.log(currentAccount);
  const { handleCreateDeveloperCard } = useMoveCalls();

  return (
    <div>
      <nav>
        <ConnectButton></ConnectButton>
      </nav>
      <div style={{ marginTop: "2rem" }}>
        {currentAccount && (
          <Button size={"4"} onClick={handleCreateDeveloperCard}>
            Create Developer Card
          </Button>
        )}
      </div>
    </div>
  );
};

export default DeveloperCard;
