"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
    Wallet,
    Calendar,
    TrendingUp,
    Trophy,
    Palette,
    Settings,
    Copy,
    ExternalLink,
    Eye,
    Clock,
    Users,
    Star,
    Edit,
    Bell,
    Shield,
} from "lucide-react"
import Link from "next/link"

// Mock user data
const mockUser = {
    username: "CryptoArtist",
    walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
    avatar: "/placeholder.svg?height=80&width=80",
    joinDate: "March 2024",
    verified: true,
    bio: "Digital artist exploring the intersection of AI and blockchain technology. Creating unique NFTs that push the boundaries of digital art.",
    stats: {
        totalValue: "45.7",
        ownedNFTs: 23,
        createdAuctions: 12,
        successfulAuctions: 8,
        totalBids: 156,
        wonAuctions: 34,
    },
}

const mockOwnedNFTs = [
    {
        id: 1,
        title: "Cosmic Warrior #001",
        image: "/futuristic-cyberpunk-warrior-neon.png",
        collection: "Cosmic Warriors",
        value: "2.5",
        lastSale: "2.3",
    },
    {
        id: 2,
        title: "Digital Dreams #042",
        image: "/abstract-digital-colorful.png",
        collection: "Digital Dreams",
        value: "1.8",
        lastSale: "1.5",
    },
    {
        id: 3,
        title: "Neon City #007",
        image: "/cyberpunk-city-neon.png",
        collection: "Neon City",
        value: "3.2",
        lastSale: "2.8",
    },
]

const mockCreatedAuctions = [
    {
        id: 1,
        title: "Ethereal Forest #001",
        image: "/mystical-forest-glowing-ethereal.png",
        status: "active",
        currentBid: "1.2",
        views: 234,
        bids: 8,
        timeRemaining: "2h 34m",
    },
    {
        id: 2,
        title: "Quantum Geometry #123",
        image: "/geometric-abstract-quantum-patterns.png",
        status: "completed",
        finalBid: "4.1",
        views: 567,
        bids: 20,
        winner: "0x9876...5432",
    },
]

const mockParticipatedAuctions = [
    {
        id: 1,
        title: "Holographic Portrait #001",
        image: "/holographic-portrait-futuristic.png",
        status: "won",
        myBid: "1.5",
        finalBid: "1.5",
        date: "2 days ago",
    },
    {
        id: 2,
        title: "Cyber Punk #042",
        image: "/cyberpunk-city-neon.png",
        status: "lost",
        myBid: "2.8",
        finalBid: "3.2",
        date: "1 week ago",
    },
]

