"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
    Shield,
    Users,
    Clock,
    DollarSign,
    TrendingUp,
    Calendar,
    AlertCircle,
    CheckCircle,
    ExternalLink,
    Copy,
    User,
    Coins
} from "lucide-react"
import { useAccount } from 'wagmi'
import { CircleState, SUPPORTED_TOKENS } from "@/lib/config"
import { useJoinCircle, useContribute, useClaimPayout } from "@/hooks/useRoscaContract"

// Mock circle data - replace with actual contract reads
const mockCircle = {
    id: 1,
    name: "Monthly Savers Group",
    description: "A group of professionals saving for emergency funds and investments. We meet monthly to contribute and support each other's financial goals.",
    creator: "0x1234567890abcdef1234567890abcdef12345678",
    token: SUPPORTED_TOKENS.USDC.address,
    contributionAmount: "100",
    periodDuration: 2592000, // 30 days in seconds
    maxMembers: 10,
    collateralFactor: 2,
    insuranceFee: "5",
    state: CircleState.Active,
    startTimestamp: Math.floor(Date.now() / 1000) - 86400, // Started 1 day ago
    currentRound: 2,
    roundStart: Math.floor(Date.now() / 1000) - 3600, // Current round started 1 hour ago
    members: [
        {
            address: "0x1234567890abcdef1234567890abcdef12345678",
            collateralLocked: "200",
            defaults: 0,
            isCreator: true,
            hasContributed: true,
            joinedAt: "2024-03-15",
        },
        {
            address: "0x2345678901abcdef2345678901abcdef23456789",
            collateralLocked: "200",
            defaults: 0,
            isCreator: false,
            hasContributed: true,
            joinedAt: "2024-03-16",
        },
        {
            address: "0x3456789012abcdef3456789012abcdef34567890",
            collateralLocked: "200",
            defaults: 0,
            isCreator: false,
            hasContributed: false,
            joinedAt: "2024-03-17",
        },
        {
            address: "0x4567890123abcdef4567890123abcdef45678901",
            collateralLocked: "200",
            defaults: 1,
            isCreator: false,
            hasContributed: false,
            joinedAt: "2024-03-18",
        },
    ],
    payoutOrder: [
        "0x1234567890abcdef1234567890abcdef12345678",
        "0x2345678901abcdef2345678901abcdef23456789",
        "0x3456789012abcdef3456789012abcdef34567890",
        "0x4567890123abcdef4567890123abcdef45678901",
    ],
    insurancePool: "20",
    roundHistory: [
        {
            round: 1,
            winner: "0x1234567890abcdef1234567890abcdef12345678",
            amount: "400",
            timestamp: Math.floor(Date.now() / 1000) - 2592000,
            participantCount: 4,
            defaults: 0,
        },
    ],
    nextRoundDate: new Date(Date.now() + 86400 * 29), // 29 days from now
}

