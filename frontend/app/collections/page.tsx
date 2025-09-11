"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Search, TrendingUp, Users, Clock, Star, Zap } from "lucide-react"
import Link from "next/link"

// Mock collections data
const mockCollections = [
    {
        id: 1,
        name: "Cosmic Warriors Genesis",
        banner: "/futuristic-cyberpunk-warrior-neon.png",
        avatar: "/futuristic-cyberpunk-warrior-neon.png",
        creator: {
            name: "CryptoArtist",
            avatar: "/placeholder.svg?height=40&width=40",
            verified: true,
        },
        description:
            "The first generation of AI-powered cosmic warriors, each with unique abilities and traits generated through advanced machine learning.",
        mintPrice: "0.08",
        totalSupply: 10000,
        minted: 3247,
        floorPrice: "0.12",
        volume: "847.3",
        status: "live",
        launchDate: "2024-03-15",
        category: "AI Art",
        featured: true,
    },
    {
        id: 2,
        name: "Digital Dreams Collection",
        banner: "/abstract-digital-colorful.png",
        avatar: "/abstract-digital-colorful.png",
        creator: {
            name: "PixelMaster",
            avatar: "/placeholder.svg?height=40&width=40",
            verified: false,
        },
        description:
            "Abstract digital art pieces that blur the line between reality and imagination, created using cutting-edge AI algorithms.",
        mintPrice: "0.05",
        totalSupply: 5000,
        minted: 1823,
        floorPrice: "0.07",
        volume: "234.7",
        status: "live",
        launchDate: "2024-03-20",
        category: "Abstract",
        featured: false,
    },
    {
        id: 3,
        name: "Neon Cityscapes",
        banner: "/cyberpunk-city-neon.png",
        avatar: "/cyberpunk-city-neon.png",
        creator: {
            name: "NeonArt",
            avatar: "/placeholder.svg?height=40&width=40",
            verified: true,
        },
        description:
            "Futuristic cityscapes bathed in neon light, showcasing the beauty of cyberpunk aesthetics through AI generation.",
        mintPrice: "0.12",
        totalSupply: 7500,
        minted: 0,
        floorPrice: null,
        volume: "0",
        status: "upcoming",
        launchDate: "2024-04-01",
        category: "Cyberpunk",
        featured: true,
    },
    {
        id: 4,
        name: "Ethereal Forests",
        banner: "/mystical-forest-glowing-ethereal.png",
        avatar: "/mystical-forest-glowing-ethereal.png",
        creator: {
            name: "NatureMage",
            avatar: "/placeholder.svg?height=40&width=40",
            verified: false,
        },
        description:
            "Mystical forest scenes with glowing elements and magical creatures, bringing fantasy to life through AI artistry.",
        mintPrice: "0.06",
        totalSupply: 3000,
        minted: 2847,
        floorPrice: "0.09",
        volume: "156.2",
        status: "sold-out",
        launchDate: "2024-02-28",
        category: "Fantasy",
        featured: false,
    },
]

