"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Clock,
  Users,
  DollarSign,
  Calendar,
  Shield,
  AlertTriangle,
  CheckCircle,
  Plus,
  Eye,
  Settings,
  TrendingUp,
  Award
} from "lucide-react"
import Link from "next/link"
import { CircleState, SUPPORTED_TOKENS } from "@/lib/config"

// Mock user circles data - replace with actual wallet/contract reads
const mockMyCircles = [
  {
    id: 1,
    name: "Monthly Savers Group",
    description: "Professional emergency fund and investment savings circle.",
    status: CircleState.Active,
    role: "member",
    joinedDate: "2024-03-01",
    myPosition: 3,
    totalMembers: 10,
    contribution: "100",
    token: "USDC",
    periodDuration: 2592000, // 30 days
    collateralLocked: "200",
    collateralRequired: "200",
    nextPayout: "2024-04-15",
    myTurn: false,
    paymentsCompleted: 8,
    totalPayments: 10,
    totalContributed: "800",
    payoutReceived: "0",
    currentRound: 8,
    successRate: 100,
    missedPayments: 0
  },
  {
    id: 2,
    name: "Tech Workers Circle",
    description: "Equipment and professional development savings for tech workers.",
    status: CircleState.Completed,
    role: "creator",
    joinedDate: "2024-01-15",
    myPosition: 1,
    totalMembers: 8,
    contribution: "100",
    token: "USDC",
    periodDuration: 2592000,
    collateralLocked: "0",
    collateralRequired: "200",
    nextPayout: "Completed",
    myTurn: false,
    paymentsCompleted: 8,
    totalPayments: 8,
    totalContributed: "800",
    payoutReceived: "800",
    currentRound: 8,
    successRate: 100,
    missedPayments: 0
  },
  {
    id: 3,
    name: "Weekly Builders Circle",
    description: "Fast-paced weekly savings for quick financial goals.",
    status: CircleState.Active,
    role: "member",
    joinedDate: "2024-03-20",
    myPosition: 5,
    totalMembers: 8,
    contribution: "50",
    token: "USDC",
    periodDuration: 604800, // 7 days
    collateralLocked: "150",
    collateralRequired: "150",
    nextPayout: "2024-04-10",
    myTurn: true,
    paymentsCompleted: 4,
    totalPayments: 8,
    totalContributed: "200",
    payoutReceived: "0",
    currentRound: 5,
    successRate: 100,
    missedPayments: 0
  },
  {
    id: 4,
    name: "Students Emergency Fund",
    description: "College students pooling resources for unexpected expenses.",
    status: CircleState.Open,
    role: "member",
    joinedDate: "2024-03-25",
    myPosition: 4,
    totalMembers: 9,
    contribution: "25",
    token: "DAI",
    periodDuration: 1209600, // 14 days
    collateralLocked: "25",
    collateralRequired: "25",
    nextPayout: "Not started",
    myTurn: false,
    paymentsCompleted: 0,
    totalPayments: 9,
    totalContributed: "0",
    payoutReceived: "0",
    currentRound: 0,
    successRate: 0,
    missedPayments: 0
  }
]

