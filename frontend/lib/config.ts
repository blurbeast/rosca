export const config = {
  chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
  alchemyKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY as string,
  walletConnectProjectId: process.env
    .NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
} as const;

export const LAUNCHPAD_CONTRACT_ADDRESS =
  "0x085deac56bb29b6f088fcf5d820a17395e311fda";
export const AUCTION_CONTRACT_ADDRESS = "";
