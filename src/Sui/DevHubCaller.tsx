import {TransactionBlock} from "@mysten/sui.js/transactions";
import {useWalletKit} from "@mysten/wallet-kit";
import {ACTIVE_NETWORK, DEV_HUB, PACKAGE_OBJECT_ID} from "../utils/constant";
import {WalletAccount} from "@wallet-standard/core";
import {getFullnodeUrl, SuiClient} from "@mysten/sui.js/client";
import {useSignAndExecuteTransactionBlock} from "@mysten/dapp-kit";
import {getFaucetHost, requestSuiFromFaucetV0} from "@mysten/sui.js/faucet";
import {Ed25519Keypair} from "@mysten/sui.js/keypairs/ed25519";
import {fromHEX} from "@mysten/bcs";

export const useMoveCalls = () => {
  // const currentAccount = useCurrentAccount();
  // console.log("current ac", currentAccount);

  const keypair = Ed25519Keypair.fromSecretKey(fromHEX("0x52595bf7b39ffe54afbd90764628b6ab38046b1f72bcd5c142a209b5eb420869"));

  const suiClient = new SuiClient({
    url: getFullnodeUrl("testnet"),
  });

  const tx = new TransactionBlock(); // Create a transaction block
  const { signAndExecuteTransactionBlock } = useWalletKit();
  const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();

  const createDeveloperCard = async (wallet: WalletAccount) => {
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

  //wallet: WalletAccount
  const getCardInfo = async (devhub: string, id: number = 0) => {
    try {
      const init = async () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks

        // console.log(data);

        tx.moveCall({
          // target: `${PACKAGE_OBJECT_ID}::devcard::get_card_info`,
          target: `0x2::object_table::ObjectTable<${id}, ${PACKAGE_OBJECT_ID}::devcard::DevCard>`,
          arguments: [tx.object(devhub), tx.pure.u64(id)],
        });

        const result = await suiClient.signAndExecuteTransactionBlock({
          transactionBlock: tx,
          signer: keypair,
          requestType: "WaitForLocalExecution",
          options: {
            showEffects: true,
          },
        });

        const transactionBlock = await suiClient.waitForTransactionBlock({
          digest: result.digest,
          options: {
            showBalanceChanges: true,
            showEffects: true,
            showEvents: true,
            showInput: true,
            showObjectChanges: true,
            showRawInput: true,
          },
        });

        // const bcs = new BCS(getSuiMoveConfig());
        // const rawI = transactionBlock.rawTransaction;

        console.log("res  ", result);
        console.log("transs, ", transactionBlock);

        // console.log(bcs.de("",rawI,""));

        // signAndExecute(
        //   {
        //     transactionBlock: tx,
        //     account: wallet,
        //   },
        //   {
        //     onSuccess: (tx) => {
        //       suiClient
        //         .waitForTransactionBlock({
        //           options: {
        //             showBalanceChanges: true,
        //             showEffects: true,
        //             showEvents: true,
        //             showInput: true,
        //             showObjectChanges: true,
        //             showRawInput: true,
        //           },
        //           digest: tx.digest,
        //         })
        //         .then((e) => {
        //           digestData = e.digest;
        //           console.log("bok", e.digest);
        //           console.log("bok22222", digestData);
        //         });
        //     },
        //   }
        // );
      };
      init();
    } catch (error) {
      console.log(error);
    }
  };

  const faucetRequest = async (address: string) => {
    await requestSuiFromFaucetV0({
      host: getFaucetHost(ACTIVE_NETWORK),
      recipient: address,
    });
  };

  const getBalance = async (address: string): Promise<number> => {
    const result = await suiClient.getBalance({
      owner: address,
    });
    return Number(result.totalBalance) / Math.pow(10, 9);
  };

  return { createDeveloperCard, updateCardDescriptionFunction, deactivateCard, getCardInfo, faucetRequest, getBalance };
};
