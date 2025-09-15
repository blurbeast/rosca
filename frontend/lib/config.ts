export const config = {
  chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID) || 50312,
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL as string,
  walletConnectProjectId: process.env
    .NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
} as const;

// ROSCA Contract Address
export const ROSCA_CONTRACT_ADDRESS =
  (process.env.NEXT_PUBLIC_ROSCA_CONTRACT_ADDRESS as `0x${string}`) ||
  "0x1234567890abcdef1234567890abcdef12345678"; // Replace with actual deployed address

// Supported ERC20 tokens for contributions on Somnia Testnet
// Note: Replace with actual Somnia Testnet token addresses when available
export const SUPPORTED_TOKENS = {
  USDC: {
    address: "0xA0b86a33E6417c2A35A16ABDB8aD10b83cB21de0" as `0x${string}`, // Somnia Testnet USDC (placeholder)
    decimals: 6,
    symbol: "USDC",
    name: "USD Coin",
  },
  USDT: {
    address: "0x2A17e4e4d8e6798e0D3F55E4D8a8a3e7c8F7A9B0" as `0x${string}`, // Somnia Testnet USDT (placeholder)
    decimals: 6,
    symbol: "USDT",
    name: "Tether USD",
  },
  DAI: {
    address: "0x3A17e4e4d8e6798e0D3F55E4D8a8a3e7c8F7A9B1" as `0x${string}`, // Somnia Testnet DAI (placeholder)
    decimals: 18,
    symbol: "DAI",
    name: "Dai Stablecoin",
  },
} as const;

// Circle configuration limits
export const CIRCLE_LIMITS = {
  MIN_MEMBERS: 2,
  MAX_MEMBERS: 100,
  MIN_PERIOD_HOURS: 1, // 1 hour for testing
  MIN_PERIOD_DAYS: 7, // 1 week minimum in production
  MAX_PERIOD_DAYS: 90, // 3 months maximum
  MIN_CONTRIBUTION: 1, // Minimum contribution amount
  MAX_CONTRIBUTION: 10000, // Maximum contribution amount
  MIN_COLLATERAL_FACTOR: 1,
  MAX_COLLATERAL_FACTOR: 10,
} as const;

// Period duration presets (in seconds)
export const PERIOD_PRESETS = {
  WEEKLY: 7 * 24 * 60 * 60,
  BIWEEKLY: 14 * 24 * 60 * 60,
  MONTHLY: 30 * 24 * 60 * 60,
  QUARTERLY: 90 * 24 * 60 * 60,
} as const;

// Circle states enum
export enum CircleState {
  Open = 0,
  Active = 1,
  Completed = 2,
  Cancelled = 3,
}

// Default values for circle creation
export const DEFAULT_CIRCLE_VALUES = {
  contributionAmount: "100",
  periodDuration: PERIOD_PRESETS.MONTHLY,
  maxMembers: 10,
  collateralFactor: 2,
  insuranceFee: "5",
  token: SUPPORTED_TOKENS.USDC.address,
} as const;
