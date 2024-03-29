import React from "react";
import ReactDOM from "react-dom/client";
import { Theme } from "@radix-ui/themes";
import "./index.css";
import "@mysten/dapp-kit/dist/index.css";
import "@radix-ui/themes/styles.css";

import { getFullnodeUrl } from "@mysten/sui.js/client";

import { SuiClientProvider, WalletProvider, createNetworkConfig } from "@mysten/dapp-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./Router/Router.tsx";
import { WalletKitProvider } from "@mysten/wallet-kit";
import { ACTIVE_NETWORK } from "./utils/constant.tsx";

const queryClient = new QueryClient();

const { networkConfig } = createNetworkConfig({
  localnet: { url: getFullnodeUrl("localnet") },
  devnet: { url: getFullnodeUrl("devnet") },
  testnet: { url: getFullnodeUrl("testnet") },
  mainnet: { url: getFullnodeUrl("mainnet") },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme appearance="dark">
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={networkConfig} defaultNetwork={ACTIVE_NETWORK}>
          <WalletProvider autoConnect>
            <WalletKitProvider>
              <Router />
            </WalletKitProvider>
          </WalletProvider>
        </SuiClientProvider>
      </QueryClientProvider>
    </Theme>
  </React.StrictMode>
);
