import { RoscaSecureABI } from '@/abi/RoscaSecure';
import { ROSCA_CONTRACT_ADDRESS, SUPPORTED_TOKENS } from '@/lib/config';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
    useWaitForTransactionReceipt,
    useWriteContract,
    useReadContract,
    type BaseError,
} from "wagmi";

// Hook for creating circles
export const useCreateCircle = () => {
    const { data: hash, error, writeContract, isPending } = useWriteContract();

    const createCircle = useCallback(async (params: {
        token: `0x${string}`;
        contributionAmount: bigint;
        periodDuration: bigint;
        maxMembers: bigint;
        collateralFactor: bigint;
        insuranceFee: bigint;
        initialPayoutOrder: `0x${string}`[];
    }) => {
        try {
            writeContract({
                address: ROSCA_CONTRACT_ADDRESS,
                abi: RoscaSecureABI,
                functionName: 'createCircle',
                args: [
                    params.token,
                    params.contributionAmount,
                    params.periodDuration,
                    params.maxMembers,
                    params.collateralFactor,
                    params.insuranceFee,
                    params.initialPayoutOrder,
                ],
            });
        } catch (error: any) {
            toast.error(error.message, { position: "top-right" });
        }
    }, [writeContract]);

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({ hash });

    useEffect(() => {
        if (hash && isConfirming) {
            toast.loading("Creating circle...", {
                id: "create-circle",
                position: "top-right",
            });
        }

        if (isConfirmed && hash) {
            toast.success("Circle created successfully!", {
                id: "create-circle",
                position: "top-right",
            });
        }

        if (error) {
            toast.error((error as BaseError).shortMessage || error.message, {
                id: "create-circle",
                position: "top-right",
            });
        }
    }, [isConfirmed, error, isConfirming, hash]);

    return { createCircle, isPending, isConfirming, isConfirmed, hash };
};

export const useContribute = () => {
    const { data: hash, error, writeContract, isPending } = useWriteContract();

    const contribute = useCallback(async (circleId: bigint) => {
        try {
            writeContract({
                address: ROSCA_CONTRACT_ADDRESS,
                abi: RoscaSecureABI,
                functionName: 'contribute',
                args: [circleId],
            });
        } catch (error: any) {
            toast.error(error.message, { position: "top-right" });
        }
    }, [writeContract]);

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({ hash });

    useEffect(() => {
        if (hash && isConfirming) {
            toast.loading("Processing contribution...", {
                id: "contribute",
                position: "top-right",
            });
        }

        if (isConfirmed && hash) {
            toast.success("Contribution successful!", {
                id: "contribute",
                position: "top-right",
            });
        }

        if (error) {
            toast.error((error as BaseError).shortMessage || error.message, {
                id: "contribute",
                position: "top-right",
            });
        }
    }, [isConfirmed, error, isConfirming, hash]);

    return { contribute, isPending, isConfirming, isConfirmed, hash };
};

export const useClaimPayout = () => {
    const { data: hash, error, writeContract, isPending } = useWriteContract();

    const claimPayout = useCallback(async (circleId: bigint) => {
        try {
            writeContract({
                address: ROSCA_CONTRACT_ADDRESS,
                abi: RoscaSecureABI,
                functionName: 'claimPayout',
                args: [circleId],
            });
        } catch (error: any) {
            toast.error(error.message, { position: "top-right" });
        }
    }, [writeContract]);

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({ hash });

    useEffect(() => {
        if (hash && isConfirming) {
            toast.loading("Claiming payout...", {
                id: "claim-payout",
                position: "top-right",
            });
        }

        if (isConfirmed && hash) {
            toast.success("Payout claimed successfully!", {
                id: "claim-payout",
                position: "top-right",
            });
        }

        if (error) {
            toast.error((error as BaseError).shortMessage || error.message, {
                id: "claim-payout",
                position: "top-right",
            });
        }
    }, [isConfirmed, error, isConfirming, hash]);

    return { claimPayout, isPending, isConfirming, isConfirmed, hash };
};

export const useWithdrawCollateral = () => {
    const { data: hash, error, writeContract, isPending } = useWriteContract();

    const withdrawCollateral = useCallback(async (circleId: bigint) => {
        try {
            writeContract({
                address: ROSCA_CONTRACT_ADDRESS,
                abi: RoscaSecureABI,
                functionName: 'withdrawCollateral',
                args: [circleId],
            });
        } catch (error: any) {
            toast.error(error.message, { position: "top-right" });
        }
    }, [writeContract]);

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({ hash });

    useEffect(() => {
        if (hash && isConfirming) {
            toast.loading("Withdrawing collateral...", {
                id: "withdraw-collateral",
                position: "top-right",
            });
        }

        if (isConfirmed && hash) {
            toast.success("Collateral withdrawn successfully!", {
                id: "withdraw-collateral",
                position: "top-right",
            });
        }

        if (error) {
            toast.error((error as BaseError).shortMessage || error.message, {
                id: "withdraw-collateral",
                position: "top-right",
            });
        }
    }, [isConfirmed, error, isConfirming, hash]);

    return { withdrawCollateral, isPending, isConfirming, isConfirmed, hash };
};

