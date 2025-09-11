"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Search, Clock, Shield, Info, CheckCircle, AlertCircle } from "lucide-react"

// Mock user NFTs
const mockUserNFTs = [
    {
        id: 1,
        title: "Digital Dreams #001",
        image: "/abstract-digital-colorful.png",
        collection: "Digital Dreams",
        owned: true,
    },
    {
        id: 2,
        title: "Cyber Punk #042",
        image: "/cyberpunk-city-neon.png",
        collection: "Cyber Punk",
        owned: true,
    },
    {
        id: 3,
        title: "Mystic Forest #007",
        image: "/mystical-forest-glowing-ethereal.png",
        collection: "Mystic Forest",
        owned: true,
    },
    {
        id: 4,
        title: "Quantum Art #123",
        image: "/geometric-abstract-quantum-patterns.png",
        collection: "Quantum Art",
        owned: true,
    },
]

export default function CreateAuctionPage() {
    const [selectedNFT, setSelectedNFT] = useState<number | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [startingBid, setStartingBid] = useState("")
    const [duration, setDuration] = useState("")
    const [reservePrice, setReservePrice] = useState("")
    const [hasReserve, setHasReserve] = useState(false)
    const [agreedToTerms, setAgreedToTerms] = useState(false)

    const filteredNFTs = mockUserNFTs.filter(
        (nft) =>
            nft.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            nft.collection.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const selectedNFTData = mockUserNFTs.find((nft) => nft.id === selectedNFT)

    const canCreateAuction = selectedNFT && startingBid && duration && agreedToTerms

    return (
        <div className="min-h-screen bg-background">

            <div className="container mx-auto px-4 py-8 mt-16">
                <div className="max-w-6xl mx-auto">
                    {/* Page Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent mb-4">
                            Create Auction
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            List your NFT in our revolutionary no-loss auction system where every participant wins something.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* NFT Selection */}
                        <div className="space-y-6">
                            <Card className="glass-morphism border-primary/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Search className="w-5 h-5 text-primary" />
                                        Select Your NFT
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                        <Input
                                            placeholder="Search your NFTs..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-10 glass-morphism border-primary/20 focus:border-primary"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                                        {filteredNFTs.map((nft) => (
                                            <div
                                                key={nft.id}
                                                className={`relative cursor-pointer rounded-lg border-2 transition-all duration-300 ${selectedNFT === nft.id
                                                    ? "border-primary shadow-lg shadow-primary/20"
                                                    : "border-primary/20 hover:border-primary/40"
                                                    }`}
                                                onClick={() => setSelectedNFT(nft.id)}
                                            >
                                                <img
                                                    src={nft.image || "/placeholder.svg"}
                                                    alt={nft.title}
                                                    className="w-full h-32 object-cover rounded-t-lg"
                                                />
                                                <div className="p-3">
                                                    <h3 className="font-medium text-foreground text-sm truncate">{nft.title}</h3>
                                                    <p className="text-muted-foreground text-xs">{nft.collection}</p>
                                                </div>
                                                {selectedNFT === nft.id && (
                                                    <div className="absolute top-2 right-2">
                                                        <CheckCircle className="w-5 h-5 text-primary fill-current" />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Auction Configuration */}
                            <Card className="glass-morphism border-secondary/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-secondary" />
                                        Auction Settings
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="starting-bid" className="text-foreground font-medium">
                                            Starting Bid (ETH)
                                        </Label>
                                        <Input
                                            id="starting-bid"
                                            type="number"
                                            placeholder="0.1"
                                            value={startingBid}
                                            onChange={(e) => setStartingBid(e.target.value)}
                                            className="glass-morphism border-primary/20 focus:border-primary mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label className="text-foreground font-medium">Auction Duration</Label>
                                        <Select value={duration} onValueChange={setDuration}>
                                            <SelectTrigger className="glass-morphism border-primary/20 focus:border-primary mt-2">
                                                <SelectValue placeholder="Select duration" />
                                            </SelectTrigger>
                                            <SelectContent className="glass-morphism border-primary/20">
                                                <SelectItem value="1h">1 Hour</SelectItem>
                                                <SelectItem value="6h">6 Hours</SelectItem>
                                                <SelectItem value="12h">12 Hours</SelectItem>
                                                <SelectItem value="24h">24 Hours</SelectItem>
                                                <SelectItem value="3d">3 Days</SelectItem>
                                                <SelectItem value="7d">7 Days</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="reserve-price" checked={hasReserve} onCheckedChange={checked => setHasReserve(checked === true)} />
                                        <Label htmlFor="reserve-price" className="text-foreground font-medium">
                                            Set Reserve Price (Optional)
                                        </Label>
                                    </div>

                                    {hasReserve && (
                                        <div>
                                            <Label htmlFor="reserve" className="text-foreground font-medium">
                                                Reserve Price (ETH)
                                            </Label>
                                            <Input
                                                id="reserve"
                                                type="number"
                                                placeholder="5.0"
                                                value={reservePrice}
                                                onChange={(e) => setReservePrice(e.target.value)}
                                                className="glass-morphism border-primary/20 focus:border-primary mt-2"
                                            />
                                            <p className="text-muted-foreground text-sm mt-1">
                                                Auction will only complete if this price is met
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Preview and Terms */}
                        <div className="space-y-6">
                            {/* Auction Preview */}
                            <Card className="glass-morphism border-accent/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-accent" />
                                        Auction Preview
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {selectedNFTData ? (
                                        <div className="space-y-4">
                                            <img
                                                src={selectedNFTData.image || "/placeholder.svg"}
                                                alt={selectedNFTData.title}
                                                className="w-full h-64 object-cover rounded-lg"
                                            />
                                            <div>
                                                <h3 className="text-xl font-bold text-foreground">{selectedNFTData.title}</h3>
                                                <p className="text-muted-foreground">{selectedNFTData.collection}</p>
                                            </div>
                                            <Separator className="bg-primary/20" />
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Starting Bid</span>
                                                    <span className="text-foreground font-medium">{startingBid || "0"} ETH</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Duration</span>
                                                    <span className="text-foreground font-medium">{duration || "Not set"}</span>
                                                </div>
                                                {hasReserve && (
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Reserve Price</span>
                                                        <span className="text-foreground font-medium">{reservePrice || "0"} ETH</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                            <p className="text-muted-foreground">Select an NFT to see preview</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* No-Loss Explanation */}
                            <Card className="glass-morphism border-primary/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Info className="w-5 h-5 text-primary" />
                                        No-Loss Auction System
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-foreground font-medium">Winner Gets the NFT</p>
                                            <p className="text-muted-foreground text-sm">Highest bidder receives the original NFT</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-foreground font-medium">All Participants Win</p>
                                            <p className="text-muted-foreground text-sm">Every bidder receives a tokenbound NFT reward</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-foreground font-medium">Creator Benefits</p>
                                            <p className="text-muted-foreground text-sm">Receive full auction proceeds plus royalties</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Terms and Create */}
                            <Card className="glass-morphism border-secondary/20">
                                <CardContent className="p-6">
                                    <div className="flex items-start space-x-2 mb-4">
                                        <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={checked => setAgreedToTerms(checked === true)} />
                                        <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                                            I agree to the terms and conditions of the no-loss auction system and understand that all
                                            participants will receive rewards regardless of winning status.
                                        </Label>
                                    </div>

                                    <Button
                                        className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 neon-glow"
                                        disabled={!canCreateAuction}
                                    >
                                        Create Auction
                                    </Button>

                                    <p className="text-center text-muted-foreground text-sm mt-3">
                                        Estimated gas fee: <span className="text-primary font-medium">0.005 ETH</span>
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
