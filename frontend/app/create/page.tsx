"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, Wand2, ImageIcon, Sparkles, Settings, Eye, X } from "lucide-react"
import { toast } from "sonner"
import { shapeSepolia } from "viem/chains";
import { useAccount } from "wagmi"
import useMintNFT from "@/hooks/useMintNFT"

// Types
interface PinataResponse {
    IpfsHash: string;
    PinSize: number;
    Timestamp: string;
}

interface NFTMetadata {
    name: string;
    description: string;
    image: string;
    attributes: Array<{
        trait_type: string;
        value: string;
    }>;
}

interface FreepikResponse {
    data: Array<{
        base64: string;
        url: string;
    }>;
}

export default function CreateNFTPage() {
    const [activeMode, setActiveMode] = useState<"ai" | "upload">("ai")
    const [aiPrompt, setAiPrompt] = useState("")
    const [selectedStyle, setSelectedStyle] = useState("realistic")
    const [nftName, setNftName] = useState("")
    const [nftDescription, setNftDescription] = useState("")
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [generatedImage, setGeneratedImage] = useState<string>("")
    const [previewImage, setPreviewImage] = useState<string>("")
    const [mintingProgress, setMintingProgress] = useState(0)
    const [isGenerating, setIsGenerating] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [isMinting, setIsMinting] = useState(false)
    const [imageCID, setImageCID] = useState<string>("")
    const [metadataCID, setMetadataCID] = useState<string>("")

    const { isConnected } = useAccount();

    // Trait attributes
    const [traitType, setTraitType] = useState("")
    const [traitValue, setTraitValue] = useState("")
    const [traits, setTraits] = useState<Array<{ trait_type: string, value: string }>>([])

    const promptSuggestions = [
        "A futuristic cityscape with neon lights and flying cars",
        "Abstract geometric patterns in vibrant colors",
        "A mystical forest with glowing mushrooms and ethereal creatures",
        "Cyberpunk warrior in a digital landscape",
        "Minimalist portrait with bold color blocking",
    ]

    const styleOptions = [
        { value: "realistic", label: "Realistic" },
        { value: "abstract", label: "Abstract" },
        { value: "cyberpunk", label: "Cyberpunk" },
        { value: "fantasy", label: "Fantasy" },
        { value: "minimalist", label: "Minimalist" },
    ]

    // Handle file upload
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            // Validate file size (10MB limit)
            if (file.size > 10 * 1024 * 1024) {
                toast.error("File size must be less than 10MB")
                return
            }

            // Validate file type
            if (!file.type.startsWith('image/')) {
                toast.error("Please upload a valid image file")
                return
            }

            setSelectedFile(file)
            const reader = new FileReader()
            reader.onload = (e) => {
                setPreviewImage(e.target?.result as string)
                toast.success(`Image "${file.name}" uploaded successfully`)
            }
            reader.readAsDataURL(file)
        }
    }

    // Generate AI image using alternative services
    const handleGenerateAI = async () => {
        if (!aiPrompt.trim()) {
            toast.error("Please enter a prompt for AI generation")
            return
        }

        setIsGenerating(true)
        setMintingProgress(0)

        toast.loading("Generating your NFT artwork...", { id: "ai-generation" })

        try {
            // Option 1: Use OpenAI DALL-E API
            setMintingProgress(20)

            const response = await fetch("/api/generate-image", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: `${aiPrompt}. Style: ${selectedStyle}. High quality, detailed NFT artwork.`,
                    style: selectedStyle
                })
            })

            setMintingProgress(60)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            if (data.imageUrl) {
                setGeneratedImage(data.imageUrl)
                setPreviewImage(data.imageUrl)
                toast.success("AI artwork generated successfully!", { id: "ai-generation" })
            } else {
                throw new Error("No image URL returned from API")
            }

            setMintingProgress(100)
        } catch (error) {
            console.error("AI Generation Error:", error)
            toast.error("Failed to generate AI image. Using placeholder for demo.", { id: "ai-generation" })
            // Fallback to a random placeholder for demo
            setPreviewImage(`https://picsum.photos/400/400?random=${Date.now()}&grayscale`)
        } finally {
            setIsGenerating(false)
            setTimeout(() => setMintingProgress(0), 1000)
        }
    }

    // Upload image to Pinata
    const uploadToPinata = useCallback(async (file: File | Blob, filename?: string): Promise<string> => {
        const formData = new FormData()
        formData.append("file", file, filename || "nft-image.png")

        const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
            method: "POST",
            headers: {
                pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY || "",
                pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY || "",
            },
            body: formData
        })

        if (!response.ok) {
            throw new Error(`Pinata upload failed: ${response.statusText}`)
        }

        const data: PinataResponse = await response.json()
        return data.IpfsHash
    }, [])

    // Upload metadata to Pinata
    const uploadMetadataToPinata = useCallback(async (metadata: NFTMetadata): Promise<string> => {
        const response = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY || "",
                pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY || "",
            },
            body: JSON.stringify({
                pinataContent: metadata,
                pinataMetadata: {
                    name: `${metadata.name}-metadata.json`
                }
            })
        })

        if (!response.ok) {
            throw new Error(`Metadata upload failed: ${response.statusText}`)
        }

        const data: PinataResponse = await response.json()
        return data.IpfsHash
    }, [])

    // Convert image URL to File
    const urlToFile = async (url: string, filename: string): Promise<File> => {
        const response = await fetch(url)
        const blob = await response.blob()
        return new File([blob], filename, { type: blob.type })
    }

    // Add trait
    const addTrait = () => {
        if (!traitType.trim() || !traitValue.trim()) {
            toast.error("Please enter both trait type and value")
            return
        }

        // Check for duplicate trait types
        if (traits.some(trait => trait.trait_type.toLowerCase() === traitType.trim().toLowerCase())) {
            toast.error("This trait type already exists")
            return
        }

        setTraits(prev => [...prev, { trait_type: traitType.trim(), value: traitValue.trim() }])
        setTraitType("")
        setTraitValue("")
        toast.success("Trait added successfully")
    }

    // Remove trait
    const removeTrait = (index: number) => {
        const removedTrait = traits[index]
        setTraits(prev => prev.filter((_, i) => i !== index))
        toast.success(`Removed trait: ${removedTrait.trait_type}`)
    }

    const { createCollection } = useMintNFT();

    // Main minting function
    const handleMintNFT = async () => {
        if (!nftName.trim() || !nftDescription.trim() || !previewImage) {
            toast.error("Please fill in all required fields and generate/upload an image")
            return
        }

        if (!isConnected) {
            toast.error("Please connect your wallet to mint the NFT")
            return
        }

        if (!shapeSepolia.id) {
            toast.error("Unsupported network. Please switch to Shape Sepolia.")
            return
        }

        setIsMinting(true)
        setMintingProgress(0)

        const toastId = toast.loading("Starting NFT minting process...", {
            description: "This may take a few moments"
        })

        try {
            let imageUrl = ""

            // Step 1: Handle image - upload to IPFS only if it's an uploaded file
            setMintingProgress(20)

            if (selectedFile) {
                // User uploaded file - needs IPFS upload
                toast.loading("Uploading image to IPFS...", {
                    id: toastId,
                    description: "Decentralizing your artwork"
                })

                const imageCid = await uploadToPinata(selectedFile)
                setImageCID(imageCid)
                imageUrl = `${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}/ipfs/${imageCid}`
            } else if (generatedImage) {
                // AI-generated image - use direct URL
                toast.loading("Using AI-generated image...", {
                    id: toastId,
                    description: "Preparing your AI artwork"
                })

                imageUrl = generatedImage
                setImageCID("AI_GENERATED") // Mark as AI-generated
            } else {
                throw new Error("No image available to use")
            }

            // Step 2: Create and upload metadata
            setMintingProgress(40)
            toast.loading("Creating NFT metadata...", {
                id: toastId,
                description: "Preparing your NFT details"
            })

            const metadata: NFTMetadata = {
                name: nftName,
                description: nftDescription,
                image: imageUrl, // Use either IPFS URL or AI image URL
                attributes: traits
            }

            const metadataCid = await uploadMetadataToPinata(metadata)
            setMetadataCID(metadataCid)

            // Step 3: Smart Contract Interaction
            setMintingProgress(60)


            // Create new collection with name and CID
            toast.loading("Creating new collection...", {
                id: toastId,
                description: "Deploying your collection contract"
            })

            await createCollection(nftName, metadataCid)


            setMintingProgress(100)

            // The success/error handling is done in the hook's useEffect
            toast.dismiss(toastId)

        } catch (error) {
            console.error("Minting error:", error)
            toast.error("Failed to mint NFT", {
                id: toastId,
                description: error instanceof Error ? error.message : "Please try again later"
            })
        } finally {
            setIsMinting(false)
            setTimeout(() => setMintingProgress(0), 2000)
        }
    }

    return (
        <div className="min-h-screen bg-background">

            <div className="container mx-auto px-4 py-8 mt-16">
                <div className="max-w-6xl mx-auto">
                    {/* Page Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent mb-4">
                            NFT Creation Studio
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Generate stunning NFTs with AI or upload your own artwork. Create single pieces or entire collections with
                            tokenbound capabilities.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Creation Panel */}
                        <div className="space-y-6">
                            {/* Mode Selection */}
                            <Card className="glass-morphism border-primary/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-primary" />
                                        Creation Mode
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Tabs value={activeMode} onValueChange={(value) => setActiveMode(value as "ai" | "upload")}>
                                        <TabsList className="grid w-full grid-cols-2 glass-morphism">
                                            <TabsTrigger value="ai" className="flex items-center gap-2">
                                                <Wand2 className="w-4 h-4" />
                                                AI Generation
                                            </TabsTrigger>
                                            <TabsTrigger value="upload" className="flex items-center gap-2">
                                                <Upload className="w-4 h-4" />
                                                Upload Image
                                            </TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="ai" className="space-y-4 mt-6">
                                            <div className="space-y-4">
                                                <div>
                                                    <Label htmlFor="prompt" className="text-foreground font-medium">
                                                        AI Prompt
                                                    </Label>
                                                    <Textarea
                                                        id="prompt"
                                                        placeholder="Describe your NFT artwork in detail..."
                                                        value={aiPrompt}
                                                        onChange={(e) => setAiPrompt(e.target.value)}
                                                        className="glass-morphism border-primary/20 focus:border-primary min-h-[100px] mt-2"
                                                    />
                                                </div>

                                                <div>
                                                    <Label className="text-foreground font-medium">Art Style</Label>
                                                    <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                                                        <SelectTrigger className="glass-morphism border-primary/20 focus:border-primary mt-2">
                                                            <SelectValue placeholder="Choose art style" />
                                                        </SelectTrigger>
                                                        <SelectContent className="glass-morphism border-primary/20">
                                                            {styleOptions.map((style) => (
                                                                <SelectItem key={style.value} value={style.value}>
                                                                    {style.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div>
                                                    <Label className="text-foreground font-medium mb-2 block">Quick Suggestions</Label>
                                                    <div className="flex flex-wrap gap-2">
                                                        {promptSuggestions.map((suggestion, index) => (
                                                            <Badge
                                                                key={index}
                                                                variant="outline"
                                                                className="cursor-pointer hover:bg-primary/10 border-primary/30 text-xs"
                                                                onClick={() => setAiPrompt(suggestion)}
                                                            >
                                                                {suggestion.slice(0, 30)}...
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>

                                                <Button
                                                    onClick={handleGenerateAI}
                                                    disabled={!aiPrompt || isGenerating}
                                                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 neon-glow"
                                                >
                                                    {isGenerating ? (
                                                        <>
                                                            <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                                                            Generating...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Wand2 className="w-4 h-4 mr-2" />
                                                            Generate NFT
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="upload" className="space-y-4 mt-6">
                                            <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center glass-morphism hover:border-primary/50 transition-colors">
                                                <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
                                                <h3 className="text-lg font-medium text-foreground mb-2">Upload Your Artwork</h3>
                                                <p className="text-muted-foreground mb-4">Drag and drop your image here, or click to browse</p>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileSelect}
                                                    className="hidden"
                                                    id="file-upload"
                                                />
                                                <Label htmlFor="file-upload">
                                                    <Button variant="outline" className="glass-morphism border-primary/30 bg-transparent" asChild>
                                                        <span className="cursor-pointer">
                                                            <ImageIcon className="w-4 h-4 mr-2" />
                                                            Choose File
                                                        </span>
                                                    </Button>
                                                </Label>
                                                <p className="text-sm text-muted-foreground mt-2">Supports JPG, PNG, GIF up to 10MB</p>
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </CardContent>
                            </Card>

                            {/* NFT Metadata */}
                            <Card className="glass-morphism border-primary/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Settings className="w-5 h-5 text-secondary" />
                                        NFT Metadata
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="name" className="text-foreground font-medium">
                                            NFT Name *
                                        </Label>
                                        <Input
                                            id="name"
                                            placeholder="Enter NFT name"
                                            value={nftName}
                                            onChange={(e) => setNftName(e.target.value)}
                                            className="glass-morphism border-primary/20 focus:border-primary mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="description" className="text-foreground font-medium">
                                            Description *
                                        </Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Describe your NFT..."
                                            value={nftDescription}
                                            onChange={(e) => setNftDescription(e.target.value)}
                                            className="glass-morphism border-primary/20 focus:border-primary mt-2"
                                        />
                                    </div>

                                    {/* Traits */}
                                    <div>
                                        <Label className="text-foreground font-medium">Attributes/Traits</Label>
                                        <div className="grid grid-cols-2 gap-4 mt-2">
                                            <Input
                                                placeholder="Trait type (e.g., Background)"
                                                value={traitType}
                                                onChange={(e) => setTraitType(e.target.value)}
                                                className="glass-morphism border-primary/20 focus:border-primary"
                                            />
                                            <div className="flex gap-2">
                                                <Input
                                                    placeholder="Trait value (e.g., Cosmic)"
                                                    value={traitValue}
                                                    onChange={(e) => setTraitValue(e.target.value)}
                                                    className="glass-morphism border-primary/20 focus:border-primary"
                                                />
                                                <Button
                                                    onClick={addTrait}
                                                    variant="outline"
                                                    className="glass-morphism border-primary/30"
                                                    disabled={!traitType || !traitValue}
                                                >
                                                    Add
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Display added traits */}
                                        {traits.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {traits.map((trait, index) => (
                                                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                                        {trait.trait_type}: {trait.value}
                                                        <X
                                                            className="w-3 h-3 cursor-pointer hover:text-red-500"
                                                            onClick={() => removeTrait(index)}
                                                        />
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Preview Panel */}
                        <div className="space-y-6">
                            {/* Live Preview */}
                            <Card className="glass-morphism border-secondary/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Eye className="w-5 h-5 text-secondary" />
                                        Live Preview
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center border border-primary/20 overflow-hidden">
                                        {isGenerating || isUploading ? (
                                            <div className="text-center">
                                                <Sparkles className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
                                                <p className="text-muted-foreground">
                                                    {isGenerating ? "Generating your NFT..." : "Processing image..."}
                                                </p>
                                                <Progress value={mintingProgress} className="w-48 mx-auto mt-4" />
                                            </div>
                                        ) : previewImage ? (
                                            <div className="w-full h-full relative">
                                                <img
                                                    src={previewImage}
                                                    alt="NFT Preview"
                                                    className="object-cover rounded-lg"
                                                />
                                            </div>
                                        ) : (
                                            <div className="text-center">
                                                <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                                <p className="text-muted-foreground">Your NFT preview will appear here</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Preview metadata */}
                                    {nftName && (
                                        <div className="mt-4 p-4 glass-morphism rounded-lg border border-primary/20">
                                            <h3 className="font-semibold text-foreground mb-2">{nftName}</h3>
                                            {nftDescription && (
                                                <p className="text-muted-foreground text-sm mb-2">{nftDescription}</p>
                                            )}
                                            {traits.length > 0 && (
                                                <div className="flex flex-wrap gap-1">
                                                    {traits.map((trait, index) => (
                                                        <Badge key={index} variant="outline" className="text-xs">
                                                            {trait.trait_type}: {trait.value}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Minting Options */}
                            <Card className="glass-morphism border-accent/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-accent" />
                                        Minting Options
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between p-4 glass-morphism rounded-lg border border-primary/20">
                                        <div>
                                            <h4 className="font-medium text-foreground">Single Mint</h4>
                                            <p className="text-sm text-muted-foreground">Create one unique NFT</p>
                                        </div>
                                    </div>

                                    {isMinting && (
                                        <div className="p-4 glass-morphism rounded-lg border border-primary/20">
                                            <div className="flex justify-between text-sm mb-2">
                                                <span>Progress</span>
                                                <span>{mintingProgress}%</span>
                                            </div>
                                            <Progress value={mintingProgress} className="mb-2" />
                                            <p className="text-xs text-muted-foreground">
                                                {mintingProgress <= 25 ? "Uploading image to IPFS..." :
                                                    mintingProgress <= 50 ? "Creating metadata..." :
                                                        mintingProgress <= 75 ? "Minting NFT..." :
                                                            "Finalizing..."}
                                            </p>
                                        </div>
                                    )}

                                    <Button
                                        onClick={handleMintNFT}
                                        className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 neon-glow"
                                        disabled={!nftName || !nftDescription || !previewImage || isMinting}
                                    >
                                        {isMinting ? (
                                            <>
                                                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                                                Minting NFT...
                                            </>
                                        ) : (
                                            "Launch NFT"
                                        )}
                                    </Button>


                                    {/* Display CIDs after successful upload */}
                                    {imageCID && (
                                        <div className="p-3 glass-morphism rounded-lg border border-green-500/20">
                                            <p className="text-xs text-green-400 mb-1">
                                                {imageCID === "AI_GENERATED" ? "AI-Generated Image:" : "Image uploaded to IPFS:"}
                                            </p>
                                            <p className="text-xs text-muted-foreground font-mono break-all">
                                                {imageCID === "AI_GENERATED" ? "Using direct AI image URL" : imageCID}
                                            </p>
                                        </div>
                                    )}

                                    {metadataCID && (
                                        <div className="p-3 glass-morphism rounded-lg border border-green-500/20">
                                            <p className="text-xs text-green-400 mb-1">Metadata CID:</p>
                                            <p className="text-xs text-muted-foreground font-mono break-all">{metadataCID}</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}