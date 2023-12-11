import { TransactionBlock } from "@mysten/sui.js/transactions";
import { useWalletKit } from "@mysten/wallet-kit";

import { PACKAGE_OBJECT_ID, DEV_HUB } from "../Constant/Constant";
import { WalletAccount } from "@wallet-standard/core";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
// import { useSuiClient } from "@mysten/dapp-kit";
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";

export const useMoveCalls = () => {
  // const suiClient = useSuiClient();
  const keypair = new Ed25519Keypair();
  console.log(keypair.getPublicKey());

  const suiClient = new SuiClient({
    url: getFullnodeUrl("devnet"),
  });

  const tx = new TransactionBlock(); // Create a transaction block
  const { signAndExecuteTransactionBlock } = useWalletKit();
  // const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();

  const handleCreateDeveloperCard = async () => {
    try {
      const [coin] = tx.splitCoins(tx.gas, [1000000000]); // define payment coin
      console.log("burayi atladik");
      // Calls the create_card function from the devcard package
      tx.moveCall({
        target: `${PACKAGE_OBJECT_ID}::devcard::create_card`,
        arguments: [
          tx.pure.string("Oguzhan"), // name
          tx.pure.string("Frontend & Blockchain Developer"), // title
          tx.pure.string("https://example_url.png"), // img_url
          tx.pure.u8(3), // years_of_experience
          tx.pure.string("JavaScript, Typescript, Next.js, Node.js, Move"), // technologies
          tx.pure.string("oguz@dev.com"), // contact
          coin, // payment coin
          tx.object(DEV_HUB), // devhub obj
        ],
      });

      console.log("surati atladik");

      const result = await suiClient.signAndExecuteTransactionBlock({ transactionBlock: tx, signer: keypair });

      console.log("otede kaldik");
      console.log({ result });
      // }

      // signAndExecute(
      //   {
      //     transactionBlock: tx,
      //     // account: wallet,
      //     // options: {
      //     //   showBalanceChanges: true,
      //     //   showEffects: true,
      //     //   showEvents: true,
      //     //   showInput: true,
      //     //   showObjectChanges: true,
      //     //   showRawInput: true,
      //     // },
      //     // requestType: "WaitForLocalExecution",
      //   },
      //   {
      //     onSuccess: (tx) => {
      //       suiClient
      //         .waitForTransactionBlock({
      //           digest: tx.digest,
      //         })
      //         .then(() => {});
      //     },
      //   }
      // );
    } catch (error) {
      console.error(error);
    }
  };

  const updateCardDescriptionFunction = async (address: WalletAccount) => {
    try {
      tx.moveCall({
        target: `${PACKAGE_OBJECT_ID}::devcard::update_card_description`,
        arguments: [
          tx.object(DEV_HUB), // devhub obj
          tx.pure.string("New description"),
          tx.pure.u64(2),
        ],
      });

      const result = await signAndExecuteTransactionBlock({
        transactionBlock: tx,
        account: address,
        options: {
          showBalanceChanges: true,
          showEffects: true,
          showEvents: true,
          showInput: true,
          showObjectChanges: true,
          showRawInput: true,
        },
        requestType: "WaitForLocalExecution",
      });
      console.log({ result });
    } catch (error) {
      console.error(error);
    }
  };

  const deactivateCard = async () => {
    try {
      tx.moveCall({
        target: `${PACKAGE_OBJECT_ID}::devcard::deactivate_card`,
        arguments: [tx.object(DEV_HUB), tx.pure.u64(1)],
      });
      const result = await signAndExecuteTransactionBlock({ transactionBlock: tx });
      console.log({ result });
    } catch (error) {
      console.error(error);
    }
  };

  return { handleCreateDeveloperCard, updateCardDescriptionFunction, deactivateCard };
};