export default function CollectionsPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [sortBy, setSortBy] = useState("featured")

    const filteredCollections = mockCollections.filter((collection) => {
        const matchesSearch =
            collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            collection.creator.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === "all" || collection.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "live":
                return <Badge className="bg-primary/20 text-primary">Live</Badge>
            case "upcoming":
                return <Badge className="bg-secondary/20 text-secondary">Upcoming</Badge>
            case "sold-out":
                return <Badge className="bg-muted/20 text-muted-foreground">Sold Out</Badge>
            default:
                return null
        }
    }

    const getMintProgress = (minted: number, total: number) => {
        return (minted / total) * 100
    }

    return (
        <div className="min-h-screen bg-background">

            <div className="container mx-auto px-4 py-8 mt-16">
                <div className="max-w-7xl mx-auto">
                    {/* Page Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent mb-4">
                            Collection Launchpad
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Discover and mint from exclusive AI-generated NFT collections. Each collection features unique tokenbound
                            capabilities and community benefits.
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <div className="flex flex-col lg:flex-row gap-4 mb-8">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                <Input
                                    placeholder="Search collections or creators..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 glass-morphism border-primary/20 focus:border-primary"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-48 glass-morphism border-primary/20">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent className="glass-morphism border-primary/20">
                                    <SelectItem value="all">All Collections</SelectItem>
                                    <SelectItem value="live">Live</SelectItem>
                                    <SelectItem value="upcoming">Upcoming</SelectItem>
                                    <SelectItem value="sold-out">Sold Out</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-48 glass-morphism border-primary/20">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent className="glass-morphism border-primary/20">
                                    <SelectItem value="featured">Featured</SelectItem>
                                    <SelectItem value="newest">Newest</SelectItem>
                                    <SelectItem value="volume">Volume</SelectItem>
                                    <SelectItem value="floor-price">Floor Price</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Featured Collections */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                            <Star className="w-6 h-6 text-primary" />
                            Featured Collections
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {filteredCollections
                                .filter((c) => c.featured)
                                .map((collection) => (
                                    <Link key={collection.id} href={`/collections/${collection.id}`}>
                                        <Card className="glass-morphism border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
                                            <div className="relative h-48">
                                                <img
                                                    src={collection.banner || "/placeholder.svg"}
                                                    alt={collection.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute top-4 right-4">{getStatusBadge(collection.status)}</div>
                                                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                                                    <Avatar className="w-8 h-8 border-2 border-white">
                                                        <AvatarImage src={collection.creator.avatar || "/placeholder.svg"} />
                                                        <AvatarFallback>{collection.creator.name[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="text-white font-medium text-sm">{collection.creator.name}</p>
                                                        {collection.creator.verified && (
                                                            <Badge className="bg-primary/20 text-primary text-xs">Verified</Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <CardContent className="p-6">
                                                <h3 className="text-xl font-bold text-foreground mb-2">{collection.name}</h3>
                                                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{collection.description}</p>

                                                <div className="space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-muted-foreground text-sm">Mint Progress</span>
                                                        <span className="text-foreground font-medium text-sm">
                                                            {collection.minted.toLocaleString()} / {collection.totalSupply.toLocaleString()}
                                                        </span>
                                                    </div>
                                                    <Progress
                                                        value={getMintProgress(collection.minted, collection.totalSupply)}
                                                        className="h-2"
                                                    />

                                                    <div className="grid grid-cols-3 gap-4 text-center">
                                                        <div>
                                                            <p className="text-muted-foreground text-xs">Mint Price</p>
                                                            <p className="text-foreground font-bold">{collection.mintPrice} ETH</p>
                                                        </div>
                                                        {collection.floorPrice && (
                                                            <div>
                                                                <p className="text-muted-foreground text-xs">Floor</p>
                                                                <p className="text-foreground font-bold">{collection.floorPrice} ETH</p>
                                                            </div>
                                                        )}
                                                        <div>
                                                            <p className="text-muted-foreground text-xs">Volume</p>
                                                            <p className="text-foreground font-bold">{collection.volume} ETH</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                        </div>
                    </div>

                    {/* All Collections */}
                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-6">All Collections</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCollections.map((collection) => (
                                <Link key={collection.id} href={`/collections/${collection.id}`}>
                                    <Card className="glass-morphism border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 cursor-pointer">
                                        <CardHeader className="p-0">
                                            <div className="relative h-40">
                                                <img
                                                    src={collection.banner || "/placeholder.svg"}
                                                    alt={collection.name}
                                                    className="w-full h-full object-cover rounded-t-lg"
                                                />
                                                <div className="absolute top-3 right-3">{getStatusBadge(collection.status)}</div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Avatar className="w-6 h-6">
                                                    <AvatarImage src={collection.creator.avatar || "/placeholder.svg"} />
                                                    <AvatarFallback className="text-xs">{collection.creator.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <span className="text-muted-foreground text-sm">{collection.creator.name}</span>
                                                {collection.creator.verified && <Badge className="bg-primary/20 text-primary text-xs">✓</Badge>}
                                            </div>

                                            <h3 className="font-bold text-foreground mb-2">{collection.name}</h3>
                                            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{collection.description}</p>

                                            <div className="flex justify-between items-center text-sm">
                                                <div>
                                                    <p className="text-muted-foreground">Mint Price</p>
                                                    <p className="text-primary font-bold">{collection.mintPrice} ETH</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-muted-foreground">Minted</p>
                                                    <p className="text-foreground font-medium">
                                                        {((collection.minted / collection.totalSupply) * 100).toFixed(0)}%
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
                        <Card className="glass-morphism border-primary/20 text-center">
                            <CardContent className="p-6">
                                <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                                <div className="text-2xl font-bold text-foreground">24</div>
                                <div className="text-muted-foreground text-sm">Live Collections</div>
                            </CardContent>
                        </Card>
                        <Card className="glass-morphism border-secondary/20 text-center">
                            <CardContent className="p-6">
                                <Users className="w-8 h-8 text-secondary mx-auto mb-2" />
                                <div className="text-2xl font-bold text-foreground">8.2K</div>
                                <div className="text-muted-foreground text-sm">Total Minters</div>
                            </CardContent>
                        </Card>
                        <Card className="glass-morphism border-accent/20 text-center">
                            <CardContent className="p-6">
                                <Zap className="w-8 h-8 text-accent mx-auto mb-2" />
                                <div className="text-2xl font-bold text-foreground">156K</div>
                                <div className="text-muted-foreground text-sm">NFTs Minted</div>
                            </CardContent>
                        </Card>
                        <Card className="glass-morphism border-primary/20 text-center">
                            <CardContent className="p-6">
                                <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                                <div className="text-2xl font-bold text-foreground">12</div>
                                <div className="text-muted-foreground text-sm">Upcoming Drops</div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
