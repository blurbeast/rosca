"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Clock, Users, TrendingUp, Star, Eye, Heart } from "lucide-react"
import Link from "next/link"

// Mock auction data
const mockAuctions = [
    {
        id: 1,
        title: "Cosmic Warrior #001",
        image: "/futuristic-cyberpunk-warrior-neon.png",
        currentBid: "2.5",
        timeRemaining: "2h 34m",
        participants: 12,
        creator: "CryptoArtist",
        category: "featured",
        views: 234,
        likes: 45,
    },
    {
        id: 2,
        title: "Digital Dreams",
        image: "/abstract-digital-colorful.png",
        currentBid: "1.8",
        timeRemaining: "5h 12m",
        participants: 8,
        creator: "PixelMaster",
        category: "popular",
        views: 189,
        likes: 32,
    },
    {
        id: 3,
        title: "Neon City Nights",
        image: "/cyberpunk-city-neon.png",
        currentBid: "3.2",
        timeRemaining: "1h 45m",
        participants: 15,
        creator: "NeonArt",
        category: "ending-soon",
        views: 456,
        likes: 78,
    },
    {
        id: 4,
        title: "Ethereal Forest",
        image: "/mystical-forest-glowing-ethereal.png",
        currentBid: "0.9",
        timeRemaining: "12h 30m",
        participants: 5,
        creator: "NatureMage",
        category: "new",
        views: 123,
        likes: 21,
    },
    {
        id: 5,
        title: "Quantum Geometry",
        image: "/geometric-abstract-quantum-patterns.png",
        currentBid: "4.1",
        timeRemaining: "3h 20m",
        participants: 20,
        creator: "GeometryGuru",
        category: "featured",
        views: 567,
        likes: 89,
    },
    {
        id: 6,
        title: "Holographic Portrait",
        image: "/holographic-portrait-futuristic.png",
        currentBid: "1.5",
        timeRemaining: "8h 15m",
        participants: 7,
        creator: "HoloArtist",
        category: "popular",
        views: 298,
        likes: 54,
    },
]

