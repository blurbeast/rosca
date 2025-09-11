"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Shield, Eye, Plus, Minus, ExternalLink, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { useAccount } from 'wagmi';

// Mock collection data
const mockCollection = {
    id: 1,
    name: "Cosmic Warriors Genesis",
    banner: "/futuristic-cyberpunk-warrior-neon.png",
    avatar: "/futuristic-cyberpunk-warrior-neon.png",
    creator: {
        name: "CryptoArtist",
        avatar: "/placeholder.svg?height=60&width=60",
        verified: true,
        address: "0x1234567890abcdef1234567890abcdef12345678",
    },
    description:
        "The first generation of AI-powered cosmic warriors, each with unique abilities and traits generated through advanced machine learning algorithms. Every NFT in this collection is tokenbound, meaning it can own other assets and interact with smart contracts independently.",
    longDescription:
        "Cosmic Warriors Genesis represents the pinnacle of AI-generated art combined with cutting-edge blockchain technology. Each warrior is unique, with over 200 possible trait combinations including armor types, weapons, backgrounds, and special abilities. The collection features a revolutionary tokenbound system where each NFT acts as a smart wallet, capable of owning other NFTs, tokens, and interacting with DeFi protocols.",
    mintPrice: "0.08",
    totalSupply: 10000,
    minted: 3247,
    floorPrice: "0.12",
    volume: "847.3",
    status: "live",
    launchDate: "2024-03-15",
    category: "AI Art",
    maxMintPerWallet: 5,
    royalty: "5%",
    blockchain: "Shape Network",
    contractAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
    socials: {
        website: "https://cosmicwarriors.art",
        twitter: "https://twitter.com/cosmicwarriors",
        discord: "https://discord.gg/cosmicwarriors",
    },
    roadmap: [
        {
            phase: "Phase 1",
            title: "Genesis Launch",
            description: "Initial mint of 10,000 unique Cosmic Warriors",
            status: "in-progress",
        },
        {
            phase: "Phase 2",
            title: "Tokenbound Integration",
            description: "Enable tokenbound capabilities for all NFTs",
            status: "upcoming",
        },
        {
            phase: "Phase 3",
            title: "Gaming Integration",
            description: "Launch play-to-earn game featuring Cosmic Warriors",
            status: "upcoming",
        },
        {
            phase: "Phase 4",
            title: "Metaverse Expansion",
            description: "3D avatars and virtual world integration",
            status: "upcoming",
        },
    ],
    previewImages: [
        "/futuristic-cyberpunk-warrior-neon.png",
        "/abstract-digital-colorful.png",
        "/cyberpunk-city-neon.png",
        "/geometric-abstract-quantum-patterns.png",
    ],
}

const mockRecentMints = [
    {
        id: 1,
        tokenId: "#3247",
        image: "/futuristic-cyberpunk-warrior-neon.png",
        minter: "0x9876...5432",
        time: "2 minutes ago",
    },
    {
        id: 2,
        tokenId: "#3246",
        image: "/abstract-digital-colorful.png",
        minter: "0x1234...8901",
        time: "5 minutes ago",
    },
    {
        id: 3,
        tokenId: "#3245",
        image: "/cyberpunk-city-neon.png",
        minter: "0x5678...2345",
        time: "8 minutes ago",
    },
]

const mockActivity = [
    {
        id: 1,
        type: "mint",
        tokenId: "#3247",
        user: "0x9876...5432",
        price: "0.08",
        time: "2 minutes ago",
    },
    {
        id: 2,
        type: "mint",
        tokenId: "#3246",
        user: "0x1234...8901",
        price: "0.08",
        time: "5 minutes ago",
    },
    {
        id: 3,
        type: "mint",
        tokenId: "#3245",
        user: "0x5678...2345",
        price: "0.08",
        time: "8 minutes ago",
    },
]

