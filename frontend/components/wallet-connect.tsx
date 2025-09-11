'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { abbreviateHash } from '@/lib/utils';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ChevronDown, LogOut, User, Wallet } from 'lucide-react';
import Link from 'next/link';
import { useAccount, useDisconnect, useBalance } from 'wagmi';
import { somniaTestnet } from "viem/chains";

interface WalletConnectProps {
    isMobile?: boolean;
    onDisconnect?: () => void;
}

export const WalletConnect = ({ isMobile = false, onDisconnect }: WalletConnectProps) => {
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const { data: balance } = useBalance({ address });

    const isSomniaNetwork = somniaTestnet.id;

    const formatBalance = (balance: any) => {
        if (!balance) return '0.000';
        return parseFloat(balance.formatted).toFixed(3);
    };

    const handleDisconnect = () => {
        disconnect();
        onDisconnect?.();
    };

    // Mobile version
    if (isMobile) {
        return (
            <ConnectButton.Custom>
                {({ openConnectModal, account }) =>
                    account && address && isConnected ? (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 p-2 glass-morphism rounded-lg">
                                <Avatar className="w-8 h-8">
                                    <AvatarFallback className="text-xs bg-primary/20 text-primary">
                                        {address.slice(2, 4).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-foreground font-medium">{abbreviateHash(address)}</p>
                                    <p className="text-muted-foreground text-sm">{formatBalance(balance)} ETH</p>
                                </div>
                            </div>
                            <Button
                                onClick={handleDisconnect}
                                variant="outline"
                                className="w-full glass-morphism border-red-500/30 text-red-500 bg-transparent"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Disconnect
                            </Button>
                        </div>
                    ) : (
                        <Button
                            onClick={openConnectModal}
                            className="flex items-center gap-2 glass-morphism border-primary/30 text-primary hover:text-primary-foreground bg-transparent w-full"
                            variant="outline"
                        >
                            <Wallet className="w-4 h-4" />
                            Connect Wallet
                        </Button>
                    )
                }
            </ConnectButton.Custom>
        );
    }

    // Desktop version
    return (
        <ConnectButton.Custom>
            {({ openConnectModal, account }) =>
                account && address && isConnected ? (
                    <div className="flex items-center gap-3">
                        {/* Network Status */}
                        <Badge className={isSomniaNetwork ? "bg-primary/20 text-primary text-sm" : "bg-yellow-500/20 text-yellow-500"}>
                            {isSomniaNetwork ? "Shape Sepolia" : "Wrong Network"}
                        </Badge>

                        {/* Wallet Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="flex h-14 items-start gap-3 glass-morphism border-primary/30 text-foreground hover:bg-primary/10 bg-transparent"
                                >
                                    <Avatar className="w-6 h-6">
                                        <AvatarImage src="https://github.com/shadcn.png" alt="user" />
                                        <AvatarFallback className="text-xs bg-primary/20 text-primary">
                                            {address.slice(2, 4).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col items-center">
                                        <span className="text-sm text-white font-medium">{abbreviateHash(address)}</span>
                                        <span className="text-xs text-muted-foreground">{formatBalance(balance)} ETH</span>
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-white" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="glass-morphism border-primary/20 w-56">
                                <DropdownMenuItem asChild>
                                    <Link href="/profile" className="flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-primary/20" />
                                <DropdownMenuItem onClick={handleDisconnect} className="flex items-center gap-2 text-red-500">
                                    <LogOut className="w-4 h-4" />
                                    Disconnect
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ) : (
                    <Button
                        onClick={openConnectModal}
                        className="flex items-center gap-2 glass-morphism border-primary/30 text-primary hover:bg-primary/10 bg-transparent"
                        variant="outline"
                    >
                        <Wallet className="w-4 h-4" />
                        Connect Wallet
                    </Button>
                )
            }
        </ConnectButton.Custom>
    );
};