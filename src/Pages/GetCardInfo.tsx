import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { Button, TextArea } from "@radix-ui/themes";
import { useMoveCalls } from "../Sui/DevHubCaller";
import { useState } from "react";
import { DEV_HUB } from "../Constant/Constant";

const GetCardInfo = () => {
  const currentAccount = useCurrentAccount();
  // console.log("current ac", currentAccount);
  const { getCardInfo } = useMoveCalls();
  const [id, setID] = useState<number>(-1);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row", gap: "2rem" }}>
        <h1>Get Card Info</h1>
        <nav style={{ display: "flex", alignItems: "center" }}>
          <ConnectButton></ConnectButton>
        </nav>
      </div>
      {currentAccount && <h4>Active network "{currentAccount?.chains[0].slice(4).toUpperCase()}"</h4>}
      <div>
        <TextArea
          disabled={!currentAccount}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setID(Number(event.target.value))}
          placeholder="Card ID"
          size={"3"}
        ></TextArea>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <Button disabled={!id || id < 0 || !currentAccount} size={"4"} onClick={() => getCardInfo(DEV_HUB, id, currentAccount!)}>
          Get info
        </Button>
      </div>
    </div>
  );
};

export default GetCardInfo;
