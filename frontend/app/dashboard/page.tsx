"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  Users,
  Shield,
  Clock,
  DollarSign,
  Calendar,
  AlertCircle,
  CheckCircle,
  Eye,
  Settings,
  Plus,
  Wallet,
  Trophy,
  Activity
} from "lucide-react"
import Link from "next/link"
import { CircleState, SUPPORTED_TOKENS } from "@/lib/config"

// Mock user data - replace with actual wallet/contract reads
const mockUserData = {
  address: "0x1234567890abcdef1234567890abcdef12345678",
  totalSaved: "2450",
  activeCircles: 3,
  completedCircles: 2,
  successRate: 100,
  reputation: 850,
  totalCollateral: "1200",
  nextPayout: {
    amount: "500",
    date: "2024-04-15",
    circleName: "Monthly Savers Group"
  },
  recentActivity: [
    {
      type: "contribution",
      amount: "100",
      token: "USDC",
      date: "2024-04-01",
      circleName: "Monthly Savers Group",
      status: "completed"
    },
    {
      type: "payout",
      amount: "800",
      token: "USDC",
      date: "2024-03-30",
      circleName: "Tech Workers Circle",
      status: "completed"
    },
    {
      type: "joined",
      amount: "0",
      token: "",
      date: "2024-03-25",
      circleName: "Students Emergency Fund",
      status: "completed"
    },
    {
      type: "contribution_due",
      amount: "50",
      token: "USDC",
      date: "2024-04-10",
      circleName: "Weekly Builders Circle",
      status: "pending"
    }
  ]
}

