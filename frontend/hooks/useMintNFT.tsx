import { LaunchPadABI } from '@/abi/LaunchPad';
import { LAUNCHPAD_CONTRACT_ADDRESS } from '@/lib/config';
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from 'react'
import { toast } from 'sonner';
import {
    useWaitForTransactionReceipt,
    useWriteContract,
    type BaseError,
} from "wagmi";

const useMintNFT = () => {

    const { data: hash, error, writeContract } = useWriteContract();
    const router = useRouter();

    const createCollection = useCallback(async (name: string, cid: any) => {
        try {
            writeContract({
                address: LAUNCHPAD_CONTRACT_ADDRESS as `0x${string}`,
                abi: LaunchPadABI,
                functionName: 'createCollection',
                args: [name, cid],
            })

        } catch (error: any) {
            toast.error(error.message, { position: "top-right" });
        }
    }, [writeContract]);

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        });

    const toastId = "collection-mint";

    useEffect(() => {
        if (hash && isConfirming) {
            toast.loading("Processing...", {
                id: toastId,
                position: "top-right",
            });
        }

        if (isConfirmed && hash) {
            toast.dismiss(toastId);

            toast.success("Mint successful", {
                id: toastId,
                position: "top-right",
            });

            router.push("/collections");
        }

        if (error) {
            toast.dismiss(toastId);
            toast.error((error as BaseError).shortMessage || error.message, {
                id: toastId,
                position: "top-right",
            });
        }
    }, [isConfirmed, error, isConfirming, hash, router]);

    return { createCollection };
}

export default useMintNFT