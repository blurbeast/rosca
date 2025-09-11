"use client";

import { config } from "@/lib/config";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { http } from "viem";
import { shape, shapeSepolia } from "viem/chains";

export const wagmiConfig = getDefaultConfig({
  appName: "Artifusion",
  ssr: false,
  projectId: config.walletConnectProjectId,
  chains: [shape, shapeSepolia],
  transports: {
    [shape.id]: http(
      `https://shape-mainnet.g.alchemy.com/v2/${config.alchemyKey}`,
      {
        batch: true,
      }
    ),
    [shapeSepolia.id]: http(
      `https://shape-sepolia.g.alchemy.com/v2/${config.alchemyKey}`,
      {
        batch: true,
      }
    ),
  },
});
