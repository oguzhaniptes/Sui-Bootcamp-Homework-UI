import { TransactionBlock } from "@mysten/sui.js/transactions";
import { useWalletKit } from "@mysten/wallet-kit";

import { PACKAGE_OBJECT_ID, DEV_HUB } from "../Constant/Constant";
import { WalletAccount } from "@wallet-standard/core";
// import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
// import { fromHEX } from "@mysten/sui.js/utils";
import { useSignAndExecuteTransactionBlock } from "@mysten/dapp-kit";

export const useMoveCalls = () => {
  // const currentAccount = useCurrentAccount();
  // console.log("current ac", currentAccount);

  // const keypair = Ed25519Keypair.fromSecretKey(fromHEX("0x52595bf7b39ffe54afbd90764628b6ab38046b1f72bcd5c142a209b5eb420869"));

  const suiClient = new SuiClient({
    url: getFullnodeUrl("testnet"),
  });

  const tx = new TransactionBlock(); // Create a transaction block
  const { signAndExecuteTransactionBlock } = useWalletKit();
  const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();

  const handleCreateDeveloperCard = async (wallet: WalletAccount) => {
    try {
      const [coin] = tx.splitCoins(tx.gas, [1]); // define payment coin
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

      // const result = await suiClient.signAndExecuteTransactionBlock({
      //   transactionBlock: tx,
      //   signer: keypair,
      //   options: { showBalanceChanges: true, showEffects: true, showEvents: true, showInput: true, showObjectChanges: true, showRawInput: true },
      // });

      const result = signAndExecute(
        {
          transactionBlock: tx,
          account: wallet,
        },
        {
          onSuccess: (tx) => {
            suiClient
              .waitForTransactionBlock({
                digest: tx.digest,
              })
              .then(() => {});
          },
        }
      );
      console.log(result);
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

  const getCardInfo = async (devhub: string, id: number = 0, wallet: WalletAccount) => {
    try {
      tx.moveCall({
        target: `${PACKAGE_OBJECT_ID}::devcard::get_card_info`,
        arguments: [tx.object(devhub), tx.pure.u64(id)],
      });

      // const result = await suiClient.signAndExecuteTransactionBlock({
      //   transactionBlock: tx,
      //   signer: keypair,
      //   requestType: "WaitForLocalExecution",
      //   // options: { showBalanceChanges: true, showEffects: true, showEvents: true, showInput: true, showObjectChanges: true, showRawInput: true },
      // });
      // console.log(result);

      // const result = await suiClient.signAndExecuteTransactionBlock({ transactionBlock: tx, signer: keypair });

      const result = signAndExecute(
        {
          transactionBlock: tx,
          account: wallet,
        },
        {
          onSuccess: (tx) => {
            suiClient
              .waitForTransactionBlock({
                digest: tx.digest,
              })
              .then(() => {});
          },
        }
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return { handleCreateDeveloperCard, updateCardDescriptionFunction, deactivateCard, getCardInfo };
};
