"use client";

import { config } from "@/lib/config";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { http } from "viem";
import { somniaTestnet } from "viem/chains";

export const wagmiConfig = getDefaultConfig({
  appName: "RoscaSecure",
  ssr: false,
  projectId: config.walletConnectProjectId,
  chains: [somniaTestnet],
  transports: {
    [somniaTestnet.id]: http(config.rpcUrl, {
      batch: true,
    }),
  },
});