const mockJoinedCircles = [
  {
    id: 1,
    name: "Monthly Savers Group",
    status: CircleState.Active,
    role: "member",
    myPosition: 3,
    totalMembers: 10,
    contribution: "100",
    token: "USDC",
    nextPayout: "2024-04-15",
    myTurn: false,
    collateralLocked: "200",
    paymentsCompleted: 8,
    totalPayments: 10
  },
  {
    id: 2,
    name: "Tech Workers Circle",
    status: CircleState.Completed,
    role: "creator",
    myPosition: 1,
    totalMembers: 8,
    contribution: "100",
    token: "USDC",
    nextPayout: "Completed",
    myTurn: false,
    collateralLocked: "0",
    paymentsCompleted: 8,
    totalPayments: 8
  },
  {
    id: 3,
    name: "Weekly Builders Circle",
    status: CircleState.Active,
    role: "member",
    myPosition: 5,
    totalMembers: 8,
    contribution: "50",
    token: "USDC",
    nextPayout: "2024-04-10",
    myTurn: true,
    collateralLocked: "150",
    paymentsCompleted: 4,
    totalPayments: 8
  }
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusBadge = (state: CircleState, role: string, myTurn: boolean) => {
    if (myTurn) {
      return <Badge className="bg-yellow-500/20 text-yellow-400 animate-pulse">Your Turn</Badge>
    }

    switch (state) {
      case CircleState.Active:
        return <Badge className="bg-secondary/20 text-secondary">Active</Badge>
      case CircleState.Completed:
        return <Badge className="bg-green-500/20 text-green-400">Completed</Badge>
      case CircleState.Open:
        return <Badge className="bg-primary/20 text-primary">Open</Badge>
      default:
        return null
    }
  }

  const getActivityIcon = (type: string, status: string) => {
    if (status === "pending") {
      return <AlertCircle className="w-4 h-4 text-yellow-400" />
    }

    switch (type) {
      case "contribution":
        return <DollarSign className="w-4 h-4 text-primary" />
      case "payout":
        return <TrendingUp className="w-4 h-4 text-green-400" />
      case "joined":
        return <Users className="w-4 h-4 text-secondary" />
      case "contribution_due":
        return <Clock className="w-4 h-4 text-yellow-400" />
      default:
        return <Activity className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getActivityText = (activity: any) => {
    switch (activity.type) {
      case "contribution":
        return `Contributed ${activity.amount} ${activity.token} to ${activity.circleName}`
      case "payout":
        return `Received payout of ${activity.amount} ${activity.token} from ${activity.circleName}`
      case "joined":
        return `Joined ${activity.circleName}`
      case "contribution_due":
        return `Payment due: ${activity.amount} ${activity.token} for ${activity.circleName}`
      default:
        return "Unknown activity"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent mb-2">
                Dashboard
              </h1>
              <p className="text-muted-foreground text-lg">
                Welcome back! Here's your savings overview and activity.
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

          {/* User Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="glass-morphism border-primary/20">
              <CardContent className="p-6 text-center">
                <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">${mockUserData.totalSaved}</div>
                <div className="text-muted-foreground text-sm">Total Saved</div>
              </CardContent>
            </Card>

            <Card className="glass-morphism border-secondary/20">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-secondary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{mockUserData.activeCircles}</div>
                <div className="text-muted-foreground text-sm">Active Circles</div>
              </CardContent>
            </Card>

            <Card className="glass-morphism border-accent/20">
              <CardContent className="p-6 text-center">
                <Trophy className="w-8 h-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{mockUserData.reputation}</div>
                <div className="text-muted-foreground text-sm">Reputation Score</div>
              </CardContent>
            </Card>

            <Card className="glass-morphism border-primary/20">
              <CardContent className="p-6 text-center">
                <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{mockUserData.successRate}%</div>
                <div className="text-muted-foreground text-sm">Success Rate</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="glass-morphism border border-primary/20 p-1">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="circles">My Circles</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Next Payout Card */}
                <Card className="glass-morphism border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Next Payout
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">${mockUserData.nextPayout.amount}</div>
                      <div className="text-muted-foreground">{mockUserData.nextPayout.date}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        from {mockUserData.nextPayout.circleName}
                      </div>
                    </div>
                    <Button className="w-full">
                      <Eye className="w-4 h-4 mr-2" />
                      View Circle Details
                    </Button>
                  </CardContent>
                </Card>

                {/* Wallet Summary */}
                <Card className="glass-morphism border-secondary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wallet className="w-5 h-5 text-secondary" />
                      Wallet Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Total Collateral</span>
                        <span className="font-semibold">${mockUserData.totalCollateral}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Completed Circles</span>
                        <span className="font-semibold">{mockUserData.completedCircles}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Wallet Address</span>
                        <span className="font-mono text-sm">
                          {mockUserData.address.slice(0, 6)}...{mockUserData.address.slice(-4)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Recent Activity Tab */}
            <TabsContent value="activity" className="space-y-6">
              <Card className="glass-morphism border-primary/20">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockUserData.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-background/50 border border-border/50">
                        {getActivityIcon(activity.type, activity.status)}
                        <div className="flex-1">
                          <p className="text-foreground">{getActivityText(activity)}</p>
                          <p className="text-muted-foreground text-sm">{activity.date}</p>
                        </div>
                        {activity.status === "pending" && (
                          <Badge variant="outline" className="text-yellow-400 border-yellow-400/50">
                            Pending
                          </Badge>
                        )}
                        {activity.status === "completed" && (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* My Circles Tab */}
            <TabsContent value="circles" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {mockJoinedCircles.map((circle) => (
                  <Card key={circle.id} className="glass-morphism border-primary/20">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{circle.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {circle.role === "creator" ? "Creator" : "Member"}
                            </Badge>
                            {getStatusBadge(circle.status, circle.role, circle.myTurn)}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">My Position</p>
                          <p className="font-semibold">{circle.myPosition} of {circle.totalMembers}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Contribution</p>
                          <p className="font-semibold">{circle.contribution} {circle.token}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Collateral</p>
                          <p className="font-semibold">{circle.collateralLocked} {circle.token}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Next Payout</p>
                          <p className="font-semibold">{circle.nextPayout}</p>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-muted-foreground text-sm">Progress</span>
                          <span className="text-foreground font-medium text-sm">
                            {circle.paymentsCompleted}/{circle.totalPayments}
                          </span>
                        </div>
                        <Progress
                          value={(circle.paymentsCompleted / circle.totalPayments) * 100}
                          className="h-2"
                        />
                      </div>

                      <Link href={`/circles/${circle.id}`} className="block mt-4">
                        <Button className="w-full" variant={circle.myTurn ? "default" : "outline"}>
                          {circle.myTurn ? "Make Payment" : "View Details"}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Payments Tab */}
            <TabsContent value="payments" className="space-y-6">
              <Card className="glass-morphism border-primary/20">
                <CardHeader>
                  <CardTitle>Payment Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockJoinedCircles.filter(c => c.status === CircleState.Active).map((circle) => (
                      <div key={circle.id} className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/50">
                        <div>
                          <h4 className="font-semibold">{circle.name}</h4>
                          <p className="text-muted-foreground text-sm">
                            {circle.contribution} {circle.token} due on {circle.nextPayout}
                          </p>
                        </div>
                        <div className="text-right">
                          {circle.myTurn ? (
                            <Badge className="bg-yellow-500/20 text-yellow-400">Due Now</Badge>
                          ) : (
                            <Badge variant="outline">Scheduled</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}