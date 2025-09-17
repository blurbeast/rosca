"use client";

import { useState } from "react";
import { useWriteContract, useWaitForTransactionReceipt, useReadContract, useAccount } from "wagmi";
import { parseUnits } from "viem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { SUPPORTED_TOKENS } from "@/lib/config";
import { USDCABI } from "@/abi/USDCABI";
import { formatUnits } from "viem";

export function USDCMint() {
  const [mintAmount, setMintAmount] = useState("100");
  const { address } = useAccount();

  const { data: balance } = useReadContract({
    address: SUPPORTED_TOKENS.USDC.address,
    abi: USDCABI,
    functionName: "balanceOf",
    args: [address || "0x0"],
  });

  const { writeContract, data: hash, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleMint = async () => {
    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!mintAmount || parseFloat(mintAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      const amount = parseUnits(mintAmount, SUPPORTED_TOKENS.USDC.decimals);

      writeContract({
        address: SUPPORTED_TOKENS.USDC.address,
        abi: USDCABI,
        functionName: "mint",
        args: [amount],
      });
    } catch (error) {
      console.error("Mint error:", error);
      toast.error("Failed to mint USDC");
    }
  };

  if (isSuccess) {
    toast.success(`Successfully minted ${mintAmount} USDC!`);
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Mint USDC Tokens
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Mint test USDC tokens to participate in savings circles
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="mint-amount" className="text-sm font-medium">
            Amount to Mint
          </Label>
          <Input
            id="mint-amount"
            type="number"
            placeholder="100"
            value={mintAmount}
            onChange={(e) => setMintAmount(e.target.value)}
            className="text-center text-lg font-semibold"
            min="1"
            step="1"
          />
        </div>

        <Button
          onClick={handleMint}
          disabled={isPending || isConfirming || !mintAmount}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          size="lg"
        >
          {isPending || isConfirming ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>{isPending ? "Minting..." : "Confirming..."}</span>
            </div>
          ) : (
            `Mint ${mintAmount} USDC`
          )}
        </Button>

        {address && balance && (
          <div className="text-center text-sm bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="font-medium text-blue-800 dark:text-blue-200">
              Current Balance: {formatUnits(balance, SUPPORTED_TOKENS.USDC.decimals)} USDC
            </p>
          </div>
        )}

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Free test tokens for Somnia Testnet</p>
          <p className="mt-1">No real value • For testing only</p>
        </div>
      </CardContent>
    </Card>
  );
}