export const useCircleData = (circleId: bigint) => {
    const { data: circleInfo, isLoading: isLoadingInfo, error: infoError } = useReadContract({
        address: ROSCA_CONTRACT_ADDRESS,
        abi: RoscaSecureABI,
        functionName: 'getCircleInfo',
        args: [circleId],
    });

    const { data: members, isLoading: isLoadingMembers, error: membersError } = useReadContract({
        address: ROSCA_CONTRACT_ADDRESS,
        abi: RoscaSecureABI,
        functionName: 'getMembers',
        args: [circleId],
    });

    const { data: payoutOrder, isLoading: isLoadingOrder, error: orderError } = useReadContract({
        address: ROSCA_CONTRACT_ADDRESS,
        abi: RoscaSecureABI,
        functionName: 'getPayoutOrder',
        args: [circleId],
    });

    const { data: insurancePool, isLoading: isLoadingInsurance, error: insuranceError } = useReadContract({
        address: ROSCA_CONTRACT_ADDRESS,
        abi: RoscaSecureABI,
        functionName: 'getInsurancePool',
        args: [circleId],
    });

    return {
        circleInfo,
        members,
        payoutOrder,
        insurancePool,
        isLoading: isLoadingInfo || isLoadingMembers || isLoadingOrder || isLoadingInsurance,
        error: infoError || membersError || orderError || insuranceError,
    };
};

// Hook for reading member data
export const useMemberData = (circleId: bigint, memberAddress: `0x${string}`) => {
    const { data: memberInfo, isLoading, error } = useReadContract({
        address: ROSCA_CONTRACT_ADDRESS,
        abi: RoscaSecureABI,
        functionName: 'getMemberInfo',
        args: [circleId, memberAddress],
    });

    return {
        memberInfo,
        isLoading,
        error,
    };
};

// Hook for reading user's pending payouts
export const usePendingPayout = (circleId: bigint, userAddress: `0x${string}`) => {
    const { data: pendingAmount, isLoading, error } = useReadContract({
        address: ROSCA_CONTRACT_ADDRESS,
        abi: RoscaSecureABI,
        functionName: 'pendingPayouts',
        args: [circleId, userAddress],
    });

    return {
        pendingAmount,
        isLoading,
        error,
    };
};

// Hook for finalizing expired rounds
export const useFinalizeRound = () => {
    const { data: hash, error, writeContract, isPending } = useWriteContract();

    const finalizeRound = useCallback(async (circleId: bigint) => {
        try {
            writeContract({
                address: ROSCA_CONTRACT_ADDRESS,
                abi: RoscaSecureABI,
                functionName: 'finalizeRoundIfExpired',
                args: [circleId],
            });
        } catch (error: any) {
            toast.error(error.message, { position: "top-right" });
        }
    }, [writeContract]);

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({ hash });

    useEffect(() => {
        if (hash && isConfirming) {
            toast.loading("Finalizing round...", {
                id: "finalize-round",
                position: "top-right",
            });
        }

        if (isConfirmed && hash) {
            toast.success("Round finalized successfully!", {
                id: "finalize-round",
                position: "top-right",
            });
        }

        if (error) {
            toast.error((error as BaseError).shortMessage || error.message, {
                id: "finalize-round",
                position: "top-right",
            });
        }
    }, [isConfirmed, error, isConfirming, hash]);

    return { finalizeRound, isPending, isConfirming, isConfirmed, hash };
};

// Enhanced hook for joining circles with approval flow
export const useJoinCircle = () => {
    const { data: hash, error, writeContract, isPending } = useWriteContract();

    const joinCircle = useCallback(async (circleId: bigint) => {
        try {
            writeContract({
                address: ROSCA_CONTRACT_ADDRESS,
                abi: RoscaSecureABI,
                functionName: 'joinCircle',
                args: [circleId],
            });
        } catch (error: any) {
            toast.error(error.message, { position: "top-right" });
        }
    }, [writeContract]);

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({ hash });

    useEffect(() => {
        if (hash && isConfirming) {
            toast.loading("Joining circle...", {
                id: "join-circle",
                position: "top-right",
            });
        }

        if (isConfirmed && hash) {
            toast.success("Successfully joined circle!", {
                id: "join-circle",
                position: "top-right",
            });
        }

        if (error) {
            toast.error((error as BaseError).shortMessage || error.message, {
                id: "join-circle",
                position: "top-right",
            });
        }
    }, [isConfirmed, error, isConfirming, hash]);

    return { joinCircle, isPending, isConfirming, isConfirmed, hash };
};