export default function CollectionDetailPage({ params }: { params: { id: string } }) {
    const { address, isConnected } = useAccount();
    const [mintQuantity, setMintQuantity] = useState(1)
    const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false)
    const [transactionStatus, setTransactionStatus] = useState<"idle" | "pending" | "success" | "error">("idle")
    const [transactionHash, setTransactionHash] = useState<string>()

    const mintProgress = (mockCollection.minted / mockCollection.totalSupply) * 100
    const totalMintCost = (Number.parseFloat(mockCollection.mintPrice) * mintQuantity).toFixed(3)
    const gasEstimate = "0.003"

    const handleMint = async () => {
        if (!isConnected || !address) {
            alert("Please connect your wallet first")
            return
        }

        setIsTransactionModalOpen(true)
        setTransactionStatus("idle")
    }

    const confirmMint = async () => {
        setTransactionStatus("pending")

        // Simulate transaction
        try {
            // Mock transaction hash
            const mockTxHash = "0x" + Math.random().toString(16).substr(2, 64)
            setTransactionHash(mockTxHash)

            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 3000))

            setTransactionStatus("success")
        } catch (error) {
            setTransactionStatus("error")
        }
    }

    const adjustQuantity = (delta: number) => {
        const newQuantity = Math.max(1, Math.min(mockCollection.maxMintPerWallet, mintQuantity + delta))
        setMintQuantity(newQuantity)
    }

    const getPhaseIcon = (status: string) => {
        switch (status) {
            case "completed":
                return <CheckCircle className="w-6 h-6 text-green-500" />
            case "in-progress":
                return <Clock className="w-6 h-6 text-primary" />
            default:
                return <AlertCircle className="w-6 h-6 text-muted-foreground" />
        }
    }

    return (
        <div className="min-h-screen bg-background">

            <div className="container mx-auto px-4 py-8 mt-16">
                <div className="max-w-7xl mx-auto">
                    {/* Collection Banner */}
                    <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
                        <img
                            src={mockCollection.banner || "/placeholder.svg"}
                            alt={mockCollection.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-6 left-6 flex items-end gap-4">
                            <Avatar className="w-16 h-16 border-4 border-white">
                                <AvatarImage src={mockCollection.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-2xl">{mockCollection.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">{mockCollection.name}</h1>
                                <div className="flex items-center gap-2">
                                    <span className="text-white/80">by {mockCollection.creator.name}</span>
                                    {mockCollection.creator.verified && (
                                        <Badge className="bg-primary/20 text-primary">
                                            <Shield className="w-3 h-3 mr-1" />
                                            Verified
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Collection Info */}
                            <Card className="glass-morphism border-primary/20">
                                <CardContent className="p-6">
                                    <p className="text-muted-foreground leading-relaxed mb-6">{mockCollection.description}</p>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-3">Collection Details</h3>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Total Supply</span>
                                                    <span className="text-foreground">{mockCollection.totalSupply.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Blockchain</span>
                                                    <span className="text-foreground">{mockCollection.blockchain}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Royalty</span>
                                                    <span className="text-foreground">{mockCollection.royalty}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Max per Wallet</span>
                                                    <span className="text-foreground">{mockCollection.maxMintPerWallet}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-3">Statistics</h3>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Floor Price</span>
                                                    <span className="text-foreground">{mockCollection.floorPrice} ETH</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Volume</span>
                                                    <span className="text-foreground">{mockCollection.volume} ETH</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Owners</span>
                                                    <span className="text-foreground">2,847</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Listed</span>
                                                    <span className="text-foreground">12.3%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Tabs */}
                            <Tabs defaultValue="about" className="space-y-6">
                                <TabsList className="glass-morphism border border-primary/20">
                                    <TabsTrigger value="about">About</TabsTrigger>
                                    <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
                                    <TabsTrigger value="activity">Activity</TabsTrigger>
                                </TabsList>

                                <TabsContent value="about">
                                    <Card className="glass-morphism border-primary/20">
                                        <CardContent className="p-6">
                                            <h3 className="font-semibold text-foreground mb-4">About This Collection</h3>
                                            <p className="text-muted-foreground leading-relaxed mb-6">{mockCollection.longDescription}</p>

                                            <h4 className="font-semibold text-foreground mb-3">AI Generation Preview</h4>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                {mockCollection.previewImages.map((image, index) => (
                                                    <div key={index} className="relative group">
                                                        <img
                                                            src={image || "/placeholder.svg"}
                                                            alt={`Preview ${index + 1}`}
                                                            className="w-full aspect-square object-cover rounded-lg"
                                                        />
                                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                                            <Eye className="w-6 h-6 text-white" />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="roadmap">
                                    <Card className="glass-morphism border-primary/20">
                                        <CardContent className="p-6">
                                            <h3 className="font-semibold text-foreground mb-6">Project Roadmap</h3>
                                            <div className="space-y-6">
                                                {mockCollection.roadmap.map((phase, index) => (
                                                    <div key={index} className="flex gap-4">
                                                        <div className="flex flex-col items-center">
                                                            <div className="flex-shrink-0">
                                                                {getPhaseIcon(phase.status)}
                                                            </div>
                                                            {index < mockCollection.roadmap.length - 1 && (
                                                                <div className="w-px h-16 bg-border mt-4"></div>
                                                            )}
                                                        </div>
                                                        <div className="flex-1 pb-8">
                                                            <div className="flex items-center gap-3 mb-2">
                                                                <Badge variant="outline" className="text-xs">
                                                                    {phase.phase}
                                                                </Badge>
                                                                <Badge
                                                                    className={
                                                                        phase.status === "completed"
                                                                            ? "bg-green-500/20 text-green-400"
                                                                            : phase.status === "in-progress"
                                                                                ? "bg-primary/20 text-primary"
                                                                                : "bg-muted/20 text-muted-foreground"
                                                                    }
                                                                >
                                                                    {phase.status === "completed" ? "Complete" :
                                                                        phase.status === "in-progress" ? "In Progress" : "Upcoming"}
                                                                </Badge>
                                                            </div>
                                                            <h4 className="font-semibold text-foreground mb-1">{phase.title}</h4>
                                                            <p className="text-muted-foreground text-sm">{phase.description}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="activity">
                                    <Card className="glass-morphism border-primary/20">
                                        <CardContent className="p-6">
                                            <h3 className="font-semibold text-foreground mb-6">Recent Activity</h3>
                                            <div className="space-y-4">
                                                {mockActivity.map((activity) => (
                                                    <div key={activity.id} className="flex items-center justify-between p-4 glass-morphism rounded-lg border border-primary/10">
                                                        <div className="flex items-center gap-3">
                                                            <Badge className="bg-primary/20 text-primary capitalize">
                                                                {activity.type}
                                                            </Badge>
                                                            <span className="font-mono text-foreground">{activity.tokenId}</span>
                                                            <span className="text-muted-foreground">by</span>
                                                            <span className="font-mono text-foreground">{activity.user}</span>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-foreground font-semibold">{activity.price} ETH</div>
                                                            <div className="text-muted-foreground text-sm">{activity.time}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6 ">
                            {/* Mint Card */}
                            <Card className="glass-morphism border-primary/20 z-20 sticky top-6">
                                <CardContent className="p-6">
                                    <div className="text-center mb-6">
                                        <h3 className="text-2xl font-bold text-foreground mb-2">
                                            {mockCollection.mintPrice} ETH
                                        </h3>
                                        <p className="text-muted-foreground">Mint Price</p>
                                    </div>

                                    <div className="mb-6">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-muted-foreground text-sm">Mint Progress</span>
                                            <span className="text-foreground font-medium text-sm">
                                                {mockCollection.minted.toLocaleString()} / {mockCollection.totalSupply.toLocaleString()}
                                            </span>
                                        </div>
                                        <Progress value={mintProgress} className="h-2 mb-2" />
                                        <p className="text-muted-foreground text-xs text-center">
                                            {(100 - mintProgress).toFixed(1)}% remaining
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-muted-foreground text-sm mb-2 block">Quantity</label>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => adjustQuantity(-1)}
                                                    disabled={mintQuantity <= 1}
                                                    className="glass-morphism border-primary/20"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </Button>
                                                <span className="flex-1 text-center font-semibold text-foreground">
                                                    {mintQuantity}
                                                </span>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => adjustQuantity(1)}
                                                    disabled={mintQuantity >= mockCollection.maxMintPerWallet}
                                                    className="glass-morphism border-primary/20"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Total Cost</span>
                                                <span className="text-foreground font-semibold">{totalMintCost} ETH</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Gas (Est.)</span>
                                                <span className="text-foreground">{gasEstimate} ETH</span>
                                            </div>
                                            <hr className="border-border" />
                                            <div className="flex justify-between font-semibold">
                                                <span className="text-foreground">Total</span>
                                                <span className="text-foreground">
                                                    {(Number.parseFloat(totalMintCost) + Number.parseFloat(gasEstimate)).toFixed(3)} ETH
                                                </span>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={handleMint}
                                            className="w-full neon-glow hover:neon-glow"
                                            size="lg"
                                        >
                                            {isConnected ? `Mint ${mintQuantity} NFT${mintQuantity > 1 ? 's' : ''}` : 'Connect Wallet'}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Recent Mints */}
                            <Card className="glass-morphism border-primary/20 ">
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-foreground mb-4">Recent Mints</h3>
                                    <div className="space-y-3">
                                        {mockRecentMints.map((mint) => (
                                            <div key={mint.id} className="flex items-center gap-3">
                                                <img
                                                    src={mint.image || "/placeholder.svg"}
                                                    alt={mint.tokenId}
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                />
                                                <div className="flex-1">
                                                    <p className="font-medium text-foreground text-sm">{mint.tokenId}</p>
                                                    <p className="text-muted-foreground text-xs">{mint.minter}</p>
                                                </div>
                                                <span className="text-muted-foreground text-xs">{mint.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Social Links */}
                            <Card className="glass-morphism border-primary/20">
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-foreground mb-4">Community</h3>
                                    <div className="space-y-3">
                                        <a
                                            href={mockCollection.socials.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            <span>Website</span>
                                        </a>
                                        <a
                                            href={mockCollection.socials.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            <span>Twitter</span>
                                        </a>
                                        <a
                                            href={mockCollection.socials.discord}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            <span>Discord</span>
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transaction Modal */}
            <Dialog open={isTransactionModalOpen} onOpenChange={setIsTransactionModalOpen}>
                <DialogContent className="glass-morphism border-primary/20">
                    <DialogHeader>
                        <DialogTitle>Mint NFT</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        {transactionStatus === "idle" && (
                            <>
                                <p className="text-muted-foreground">
                                    You are about to mint {mintQuantity} NFT{mintQuantity > 1 ? 's' : ''} from {mockCollection.name}.
                                </p>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Quantity</span>
                                        <span>{mintQuantity}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Price per NFT</span>
                                        <span>{mockCollection.mintPrice} ETH</span>
                                    </div>
                                    <div className="flex justify-between font-semibold">
                                        <span>Total</span>
                                        <span>{totalMintCost} ETH</span>
                                    </div>
                                </div>
                                <Button onClick={confirmMint} className="w-full">
                                    Confirm Mint
                                </Button>
                            </>
                        )}
                        {transactionStatus === "pending" && (
                            <div className="text-center py-4">
                                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                                <p className="text-foreground">Transaction pending...</p>
                                <p className="text-muted-foreground text-sm">Please confirm in your wallet</p>
                            </div>
                        )}
                        {transactionStatus === "success" && (
                            <div className="text-center py-4">
                                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                                <p className="text-foreground font-semibold">Successfully minted!</p>
                                <p className="text-muted-foreground text-sm mb-4">Your NFT will appear in your wallet shortly.</p>
                                {transactionHash && (
                                    <p className="text-xs text-muted-foreground break-all">
                                        Tx: {transactionHash}
                                    </p>
                                )}
                            </div>
                        )}
                        {transactionStatus === "error" && (
                            <div className="text-center py-4">
                                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                                <p className="text-foreground font-semibold">Transaction failed</p>
                                <p className="text-muted-foreground text-sm">Please try again later.</p>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}