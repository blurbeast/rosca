"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Users, Heart, Share2, Eye, Twitter, MessageCircle, Zap } from "lucide-react"
import Link from "next/link"

// Mock auction data
const mockAuction = {
    id: 1,
    title: "Cosmic Warrior #001",
    image: "/futuristic-cyberpunk-warrior-neon.png",
    currentBid: "2.5",
    timeRemaining: "2h 34m",
    participants: 12,
    creator: {
        name: "CryptoArtist",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
    },
    collection: "Cosmic Warriors",
    description:
        "A fierce warrior from the digital cosmos, wielding neon energy and cybernetic enhancements. This unique piece represents the fusion of ancient warrior spirit with futuristic technology.",
    attributes: [
        { trait: "Background", value: "Neon City", rarity: "15%" },
        { trait: "Armor", value: "Cyber Enhanced", rarity: "8%" },
        { trait: "Weapon", value: "Energy Blade", rarity: "12%" },
        { trait: "Eyes", value: "Glowing Blue", rarity: "25%" },
    ],
    bidHistory: [
        { bidder: "0x1234...5678", amount: "2.5", time: "2 minutes ago" },
        { bidder: "0x9876...5432", amount: "2.3", time: "15 minutes ago" },
        { bidder: "0x4567...8901", amount: "2.0", time: "1 hour ago" },
        { bidder: "0x2345...6789", amount: "1.8", time: "2 hours ago" },
    ],
    views: 234,
    likes: 45,
}

const relatedNFTs = [
    {
        id: 2,
        title: "Cosmic Warrior #002",
        image: "/abstract-digital-colorful.png",
        currentBid: "1.8",
        timeRemaining: "5h 12m",
    },
    {
        id: 3,
        title: "Cosmic Warrior #003",
        image: "/cyberpunk-city-neon.png",
        currentBid: "3.2",
        timeRemaining: "1h 45m",
    },
]