// Unified hook for the complete join circle flow (approve + join)
export const useJoinCircleFlow = () => {
    const [currentStep, setCurrentStep] = useState<'idle' | 'approving' | 'joining' | 'completed' | 'error'>('idle');
    const [currentCircleId, setCurrentCircleId] = useState<bigint | null>(null);

    const { writeContract: writeApprove, data: approveHash, isPending: isApprovePending } = useWriteContract();
    const { writeContract: writeJoin, data: joinHash, isPending: isJoinPending } = useWriteContract();

    const { isLoading: isApproveConfirming, isSuccess: isApproveConfirmed, error: approveError } =
        useWaitForTransactionReceipt({ hash: approveHash });

    const { isLoading: isJoinConfirming, isSuccess: isJoinConfirmed, error: joinError } =
        useWaitForTransactionReceipt({ hash: joinHash });

    const startJoinFlow = useCallback(async (circleId: bigint, totalRequired: bigint) => {
        try {
            setCurrentStep('approving');
            setCurrentCircleId(circleId);

            // Step 1: Approve USDC spending
            writeApprove({
                address: SUPPORTED_TOKENS.USDC.address,
                abi: [
                    {
                        type: "function",
                        name: "approve",
                        inputs: [
                            { name: "spender", type: "address", internalType: "address" },
                            { name: "value", type: "uint256", internalType: "uint256" },
                        ],
                        outputs: [{ name: "success", type: "bool", internalType: "bool" }],
                        stateMutability: "nonpayable",
                    },
                ] as const,
                functionName: 'approve',
                args: [ROSCA_CONTRACT_ADDRESS, totalRequired],
            });
        } catch (error: any) {
            toast.error(error.message, { position: "top-right" });
            setCurrentStep('error');
        }
    }, [writeApprove]);

    const cancelFlow = useCallback(() => {
        setCurrentStep('idle');
        setCurrentCircleId(null);
        toast.dismiss('join-flow');
    }, []);

    // Handle approval confirmation
    useEffect(() => {
        if (isApproveConfirmed && currentStep === 'approving' && currentCircleId) {
            setCurrentStep('joining');
            toast.success("Approval confirmed! Now joining circle...", {
                id: "join-flow",
                position: "top-right",
            });

            // Step 2: Join circle
            writeJoin({
                address: ROSCA_CONTRACT_ADDRESS,
                abi: RoscaSecureABI,
                functionName: 'joinCircle',
                args: [currentCircleId],
            });
        }
    }, [isApproveConfirmed, currentStep, currentCircleId, writeJoin]);

    // Handle join confirmation
    useEffect(() => {
        if (isJoinConfirmed && currentStep === 'joining') {
            setCurrentStep('completed');
            toast.success("Successfully joined circle!", {
                id: "join-flow",
                position: "top-right",
            });
            // Reset after a brief delay
            setTimeout(() => {
                setCurrentStep('idle');
                setCurrentCircleId(null);
            }, 2000);
        }
    }, [isJoinConfirmed, currentStep]);

    // Handle errors
    useEffect(() => {
        if (approveError && currentStep === 'approving') {
            toast.error((approveError as BaseError).shortMessage || approveError.message, {
                id: "join-flow",
                position: "top-right",
            });
            setCurrentStep('error');
            setTimeout(() => {
                setCurrentStep('idle');
                setCurrentCircleId(null);
            }, 3000);
        }
    }, [approveError, currentStep]);

    useEffect(() => {
        if (joinError && currentStep === 'joining') {
            toast.error((joinError as BaseError).shortMessage || joinError.message, {
                id: "join-flow",
                position: "top-right",
            });
            setCurrentStep('error');
            setTimeout(() => {
                setCurrentStep('idle');
                setCurrentCircleId(null);
            }, 3000);
        }
    }, [joinError, currentStep]);

    // Loading state toasts
    useEffect(() => {
        if (isApprovePending && currentStep === 'approving') {
            toast.loading("Approving USDC spending...", {
                id: "join-flow",
                position: "top-right",
            });
        }
    }, [isApprovePending, currentStep]);

    useEffect(() => {
        if (isJoinPending && currentStep === 'joining') {
            toast.loading("Joining circle...", {
                id: "join-flow",
                position: "top-right",
            });
        }
    }, [isJoinPending, currentStep]);

    const isPending = currentStep !== 'idle' && currentStep !== 'completed';
    const isApproving = currentStep === 'approving' && (isApprovePending || isApproveConfirming);
    const isJoining = currentStep === 'joining' && (isJoinPending || isJoinConfirming);

    return {
        startJoinFlow,
        cancelFlow,
        currentStep,
        currentCircleId,
        isPending,
        isApproving,
        isJoining,
        isCompleted: currentStep === 'completed',
        isError: currentStep === 'error'
    };
};