const mockCollections = [
    {
        id: 1,
        name: "Digital Dreams",
        image: "/abstract-digital-colorful.png",
        items: 10,
        floorPrice: "0.8",
        volume: "12.4",
    },
    {
        id: 2,
        name: "Cosmic Warriors",
        image: "/futuristic-cyberpunk-warrior-neon.png",
        items: 5,
        floorPrice: "2.1",
        volume: "18.7",
    },
]

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false)
    const [username, setUsername] = useState(mockUser.username)
    const [bio, setBio] = useState(mockUser.bio)
    const [notifications, setNotifications] = useState({
        auctions: true,
        bids: true,
        sales: false,
        newsletter: true,
    })

    const copyAddress = () => {
        navigator.clipboard.writeText(mockUser.walletAddress)
    }

    return (
        <div className="min-h-screen bg-background">

            <div className="container mx-auto px-4 py-8 mt-16">
                <div className="max-w-7xl mx-auto">
                    {/* Profile Header */}
                    <Card className="glass-morphism border-primary/20 mb-8">
                        <CardContent className="p-8">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex flex-col items-center md:items-start">
                                    <Avatar className="w-20 h-20 mb-4">
                                        <AvatarImage src={mockUser.avatar || "/placeholder.svg"} />
                                        <AvatarFallback className="text-2xl">{mockUser.username[0]}</AvatarFallback>
                                    </Avatar>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="glass-morphism border-primary/30 bg-transparent"
                                        onClick={() => setIsEditing(!isEditing)}
                                    >
                                        <Edit className="w-4 h-4 mr-2" />
                                        {isEditing ? "Save" : "Edit Profile"}
                                    </Button>
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        {isEditing ? (
                                            <Input
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                className="text-2xl font-bold glass-morphism border-primary/20 max-w-xs"
                                            />
                                        ) : (
                                            <h1 className="text-2xl font-bold text-foreground">{username}</h1>
                                        )}
                                        {mockUser.verified && (
                                            <Badge className="bg-primary/20 text-primary">
                                                <Shield className="w-3 h-3 mr-1" />
                                                Verified
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-4 mb-4 text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Wallet className="w-4 h-4" />
                                            <span className="font-mono text-sm">
                                                {mockUser.walletAddress.slice(0, 6)}...{mockUser.walletAddress.slice(-4)}
                                            </span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={copyAddress}
                                                className="h-6 w-6 p-0 hover:bg-primary/10"
                                            >
                                                <Copy className="w-3 h-3" />
                                            </Button>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <span className="text-sm">Joined {mockUser.joinDate}</span>
                                        </div>
                                    </div>

                                    {isEditing ? (
                                        <textarea
                                            value={bio}
                                            onChange={(e) => setBio(e.target.value)}
                                            className="w-full p-3 glass-morphism border border-primary/20 rounded-lg bg-transparent text-foreground resize-none"
                                            rows={3}
                                        />
                                    ) : (
                                        <p className="text-muted-foreground leading-relaxed max-w-2xl">{bio}</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Analytics Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                        <Card className="glass-morphism border-primary/20 text-center">
                            <CardContent className="p-4">
                                <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
                                <div className="text-xl font-bold text-foreground">{mockUser.stats.totalValue}</div>
                                <div className="text-muted-foreground text-xs">Total Value (ETH)</div>
                            </CardContent>
                        </Card>
                        <Card className="glass-morphism border-secondary/20 text-center">
                            <CardContent className="p-4">
                                <Palette className="w-6 h-6 text-secondary mx-auto mb-2" />
                                <div className="text-xl font-bold text-foreground">{mockUser.stats.ownedNFTs}</div>
                                <div className="text-muted-foreground text-xs">Owned NFTs</div>
                            </CardContent>
                        </Card>
                        <Card className="glass-morphism border-accent/20 text-center">
                            <CardContent className="p-4">
                                <Clock className="w-6 h-6 text-accent mx-auto mb-2" />
                                <div className="text-xl font-bold text-foreground">{mockUser.stats.createdAuctions}</div>
                                <div className="text-muted-foreground text-xs">Created Auctions</div>
                            </CardContent>
                        </Card>
                        <Card className="glass-morphism border-primary/20 text-center">
                            <CardContent className="p-4">
                                <Trophy className="w-6 h-6 text-primary mx-auto mb-2" />
                                <div className="text-xl font-bold text-foreground">{mockUser.stats.successfulAuctions}</div>
                                <div className="text-muted-foreground text-xs">Successful Sales</div>
                            </CardContent>
                        </Card>
                        <Card className="glass-morphism border-secondary/20 text-center">
                            <CardContent className="p-4">
                                <Users className="w-6 h-6 text-secondary mx-auto mb-2" />
                                <div className="text-xl font-bold text-foreground">{mockUser.stats.totalBids}</div>
                                <div className="text-muted-foreground text-xs">Total Bids</div>
                            </CardContent>
                        </Card>
                        <Card className="glass-morphism border-accent/20 text-center">
                            <CardContent className="p-4">
                                <Star className="w-6 h-6 text-accent mx-auto mb-2" />
                                <div className="text-xl font-bold text-foreground">{mockUser.stats.wonAuctions}</div>
                                <div className="text-muted-foreground text-xs">Won Auctions</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Portfolio Tabs */}
                    <Tabs defaultValue="owned" className="space-y-6">
                        <TabsList className="glass-morphism border border-primary/20 p-1">
                            <TabsTrigger value="owned">Owned NFTs</TabsTrigger>
                            <TabsTrigger value="created">Created Auctions</TabsTrigger>
                            <TabsTrigger value="participated">Participated</TabsTrigger>
                            <TabsTrigger value="collections">Collections</TabsTrigger>
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                        </TabsList>

                        <TabsContent value="owned">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {mockOwnedNFTs.map((nft) => (
                                    <Card
                                        key={nft.id}
                                        className="glass-morphism border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105"
                                    >
                                        <CardContent className="p-0">
                                            <img
                                                src={nft.image || "/placeholder.svg"}
                                                alt={nft.title}
                                                className="w-full h-48 object-cover rounded-t-lg"
                                            />
                                            <div className="p-4">
                                                <h3 className="font-semibold text-foreground mb-1">{nft.title}</h3>
                                                <p className="text-muted-foreground text-sm mb-3">{nft.collection}</p>
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="text-muted-foreground text-xs">Current Value</p>
                                                        <p className="text-primary font-bold">{nft.value} ETH</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-muted-foreground text-xs">Last Sale</p>
                                                        <p className="text-foreground font-medium">{nft.lastSale} ETH</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="created">
                            <div className="space-y-4">
                                {mockCreatedAuctions.map((auction) => (
                                    <Card key={auction.id} className="glass-morphism border-secondary/20">
                                        <CardContent className="p-6">
                                            <div className="flex gap-4">
                                                <img
                                                    src={auction.image || "/placeholder.svg"}
                                                    alt={auction.title}
                                                    className="w-20 h-20 object-cover rounded-lg"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <h3 className="font-semibold text-foreground">{auction.title}</h3>
                                                            <Badge
                                                                className={`mt-1 ${auction.status === "active"
                                                                    ? "bg-primary/20 text-primary"
                                                                    : "bg-secondary/20 text-secondary"
                                                                    }`}
                                                            >
                                                                {auction.status}
                                                            </Badge>
                                                        </div>
                                                        <Link href={`/auctions/${auction.id}`}>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="glass-morphism border-primary/30 bg-transparent"
                                                            >
                                                                <ExternalLink className="w-4 h-4 mr-2" />
                                                                View
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                        <div>
                                                            <p className="text-muted-foreground">
                                                                {auction.status === "active" ? "Current Bid" : "Final Bid"}
                                                            </p>
                                                            <p className="text-foreground font-medium">
                                                                {auction.status === "active" ? auction.currentBid : auction.finalBid} ETH
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Eye className="w-4 h-4 text-muted-foreground" />
                                                            <span className="text-foreground">{auction.views}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Users className="w-4 h-4 text-muted-foreground" />
                                                            <span className="text-foreground">{auction.bids} bids</span>
                                                        </div>
                                                        {auction.status === "active" && (
                                                            <div className="flex items-center gap-1">
                                                                <Clock className="w-4 h-4 text-muted-foreground" />
                                                                <span className="text-foreground">{auction.timeRemaining}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="participated">
                            <div className="space-y-4">
                                {mockParticipatedAuctions.map((auction) => (
                                    <Card key={auction.id} className="glass-morphism border-accent/20">
                                        <CardContent className="p-6">
                                            <div className="flex gap-4">
                                                <img
                                                    src={auction.image || "/placeholder.svg"}
                                                    alt={auction.title}
                                                    className="w-20 h-20 object-cover rounded-lg"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <h3 className="font-semibold text-foreground">{auction.title}</h3>
                                                            <Badge
                                                                className={`mt-1 ${auction.status === "won"
                                                                    ? "bg-primary/20 text-primary"
                                                                    : "bg-muted/20 text-muted-foreground"
                                                                    }`}
                                                            >
                                                                {auction.status}
                                                            </Badge>
                                                        </div>
                                                        <span className="text-muted-foreground text-sm">{auction.date}</span>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                                        <div>
                                                            <p className="text-muted-foreground">My Bid</p>
                                                            <p className="text-foreground font-medium">{auction.myBid} ETH</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-muted-foreground">Final Bid</p>
                                                            <p className="text-foreground font-medium">{auction.finalBid} ETH</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="collections">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {mockCollections.map((collection) => (
                                    <Card
                                        key={collection.id}
                                        className="glass-morphism border-primary/20 hover:border-primary/40 transition-all duration-300"
                                    >
                                        <CardContent className="p-6">
                                            <div className="flex gap-4">
                                                <img
                                                    src={collection.image || "/placeholder.svg"}
                                                    alt={collection.name}
                                                    className="w-16 h-16 object-cover rounded-lg"
                                                />
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-foreground mb-2">{collection.name}</h3>
                                                    <div className="grid grid-cols-3 gap-4 text-sm">
                                                        <div>
                                                            <p className="text-muted-foreground">Items</p>
                                                            <p className="text-foreground font-medium">{collection.items}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-muted-foreground">Floor</p>
                                                            <p className="text-foreground font-medium">{collection.floorPrice} ETH</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-muted-foreground">Volume</p>
                                                            <p className="text-foreground font-medium">{collection.volume} ETH</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="settings">
                            <div className="grid md:grid-cols-2 gap-6">
                                <Card className="glass-morphism border-primary/20">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Bell className="w-5 h-5 text-primary" />
                                            Notifications
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label className="text-foreground font-medium">Auction Updates</Label>
                                                <p className="text-muted-foreground text-sm">Get notified about auction activity</p>
                                            </div>
                                            <Switch
                                                checked={notifications.auctions}
                                                onCheckedChange={(checked) => setNotifications({ ...notifications, auctions: checked })}
                                            />
                                        </div>
                                        <Separator className="bg-primary/20" />
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label className="text-foreground font-medium">Bid Notifications</Label>
                                                <p className="text-muted-foreground text-sm">When someone outbids you</p>
                                            </div>
                                            <Switch
                                                checked={notifications.bids}
                                                onCheckedChange={(checked) => setNotifications({ ...notifications, bids: checked })}
                                            />
                                        </div>
                                        <Separator className="bg-primary/20" />
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label className="text-foreground font-medium">Sale Notifications</Label>
                                                <p className="text-muted-foreground text-sm">When your NFTs sell</p>
                                            </div>
                                            <Switch
                                                checked={notifications.sales}
                                                onCheckedChange={(checked) => setNotifications({ ...notifications, sales: checked })}
                                            />
                                        </div>
                                        <Separator className="bg-primary/20" />
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label className="text-foreground font-medium">Newsletter</Label>
                                                <p className="text-muted-foreground text-sm">Weekly platform updates</p>
                                            </div>
                                            <Switch
                                                checked={notifications.newsletter}
                                                onCheckedChange={(checked) => setNotifications({ ...notifications, newsletter: checked })}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="glass-morphism border-secondary/20">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Settings className="w-5 h-5 text-secondary" />
                                            Account Settings
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <Button variant="outline" className="w-full glass-morphism border-primary/30 bg-transparent">
                                            Change Avatar
                                        </Button>
                                        <Button variant="outline" className="w-full glass-morphism border-secondary/30 bg-transparent">
                                            Export Data
                                        </Button>
                                        <Button variant="outline" className="w-full glass-morphism border-accent/30 bg-transparent">
                                            Privacy Settings
                                        </Button>
                                        <Separator className="bg-secondary/20" />
                                        <Button variant="destructive" className="w-full">
                                            Delete Account
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
