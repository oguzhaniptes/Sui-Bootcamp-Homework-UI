import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button } from "@radix-ui/themes";
import "../styles.css";
import { GlobeIcon } from "@radix-ui/react-icons";
import { SuiClientProviderContext } from "@mysten/dapp-kit";
import { NETWORK } from "../utils/enums";

const NetworkChanger = (props: { ctx: SuiClientProviderContext }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button size={"4"}>
          Networks
          <GlobeIcon style={{ scale: "1.5" }} />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          <DropdownMenu.Item
            className="DropdownMenuItem"
            onClick={() => {
              props.ctx.selectNetwork(NETWORK.DEVNET);
            }}
          >
            Devnet
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="DropdownMenuSeparator" />
          <DropdownMenu.Item
            className="DropdownMenuItem"
            onClick={() => {
              props.ctx.selectNetwork(NETWORK.TESTNET);
            }}
          >
            Testnet
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="DropdownMenuSeparator" />
          <DropdownMenu.Item
            className="DropdownMenuItem"
            onClick={() => {
              props.ctx.selectNetwork(NETWORK.LOCALNET);
            }}
          >
            Local
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default NetworkChanger;