export default function MyCirclesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredCircles = mockMyCircles.filter((circle) => {
    const matchesSearch =
      circle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      circle.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" ||
      (statusFilter === "active" && circle.status === CircleState.Active) ||
      (statusFilter === "completed" && circle.status === CircleState.Completed) ||
      (statusFilter === "open" && circle.status === CircleState.Open) ||
      (statusFilter === "my-turn" && circle.myTurn)

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: CircleState, myTurn: boolean) => {
    if (myTurn) {
      return <Badge className="bg-yellow-500/20 text-yellow-400 animate-pulse">Your Turn</Badge>
    }

    switch (status) {
      case CircleState.Open:
        return <Badge className="bg-primary/20 text-primary">Waiting to Start</Badge>
      case CircleState.Active:
        return <Badge className="bg-secondary/20 text-secondary">Active</Badge>
      case CircleState.Completed:
        return <Badge className="bg-green-500/20 text-green-400">Completed</Badge>
      case CircleState.Cancelled:
        return <Badge className="bg-red-500/20 text-red-400">Cancelled</Badge>
      default:
        return null
    }
  }

  const getRoleBadge = (role: string) => {
    return role === "creator" ?
      <Badge variant="outline" className="text-accent border-accent/50">Creator</Badge> :
      <Badge variant="secondary" className="text-xs">Member</Badge>
  }

  const getTokenSymbol = (address: string) => {
    const token = Object.values(SUPPORTED_TOKENS).find(t => t.address === address)
    return token?.symbol || "TOKEN"
  }

  const formatPeriod = (seconds: number) => {
    const days = Math.floor(seconds / (24 * 60 * 60))
    if (days === 7) return "Weekly"
    if (days === 14) return "Bi-weekly"
    if (days === 30) return "Monthly"
    if (days === 90) return "Quarterly"
    return `${days} days`
  }

  const getCircleStats = () => {
    const active = mockMyCircles.filter(c => c.status === CircleState.Active).length
    const completed = mockMyCircles.filter(c => c.status === CircleState.Completed).length
    const totalSaved = mockMyCircles.reduce((sum, c) => sum + parseFloat(c.totalContributed), 0)
    const totalReceived = mockMyCircles.reduce((sum, c) => sum + parseFloat(c.payoutReceived), 0)

    return { active, completed, totalSaved, totalReceived }
  }

  const stats = getCircleStats()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent mb-2">
                My Circles
              </h1>
              <p className="text-muted-foreground text-lg">
                Manage your active and completed savings circles.
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="glass-morphism border-primary/30 bg-transparent">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Link href="/create-circle">
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 neon-glow">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Circle
                </Button>
              </Link>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="glass-morphism border-primary/20 text-center">
              <CardContent className="p-6">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{stats.active}</div>
                <div className="text-muted-foreground text-sm">Active Circles</div>
              </CardContent>
            </Card>

            <Card className="glass-morphism border-secondary/20 text-center">
              <CardContent className="p-6">
                <Award className="w-8 h-8 text-secondary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{stats.completed}</div>
                <div className="text-muted-foreground text-sm">Completed</div>
              </CardContent>
            </Card>

            <Card className="glass-morphism border-accent/20 text-center">
              <CardContent className="p-6">
                <DollarSign className="w-8 h-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">${stats.totalSaved.toFixed(0)}</div>
                <div className="text-muted-foreground text-sm">Total Contributed</div>
              </CardContent>
            </Card>

            <Card className="glass-morphism border-green-500/20 text-center">
              <CardContent className="p-6">
                <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">${stats.totalReceived.toFixed(0)}</div>
                <div className="text-muted-foreground text-sm">Total Received</div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search your circles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 glass-morphism border-primary/20 focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <Tabs value={statusFilter} onValueChange={setStatusFilter} className="space-y-6">
            <TabsList className="glass-morphism border border-primary/20 p-1">
              <TabsTrigger value="all" className="flex items-center gap-2">
                All Circles
                <Badge variant="secondary" className="text-xs">{mockMyCircles.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="my-turn" className="flex items-center gap-2">
                My Turn
                <Badge variant="secondary" className="text-xs bg-yellow-500/20 text-yellow-400">
                  {mockMyCircles.filter(c => c.myTurn).length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="active" className="flex items-center gap-2">
                Active
                <Badge variant="secondary" className="text-xs">
                  {mockMyCircles.filter(c => c.status === CircleState.Active).length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-2">
                Completed
                <Badge variant="secondary" className="text-xs">
                  {mockMyCircles.filter(c => c.status === CircleState.Completed).length}
                </Badge>
              </TabsTrigger>
            </TabsList>


            {/* Circles Grid */}
            <TabsContent value={statusFilter}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredCircles.map((circle) => (
                  <Card key={circle.id} className="glass-morphism border-primary/20 hover:border-primary/40 transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{circle.name}</CardTitle>
                          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                            {circle.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        {getRoleBadge(circle.role)}
                        {getStatusBadge(circle.status, circle.myTurn)}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-muted-foreground text-sm">Circle Progress</span>
                          <span className="text-foreground font-medium text-sm">
                            Round {circle.currentRound} of {circle.totalPayments}
                          </span>
                        </div>
                        <Progress
                          value={(circle.paymentsCompleted / circle.totalPayments) * 100}
                          className="h-2"
                        />
                      </div>

                      {/* Financial Details */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">My Position</p>
                          <p className="font-semibold">{circle.myPosition} of {circle.totalMembers}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Contribution</p>
                          <p className="font-semibold text-primary">
                            {circle.contribution} {getTokenSymbol(circle.token)}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Period</p>
                          <p className="font-semibold">{formatPeriod(circle.periodDuration)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Next Action</p>
                          <p className="font-semibold">
                            {circle.status === CircleState.Open ? "Waiting" :
                              circle.myTurn ? "Pay Now" :
                                circle.status === CircleState.Completed ? "Complete" :
                                  "Wait"}
                          </p>
                        </div>
                      </div>

                      {/* Collateral Status */}
                      <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-primary" />
                          <span className="text-sm">Collateral</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {circle.collateralLocked} / {circle.collateralRequired} {getTokenSymbol(circle.token)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {circle.status === CircleState.Completed ? "Released" : "Locked"}
                          </div>
                        </div>
                      </div>

                      {/* Performance Stats */}
                      <div className="grid grid-cols-3 gap-3 text-center text-sm">
                        <div>
                          <div className="text-primary font-bold">${circle.totalContributed}</div>
                          <div className="text-muted-foreground text-xs">Contributed</div>
                        </div>
                        <div>
                          <div className="text-secondary font-bold">${circle.payoutReceived}</div>
                          <div className="text-muted-foreground text-xs">Received</div>
                        </div>
                        <div>
                          <div className="text-green-400 font-bold">{circle.successRate}%</div>
                          <div className="text-muted-foreground text-xs">Success</div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Link href={`/circles/${circle.id}`} className="flex-1">
                          <Button
                            variant={circle.myTurn ? "default" : "outline"}
                            className={`w-full ${circle.myTurn ? "neon-glow" : ""}`}
                          >
                            {circle.myTurn ? (
                              <>
                                <DollarSign className="w-4 h-4 mr-2" />
                                Make Payment
                              </>
                            ) : (
                              <>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </>
                            )}
                          </Button>
                        </Link>

                        {circle.role === "creator" && (
                          <Button variant="outline" size="icon" className="glass-morphism bg-transparent">
                            <Settings className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredCircles.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No circles found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery || statusFilter !== "all"
                      ? "Try adjusting your search or filters"
                      : "You haven't joined any circles yet"}
                  </p>
                  <Link href="/circles">
                    <Button>
                      <Search className="w-4 h-4 mr-2" />
                      Browse Circles
                    </Button>
                  </Link>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div >
  )
}