export default function AuctionsPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [sortBy, setSortBy] = useState("ending-soon")
    const [priceRange, setPriceRange] = useState("all")

    const categories = [
        { value: "all", label: "All Auctions", count: mockAuctions.length },
        { value: "featured", label: "Featured", count: 2 },
        { value: "ending-soon", label: "Ending Soon", count: 1 },
        { value: "popular", label: "Most Popular", count: 2 },
        { value: "new", label: "New Listings", count: 1 },
    ]

    const filteredAuctions = mockAuctions.filter((auction) => {
        const matchesSearch =
            auction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            auction.creator.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === "all" || auction.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    return (
        <div className="min-h-screen bg-background">

            <div className="container mx-auto px-4 py-8 mt-16">
                <div className="max-w-7xl mx-auto">
                    {/* Page Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent mb-4">
                            Auction Hub
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Discover and bid on unique NFTs in our revolutionary no-loss auction system. Every participant wins
                            something!
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <div className="flex flex-col lg:flex-row gap-4 mb-8">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                <Input
                                    placeholder="Search NFTs, collections, or creators..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 glass-morphism border-primary/20 focus:border-primary"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-48 glass-morphism border-primary/20">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent className="glass-morphism border-primary/20">
                                    <SelectItem value="ending-soon">Ending Soon</SelectItem>
                                    <SelectItem value="highest-bid">Highest Bid</SelectItem>
                                    <SelectItem value="most-popular">Most Popular</SelectItem>
                                    <SelectItem value="newest">Newest</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={priceRange} onValueChange={setPriceRange}>
                                <SelectTrigger className="w-48 glass-morphism border-primary/20">
                                    <SelectValue placeholder="Price Range" />
                                </SelectTrigger>
                                <SelectContent className="glass-morphism border-primary/20">
                                    <SelectItem value="all">All Prices</SelectItem>
                                    <SelectItem value="0-1">0 - 1 ETH</SelectItem>
                                    <SelectItem value="1-5">1 - 5 ETH</SelectItem>
                                    <SelectItem value="5+">5+ ETH</SelectItem>
                                </SelectContent>
                            </Select>

                            <Button variant="outline" className="glass-morphism border-primary/30 bg-transparent">
                                <Filter className="w-4 h-4 mr-2" />
                                Filters
                            </Button>
                        </div>
                    </div>

                    {/* Category Tabs */}
                    <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
                        <div className="w-full flex justify-between items-center">
                            <TabsList className="glass-morphism border border-primary/20 p-1">
                                {categories.map((category) => (
                                    <TabsTrigger
                                        key={category.value}
                                        value={category.value}
                                        className="flex items-center gap-2 data-[state=active]:bg-primary/20"
                                    >
                                        {category.label}
                                        <Badge variant="secondary" className="text-xs">
                                            {category.count}
                                        </Badge>
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            <Link href="/auctions/create">
                                <Button
                                    size="sm"
                                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90 neon-glow"
                                >
                                    Create Auction
                                </Button>
                            </Link>
                        </div>

                        <TabsContent value={selectedCategory} className="mt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredAuctions.map((auction) => (
                                    <Link key={auction.id} href={`/auctions/${auction.id}`}>
                                        <Card className="glass-morphism border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 group cursor-pointer">
                                            <CardHeader className="p-0">
                                                <div className="relative overflow-hidden rounded-t-lg">
                                                    <img
                                                        src={auction.image || "/placeholder.svg"}
                                                        alt={auction.title}
                                                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                    <div className="absolute top-3 right-3 flex gap-2">
                                                        <Badge className="bg-primary/90 text-primary-foreground">
                                                            <Clock className="w-3 h-3 mr-1" />
                                                            {auction.timeRemaining}
                                                        </Badge>
                                                    </div>
                                                    <div className="absolute bottom-3 left-3 flex gap-2">
                                                        <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                                                            <Eye className="w-3 h-3 text-white" />
                                                            <span className="text-white text-xs">{auction.views}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                                                            <Heart className="w-3 h-3 text-white" />
                                                            <span className="text-white text-xs">{auction.likes}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="p-4">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div>
                                                        <h3 className="font-semibold text-foreground text-lg mb-1">{auction.title}</h3>
                                                        <div className="flex items-center gap-2">
                                                            <Avatar className="w-5 h-5">
                                                                <AvatarImage src="/placeholder.svg?height=20&width=20" />
                                                                <AvatarFallback className="text-xs">{auction.creator[0]}</AvatarFallback>
                                                            </Avatar>
                                                            <span className="text-muted-foreground text-sm">{auction.creator}</span>
                                                        </div>
                                                    </div>
                                                    {auction.category === "featured" && <Star className="w-5 h-5 text-yellow-500 fill-current" />}
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-muted-foreground text-sm">Current Bid</p>
                                                        <p className="text-primary font-bold text-xl">{auction.currentBid} ETH</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-1">
                                                            <Users className="w-4 h-4" />
                                                            <span>{auction.participants} bidders</span>
                                                        </div>
                                                        <Button
                                                            size="sm"
                                                            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 neon-glow"
                                                        >
                                                            Place Bid
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>

                    {/* Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
                        <Card className="glass-morphism border-primary/20 text-center">
                            <CardContent className="p-6">
                                <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                                <div className="text-2xl font-bold text-foreground">1,247</div>
                                <div className="text-muted-foreground text-sm">Active Auctions</div>
                            </CardContent>
                        </Card>
                        <Card className="glass-morphism border-secondary/20 text-center">
                            <CardContent className="p-6">
                                <Users className="w-8 h-8 text-secondary mx-auto mb-2" />
                                <div className="text-2xl font-bold text-foreground">15.2K</div>
                                <div className="text-muted-foreground text-sm">Total Bidders</div>
                            </CardContent>
                        </Card>
                        <Card className="glass-morphism border-accent/20 text-center">
                            <CardContent className="p-6">
                                <Star className="w-8 h-8 text-accent mx-auto mb-2" />
                                <div className="text-2xl font-bold text-foreground">892</div>
                                <div className="text-muted-foreground text-sm">Featured NFTs</div>
                            </CardContent>
                        </Card>
                        <Card className="glass-morphism border-primary/20 text-center">
                            <CardContent className="p-6">
                                <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                                <div className="text-2xl font-bold text-foreground">24.7</div>
                                <div className="text-muted-foreground text-sm">Avg. Auction Time (hrs)</div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
