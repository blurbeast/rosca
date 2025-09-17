'use client';

import { useParams, useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { useCircleData, useMemberData, usePendingPayout, useJoinCircleFlow, useContribute, useClaimPayout, useFinalizeRound } from '@/hooks/useRoscaContract';
import { useCircleInfo, useCircleDetails, useCircleMembers } from '@/hooks/useCircleQueries';
import { formatUnits } from 'viem';
import { SUPPORTED_TOKENS } from '@/lib/config';
import { ArrowLeft, Users, AlertCircle } from 'lucide-react';


export default function CircleDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { address } = useAccount();
    const circleId = BigInt(params.id as string);

    // Fetch circle data using new modular hooks
    const { circleInfo, isLoading: isLoadingInfo, error: infoError } = useCircleInfo(circleId);
    const { circleDetails, isLoading: isLoadingDetails, error: detailsError } = useCircleDetails(circleId);
    const { members, isLoading: isLoadingMembers, error: membersError } = useCircleMembers(circleId);

    // Legacy hooks for member data and payouts (keep for now)
    const { payoutOrder, insurancePool, isLoading: isLoadingLegacy, error: legacyError } = useCircleData(circleId);
    const { memberInfo, isLoading: isLoadingMember } = useMemberData(circleId, address || '0x0');
    const { pendingAmount, isLoading: isLoadingPayout } = usePendingPayout(circleId, address || '0x0');

    // Contract interaction hooks
    const { startJoinFlow, isPending: isJoining, currentStep } = useJoinCircleFlow();
    const { contribute, isPending: isContributing } = useContribute();
    const { claimPayout, isPending: isClaiming } = useClaimPayout();
    const { finalizeRound, isPending: isFinalizing } = useFinalizeRound();

    const isLoading = isLoadingInfo || isLoadingDetails || isLoadingMembers || isLoadingMember || isLoadingPayout || isLoadingLegacy;
    const error = infoError || detailsError || membersError || legacyError;

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center py-12">
                        <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-white mb-2">Error Loading Circle</h2>
                        <p className="text-slate-400 mb-6">Unable to load circle details. Please try again.</p>
                        <Button onClick={() => router.back()} variant="outline">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Go Back
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
                <div className="max-w-4xl mx-auto space-y-6">
                    <Skeleton className="h-8 w-32" />
                    <div className="grid gap-6 md:grid-cols-2">
                        <Skeleton className="h-64" />
                        <Skeleton className="h-64" />
                    </div>
                    <Skeleton className="h-48" />
                </div>
            </div>
        );
    }

    const getStatusBadge = (status: number) => {
        switch (status) {
            case 0: return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Open</Badge>;
            case 1: return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>;
            case 2: return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Completed</Badge>;
            case 3: return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Cancelled</Badge>;
            default: return <Badge variant="outline">Unknown</Badge>;
        }
    };

    const formatTokenAmount = (amount: bigint, symbol: string = 'USDC') => {
        return `${formatUnits(amount, 6)} ${symbol}`;
    };

    const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

    const formatPeriod = (seconds: number) => {
        const days = Math.floor(seconds / (24 * 60 * 60));
        if (days === 7) return "Weekly";
        if (days === 14) return "Bi-weekly";
        if (days === 30) return "Monthly";
        return `${days} days`;
    };

    const isMember = members?.includes(address || '0x0');

    // Fix: Using the structured CircleInfo object instead of array indices
    const canJoin = circleInfo?.state === 0 && !isMember && (members?.length || 0) < Number(circleInfo?.maxMembers || 0); // Open status and not full
    const canContribute = circleInfo?.state === 1 && isMember; // Active status and is member
    const hasPendingPayout = pendingAmount && pendingAmount > BigInt(0);
    const currentRound = Number(circleInfo?.currentRound || 0);
    const maxMembers = Number(circleInfo?.maxMembers || 0);
    const currentMembers = members?.length || 0;
    const progressPercentage = maxMembers > 0 ? (currentMembers / maxMembers) * 100 : 0;

    const handleJoinCircle = async () => {
        if (!circleInfo) return;
        const contributionAmount = circleInfo.contributionAmount;
        const collateralFactor = circleInfo.collateralFactor;
        const insuranceFee = circleInfo.insuranceFee;
        const totalRequired = contributionAmount + (contributionAmount * collateralFactor / BigInt(100)) + insuranceFee;

        await startJoinFlow(circleId, totalRequired);
    };

    const handleContribute = () => {
        contribute(circleId);
    };

    const handleClaimPayout = () => {
        claimPayout(circleId);
    };

    const handleFinalizeRound = () => {
        finalizeRound(circleId);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Button
                        onClick={() => router.back()}
                        variant="ghost"
                        size="sm"
                        className="text-slate-400 hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Circles
                    </Button>
                </div>

                {/* Circle Overview */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-white text-xl">
                                    {circleDetails?.name || `Circle #${circleId}`}
                                </CardTitle>
                                {circleInfo && getStatusBadge(circleInfo.state)}
                            </div>
                            <CardDescription className="text-slate-400">
                                {circleDetails?.description || 'No description available'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-slate-400">Contribution Amount</p>
                                    <p className="text-white font-semibold">
                                        {circleInfo ? formatTokenAmount(circleInfo.contributionAmount) : 'Loading...'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-slate-400">Period Duration</p>
                                    <p className="text-white font-semibold">
                                        {circleInfo ? formatPeriod(Number(circleInfo.periodDuration)) : 'Loading...'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-slate-400">Collateral Factor</p>
                                    <p className="text-white font-semibold">
                                        {circleInfo ? `${Number(circleInfo.collateralFactor)}%` : 'Loading...'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-slate-400">Insurance Fee</p>
                                    <p className="text-white font-semibold">
                                        {circleInfo ? formatTokenAmount(circleInfo.insuranceFee) : 'Loading...'}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Members ({currentMembers}/{maxMembers})
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-400">Circle Progress</span>
                                    <span className="text-white">{progressPercentage.toFixed(1)}%</span>
                                </div>
                                <Progress value={progressPercentage} className="h-2" />
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-slate-400">Current Round</p>
                                    <p className="text-white font-semibold">{currentRound}</p>
                                </div>
                                <div>
                                    <p className="text-slate-400">Insurance Pool</p>
                                    <p className="text-white font-semibold">
                                        {insurancePool ? formatTokenAmount(insurancePool) : 'Loading...'}
                                    </p>
                                </div>
                            </div>

                            {isMember && memberInfo && (
                                <div className="pt-4 border-t border-slate-700">
                                    <p className="text-slate-400 text-sm mb-2">Your Status</p>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div>
                                            <span className="text-slate-400">Contributed:</span>
                                            <span className="text-green-400 ml-1">
                                                {memberInfo[1] ? '✓' : '✗'}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-slate-400">Received Payout:</span>
                                            <span className="text-blue-400 ml-1">
                                                {memberInfo[2] ? '✓' : '✗'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Actions */}
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white">Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-4">
                            {canJoin && (
                                <Button
                                    onClick={handleJoinCircle}
                                    disabled={isJoining}
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                                >
                                    {currentStep === 'approving' ? 'Approving...' :
                                        currentStep === 'joining' ? 'Joining...' : 'Join Circle'}
                                </Button>
                            )}

                            {canContribute && (
                                <Button
                                    onClick={handleContribute}
                                    disabled={isContributing}
                                    variant="outline"
                                    className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                                >
                                    {isContributing ? 'Contributing...' : 'Contribute'}
                                </Button>
                            )}

                            {hasPendingPayout && (
                                <Button
                                    onClick={handleClaimPayout}
                                    disabled={isClaiming}
                                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                                >
                                    {isClaiming ? 'Claiming...' : `Claim ${formatTokenAmount(pendingAmount || BigInt(0))}`}
                                </Button>
                            )}

                            {circleInfo && circleInfo.state === 1 && (
                                <Button
                                    onClick={handleFinalizeRound}
                                    disabled={isFinalizing}
                                    variant="outline"
                                    className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                                >
                                    {isFinalizing ? 'Finalizing...' : 'Finalize Round'}
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Member List */}
                {members && members.length > 0 && (
                    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-white">Circle Members</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {members.map((member, index) => (
                                    <div
                                        key={member}
                                        className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                                {index + 1}
                                            </div>
                                            <span className="text-white font-mono text-sm">
                                                {formatAddress(member)}
                                            </span>
                                            {member === address && (
                                                <Badge variant="outline" className="text-xs">You</Badge>
                                            )}
                                        </div>
                                        <div className="text-slate-400 text-sm">
                                            {payoutOrder && payoutOrder[index] === member && (
                                                <span className="text-green-400">Next Payout</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}