export default function CircleDetailPage({ params }: { params: { id: string } }) {
    const { address, isConnected } = useAccount()
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)

    const { joinCircle, isPending: isJoining } = useJoinCircle()
    const { contribute, isPending: isContributing } = useContribute()
    const { claimPayout, isPending: isClaiming } = useClaimPayout()

    const circleId = parseInt(params.id)
    const selectedToken = Object.values(SUPPORTED_TOKENS).find(
        token => token.address === mockCircle.token
    ) || SUPPORTED_TOKENS.USDC

    const isUserMember = mockCircle.members.some(m => m.address === address)
    const userMember = mockCircle.members.find(m => m.address === address)
    const canJoin = mockCircle.state === CircleState.Open && !isUserMember && mockCircle.members.length < mockCircle.maxMembers
    const canContribute = isUserMember && !userMember?.hasContributed && mockCircle.state === CircleState.Active

    const contributionsThisRound = mockCircle.members.filter(m => m.hasContributed).length
    const contributionProgress = (contributionsThisRound / mockCircle.members.length) * 100

    const currentWinner = mockCircle.payoutOrder[mockCircle.currentRound - 1]
    const isCurrentWinner = currentWinner === address

    const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`
    const formatDate = (date: Date) => date.toLocaleDateString()
    const formatPeriod = (seconds: number) => {
        const days = Math.floor(seconds / (24 * 60 * 60))
        if (days === 7) return "Weekly"
        if (days === 14) return "Bi-weekly"
        if (days === 30) return "Monthly"
        return `${days} days`
    }

    const handleJoin = async () => {
        if (!isConnected || !canJoin) return
        await joinCircle(BigInt(circleId))
        setIsJoinModalOpen(false)
    }

    const handleContribute = async () => {
        if (!canContribute) return
        await contribute(BigInt(circleId))
    }

    const handleClaimPayout = async () => {
        if (!isCurrentWinner) return
        await claimPayout(BigInt(circleId))
    }

    const getStatusBadge = (state: CircleState) => {
        switch (state) {
            case CircleState.Open:
                return <Badge className="bg-primary/20 text-primary">Open to Join</Badge>
            case CircleState.Active:
                return <Badge className="bg-secondary/20 text-secondary">Active</Badge>
            case CircleState.Completed:
                return <Badge className="bg-green-500/20 text-green-400">Completed</Badge>
            case CircleState.Cancelled:
                return <Badge className="bg-red-500/20 text-red-400">Cancelled</Badge>
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 mt-16">
                <div className="max-w-7xl mx-auto">

                    {/* Circle Header */}
                    <Card className="glass-morphism border-primary/20 mb-8">
                        <CardContent className="p-8">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <h1 className="text-3xl font-bold text-foreground">{mockCircle.name}</h1>
                                        {getStatusBadge(mockCircle.state)}
                                    </div>

                                    <p className="text-muted-foreground leading-relaxed mb-6">{mockCircle.description}</p>

                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="w-8 h-8">
                                                <AvatarFallback className="text-xs bg-primary/20 text-primary">
                                                    {mockCircle.creator.slice(2, 4).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-foreground font-medium">Creator</p>
                                                <p className="text-muted-foreground text-sm font-mono">{formatAddress(mockCircle.creator)}</p>
                                            </div>
                                        </div>

                                        <Button variant="ghost" size="sm">
                                            <Copy className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Action Panel */}
                                <div className="md:w-80">
                                    <Card className="glass-morphism border-secondary/20">
                                        <CardContent className="p-6">
                                            {/* Current Round Info */}
                                            {mockCircle.state === CircleState.Active && (
                                                <div className="text-center mb-6">
                                                    <p className="text-muted-foreground text-sm mb-1">Round {mockCircle.currentRound}</p>
                                                    <p className="text-3xl font-bold text-primary">{mockCircle.contributionAmount} {selectedToken.symbol}</p>
                                                    <p className="text-muted-foreground text-sm">Per member contribution</p>
                                                </div>
                                            )}

                                            {/* Membership Status */}
                                            <div className="space-y-4">
                                                <div>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-muted-foreground text-sm">Members</span>
                                                        <span className="text-foreground font-medium text-sm">
                                                            {mockCircle.members.length}/{mockCircle.maxMembers}
                                                        </span>
                                                    </div>
                                                    <Progress value={(mockCircle.members.length / mockCircle.maxMembers) * 100} className="h-2" />
                                                </div>

                                                {mockCircle.state === CircleState.Active && (
                                                    <div>
                                                        <div className="flex justify-between items-center mb-2">
                                                            <span className="text-muted-foreground text-sm">This Round</span>
                                                            <span className="text-foreground font-medium text-sm">
                                                                {contributionsThisRound}/{mockCircle.members.length} paid
                                                            </span>
                                                        </div>
                                                        <Progress value={contributionProgress} className="h-2" />
                                                    </div>
                                                )}

                                                {/* Action Buttons */}
                                                <div className="space-y-2">
                                                    {canJoin && (
                                                        <Dialog open={isJoinModalOpen} onOpenChange={setIsJoinModalOpen}>
                                                            <DialogTrigger asChild>
                                                                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 neon-glow">
                                                                    <Users className="w-4 h-4 mr-2" />
                                                                    Join Circle
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="glass-morphism border-primary/20">
                                                                <DialogHeader>
                                                                    <DialogTitle>Join Savings Circle</DialogTitle>
                                                                </DialogHeader>
                                                                <div className="space-y-4">
                                                                    <p className="text-muted-foreground">
                                                                        You are about to join "{mockCircle.name}". This requires locking collateral.
                                                                    </p>
                                                                    <div className="space-y-2 text-sm">
                                                                        <div className="flex justify-between">
                                                                            <span>Collateral Required</span>
                                                                            <span>{parseFloat(mockCircle.contributionAmount) * mockCircle.collateralFactor} {selectedToken.symbol}</span>
                                                                        </div>
                                                                        <div className="flex justify-between">
                                                                            <span>Insurance Fee</span>
                                                                            <span>{mockCircle.insuranceFee} {selectedToken.symbol}</span>
                                                                        </div>
                                                                        <div className="flex justify-between font-semibold">
                                                                            <span>Total Required</span>
                                                                            <span>{parseFloat(mockCircle.contributionAmount) * mockCircle.collateralFactor + parseFloat(mockCircle.insuranceFee)} {selectedToken.symbol}</span>
                                                                        </div>
                                                                    </div>
                                                                    <Button onClick={handleJoin} className="w-full" disabled={isJoining}>
                                                                        {isJoining ? "Joining..." : "Confirm Join"}
                                                                    </Button>
                                                                </div>
                                                            </DialogContent>
                                                        </Dialog>
                                                    )}

                                                    {canContribute && (
                                                        <Button
                                                            onClick={handleContribute}
                                                            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                                                            disabled={isContributing}
                                                        >
                                                            <DollarSign className="w-4 h-4 mr-2" />
                                                            {isContributing ? "Contributing..." : `Pay ${mockCircle.contributionAmount} ${selectedToken.symbol}`}
                                                        </Button>
                                                    )}

                                                    {isCurrentWinner && (
                                                        <Button
                                                            onClick={handleClaimPayout}
                                                            className="w-full bg-green-500 text-white hover:bg-green-600"
                                                            disabled={isClaiming}
                                                        >
                                                            <Coins className="w-4 h-4 mr-2" />
                                                            {isClaiming ? "Claiming..." : "Claim Payout"}
                                                        </Button>
                                                    )}

                                                    {!isConnected && (
                                                        <p className="text-center text-muted-foreground text-sm">
                                                            Connect wallet to interact
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Details Tabs */}
                    <Tabs defaultValue="overview" className="space-y-6">
                        <TabsList className="glass-morphism border border-primary/20">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="members">Members</TabsTrigger>
                            <TabsTrigger value="schedule">Schedule</TabsTrigger>
                            <TabsTrigger value="history">History</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview">
                            <div className="grid md:grid-cols-2 gap-6">
                                <Card className="glass-morphism border-primary/20">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Shield className="w-5 h-5 text-primary" />
                                            Circle Details
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="text-muted-foreground">Token</span>
                                                <p className="text-foreground font-medium">{selectedToken.symbol}</p>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Period</span>
                                                <p className="text-foreground font-medium">{formatPeriod(mockCircle.periodDuration)}</p>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Collateral Factor</span>
                                                <p className="text-foreground font-medium">{mockCircle.collateralFactor}x</p>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Insurance Pool</span>
                                                <p className="text-foreground font-medium">{mockCircle.insurancePool} {selectedToken.symbol}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="glass-morphism border-secondary/20">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <TrendingUp className="w-5 h-5 text-secondary" />
                                            Financial Summary
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Total Pool (per round)</span>
                                                <span className="text-foreground font-medium">
                                                    {mockCircle.members.length * parseFloat(mockCircle.contributionAmount)} {selectedToken.symbol}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Total Locked Collateral</span>
                                                <span className="text-foreground font-medium">
                                                    {mockCircle.members.reduce((sum, m) => sum + parseFloat(m.collateralLocked), 0)} {selectedToken.symbol}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Success Rate</span>
                                                <span className="text-green-400 font-medium">100%</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="members">
                            <Card className="glass-morphism border-primary/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Users className="w-5 h-5 text-primary" />
                                        Circle Members ({mockCircle.members.length})
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {mockCircle.members.map((member, index) => (
                                            <div key={member.address} className="flex items-center justify-between p-4 glass-morphism rounded-lg border border-primary/10">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="w-10 h-10">
                                                        <AvatarFallback className="text-sm bg-primary/20 text-primary">
                                                            {member.address.slice(2, 4).toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <p className="font-mono text-foreground">{formatAddress(member.address)}</p>
                                                            {member.isCreator && <Badge variant="secondary" className="text-xs">Creator</Badge>}
                                                            {member.address === address && <Badge variant="outline" className="text-xs">You</Badge>}
                                                        </div>
                                                        <p className="text-muted-foreground text-sm">
                                                            Joined {member.joinedAt} • {member.defaults} defaults
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        {member.hasContributed ? (
                                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                                        ) : (
                                                            <Clock className="w-4 h-4 text-yellow-400" />
                                                        )}
                                                        <span className="text-sm">
                                                            {member.hasContributed ? "Paid" : "Pending"}
                                                        </span>
                                                    </div>
                                                    <p className="text-muted-foreground text-xs">
                                                        {member.collateralLocked} {selectedToken.symbol} locked
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="schedule">
                            <Card className="glass-morphism border-secondary/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-secondary" />
                                        Payout Schedule
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {mockCircle.payoutOrder.map((memberAddr, index) => {
                                            const roundNumber = index + 1
                                            const isPastRound = roundNumber < mockCircle.currentRound
                                            const isCurrentRound = roundNumber === mockCircle.currentRound
                                            const member = mockCircle.members.find(m => m.address === memberAddr)

                                            return (
                                                <div
                                                    key={memberAddr}
                                                    className={`flex items-center justify-between p-4 rounded-lg border ${isCurrentRound ? 'border-primary bg-primary/10' :
                                                        isPastRound ? 'border-green-500/30 bg-green-500/5' :
                                                            'border-border/50 glass-morphism'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCurrentRound ? 'bg-primary text-primary-foreground' :
                                                            isPastRound ? 'bg-green-500 text-white' :
                                                                'bg-muted text-muted-foreground'
                                                            }`}>
                                                            {roundNumber}
                                                        </div>
                                                        <div>
                                                            <p className="font-mono text-foreground">{formatAddress(memberAddr)}</p>
                                                            <p className="text-muted-foreground text-sm">
                                                                {isCurrentRound ? 'Current recipient' :
                                                                    isPastRound ? 'Completed' :
                                                                        'Upcoming'}
                                                            </p>
                                                        </div>
                                                        {memberAddr === address && <Badge variant="outline" className="text-xs">You</Badge>}
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-medium">
                                                            {mockCircle.members.length * parseFloat(mockCircle.contributionAmount)} {selectedToken.symbol}
                                                        </p>
                                                        <p className="text-muted-foreground text-sm">
                                                            Round {roundNumber}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="history">
                            <Card className="glass-morphism border-accent/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-accent" />
                                        Round History
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {mockCircle.roundHistory.length > 0 ? (
                                        <div className="space-y-4">
                                            {mockCircle.roundHistory.map((round) => (
                                                <div key={round.round} className="flex items-center justify-between p-4 glass-morphism rounded-lg border border-accent/10">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">
                                                            {round.round}
                                                        </div>
                                                        <div>
                                                            <p className="font-mono text-foreground">{formatAddress(round.winner)}</p>
                                                            <p className="text-muted-foreground text-sm">
                                                                {round.participantCount} participants • {round.defaults} defaults
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-bold text-green-400">{round.amount} {selectedToken.symbol}</p>
                                                        <p className="text-muted-foreground text-sm">
                                                            {new Date(round.timestamp * 1000).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                            <p className="text-muted-foreground">No completed rounds yet</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}