export default function AuctionDetailPage({ params }: { params: { id: string } }) {
    const [bidAmount, setBidAmount] = useState("")
    const [isLiked, setIsLiked] = useState(false)

    const minBid = (Number.parseFloat(mockAuction.currentBid) + 0.1).toFixed(1)

    return (
        <div className="min-h-screen bg-background">

            <div className="container mx-auto px-4 py-8 mt-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8 mb-8">
                        {/* NFT Display */}
                        <div className="space-y-4">
                            <Card className="glass-morphism border-primary/20 overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="relative group">
                                        <img
                                            src={mockAuction.image || "/placeholder.svg"}
                                            alt={mockAuction.title}
                                            className="w-full aspect-square object-cover cursor-zoom-in transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute top-4 right-4 flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="glass-morphism bg-black/50 border-white/20 text-white hover:bg-black/70"
                                                onClick={() => setIsLiked(!isLiked)}
                                            >
                                                <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="glass-morphism bg-black/50 border-white/20 text-white hover:bg-black/70"
                                            >
                                                <Share2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                        <div className="absolute bottom-4 left-4 flex gap-2">
                                            <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                                                <Eye className="w-4 h-4 text-white" />
                                                <span className="text-white text-sm">{mockAuction.views}</span>
                                            </div>
                                            <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                                                <Heart className="w-4 h-4 text-white" />
                                                <span className="text-white text-sm">{mockAuction.likes}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Social Sharing */}
                            <div className="flex gap-2">
                                <Button variant="outline" className="flex-1 glass-morphism border-primary/30 bg-transparent">
                                    <Twitter className="w-4 h-4 mr-2" />
                                    Share on Twitter
                                </Button>
                                <Button variant="outline" className="flex-1 glass-morphism border-secondary/30 bg-transparent">
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    Share on Discord
                                </Button>
                            </div>
                        </div>

                        {/* Auction Info */}
                        <div className="space-y-6">
                            {/* Basic Info */}
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge className="bg-primary/20 text-primary border-primary/30">
                                        <Clock className="w-3 h-3 mr-1" />
                                        {mockAuction.timeRemaining} left
                                    </Badge>
                                    <Badge variant="outline" className="border-secondary/30 text-secondary">
                                        <Users className="w-3 h-3 mr-1" />
                                        {mockAuction.participants} bidders
                                    </Badge>
                                </div>
                                <h1 className="text-3xl font-bold text-foreground mb-2">{mockAuction.title}</h1>
                                <div className="flex items-center gap-3 mb-4">
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage src={mockAuction.creator.avatar || "/placeholder.svg"} />
                                        <AvatarFallback>{mockAuction.creator.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-foreground font-medium">{mockAuction.creator.name}</p>
                                        <p className="text-muted-foreground text-sm">Creator</p>
                                    </div>
                                    {mockAuction.creator.verified && <Badge className="bg-primary/20 text-primary">Verified</Badge>}
                                </div>
                                <p className="text-muted-foreground leading-relaxed">{mockAuction.description}</p>
                            </div>

                            {/* Current Bid */}
                            <Card className="glass-morphism border-primary/20">
                                <CardContent className="p-6">
                                    <div className="text-center mb-4">
                                        <p className="text-muted-foreground text-sm mb-1">Current Bid</p>
                                        <p className="text-4xl font-bold text-primary">{mockAuction.currentBid} ETH</p>
                                        <p className="text-muted-foreground text-sm">≈ $4,250 USD</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-foreground mb-2 block">
                                                Your Bid (minimum {minBid} ETH)
                                            </label>
                                            <Input
                                                type="number"
                                                placeholder={minBid}
                                                value={bidAmount}
                                                onChange={(e) => setBidAmount(e.target.value)}
                                                className="glass-morphism border-primary/20 focus:border-primary"
                                            />
                                        </div>
                                        <Button
                                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 neon-glow"
                                            disabled={!bidAmount || Number.parseFloat(bidAmount) < Number.parseFloat(minBid)}
                                        >
                                            <Zap className="w-4 h-4 mr-2" />
                                            Place Bid
                                        </Button>
                                        <p className="text-xs text-muted-foreground text-center">
                                            No-loss auction: All participants receive rewards!
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Details Tabs */}
                    <Tabs defaultValue="details" className="mb-8">
                        <TabsList className="glass-morphism border border-primary/20">
                            <TabsTrigger value="details">Details</TabsTrigger>
                            <TabsTrigger value="bids">Bid History</TabsTrigger>
                            <TabsTrigger value="attributes">Attributes</TabsTrigger>
                        </TabsList>

                        <TabsContent value="details" className="mt-6">
                            <Card className="glass-morphism border-primary/20">
                                <CardContent className="p-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-4">Collection Details</h3>
                                            <div className="space-y-3">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Collection</span>
                                                    <span className="text-foreground">{mockAuction.collection}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Token ID</span>
                                                    <span className="text-foreground">#001</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Blockchain</span>
                                                    <span className="text-foreground">Shape Network</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-4">Auction Details</h3>
                                            <div className="space-y-3">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Starting Bid</span>
                                                    <span className="text-foreground">1.0 ETH</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Reserve Price</span>
                                                    <span className="text-foreground">5.0 ETH</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Auction Type</span>
                                                    <span className="text-foreground">No-Loss</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="bids" className="mt-6">
                            <Card className="glass-morphism border-primary/20">
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        {mockAuction.bidHistory.map((bid, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between p-4 glass-morphism rounded-lg border border-primary/10"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="w-8 h-8">
                                                        <AvatarFallback className="text-xs">{bid.bidder.slice(2, 4)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="text-foreground font-medium">{bid.bidder}</p>
                                                        <p className="text-muted-foreground text-sm">{bid.time}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-primary font-bold">{bid.amount} ETH</p>
                                                    {index === 0 && <Badge className="bg-primary/20 text-primary text-xs">Highest</Badge>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="attributes" className="mt-6">
                            <Card className="glass-morphism border-primary/20">
                                <CardContent className="p-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {mockAuction.attributes.map((attr, index) => (
                                            <div key={index} className="p-4 glass-morphism rounded-lg border border-secondary/20">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="text-muted-foreground text-sm">{attr.trait}</p>
                                                        <p className="text-foreground font-medium">{attr.value}</p>
                                                    </div>
                                                    <Badge variant="outline" className="border-secondary/30 text-secondary">
                                                        {attr.rarity}
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    {/* Related NFTs */}
                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-6">More from this Collection</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedNFTs.map((nft) => (
                                <Link key={nft.id} href={`/auctions/${nft.id}`}>
                                    <Card className="glass-morphism border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 cursor-pointer">
                                        <CardContent className="p-0">
                                            <img
                                                src={nft.image || "/placeholder.svg"}
                                                alt={nft.title}
                                                className="w-full h-48 object-cover rounded-t-lg"
                                            />
                                            <div className="p-4">
                                                <h3 className="font-semibold text-foreground mb-2">{nft.title}</h3>
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="text-muted-foreground text-sm">Current Bid</p>
                                                        <p className="text-primary font-bold">{nft.currentBid} ETH</p>
                                                    </div>
                                                    <Badge className="bg-primary/20 text-primary">
                                                        <Clock className="w-3 h-3 mr-1" />
                                                        {nft.timeRemaining}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
