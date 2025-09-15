"use client"

import Link from "next/link"
import { ArrowLeft, Trophy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Mock data for milestones
const mockMilestones = [
    { id: 1, name: "7 Day Streak", habit: "Morning Meditation", progress: 100, completed: true, date: "July 5, 2025" },
    {
        id: 2,
        name: "30 Day Streak",
        habit: "Morning Meditation",
        progress: 27,
        completed: false,
        target: "July 28, 2025",
    },
    { id: 3, name: "5 Day Streak", habit: "Read 30 minutes", progress: 100, completed: true, date: "July 3, 2025" },
    { id: 4, name: "Complete 10 times", habit: "Exercise", progress: 40, completed: false, target: "July 20, 2025" },
    {
        id: 5,
        name: "3 Day Streak",
        habit: "Drink 8 glasses of water",
        progress: 100,
        completed: true,
        date: "June 30, 2025",
    },
    {
        id: 6,
        name: "14 Day Streak",
        habit: "Drink 8 glasses of water",
        progress: 50,
        completed: false,
        target: "July 14, 2025",
    },
]

// Upcoming milestones
const upcomingMilestones = mockMilestones.filter((m) => !m.completed)

// Completed milestones
const completedMilestones = mockMilestones.filter((m) => m.completed)

export default function MilestonesPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center">
                    <div className="mr-4 flex">
                        <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
                            <span className="font-bold">HabitTracker</span>
                        </Link>
                    </div>
                    <div className="flex flex-1 items-center">
                        <h1 className="text-lg font-semibold">Milestones</h1>
                    </div>
                </div>
            </header>
            <main className="flex-1">
                <div className="container py-6">
                    <div className="mb-6">
                        <Link href="/dashboard">
                            <Button variant="ghost" className="pl-0">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Dashboard
                            </Button>
                        </Link>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Total Milestones</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{mockMilestones.length}</div>
                                <p className="text-sm text-muted-foreground">Across all your habits</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Completed</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{completedMilestones.length}</div>
                                <p className="text-sm text-muted-foreground">
                                    {Math.round((completedMilestones.length / mockMilestones.length) * 100)}% completion rate
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Upcoming</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{upcomingMilestones.length}</div>
                                <p className="text-sm text-muted-foreground">Milestones in progress</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Tabs defaultValue="upcoming">
                        <TabsList className="mb-4">
                            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                            <TabsTrigger value="completed">Completed</TabsTrigger>
                            <TabsTrigger value="all">All Milestones</TabsTrigger>
                        </TabsList>

                        <TabsContent value="upcoming">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {upcomingMilestones.map((milestone) => (
                                    <Card key={milestone.id}>
                                        <CardHeader className="pb-2">
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-lg">{milestone.name}</CardTitle>
                                                <Trophy className="h-5 w-5 text-muted-foreground" />
                                            </div>
                                            <CardDescription>{milestone.habit}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span>Progress</span>
                                                    <span>{milestone.progress}%</span>
                                                </div>
                                                <Progress value={milestone.progress} className="h-2" />
                                                <div className="text-sm text-muted-foreground">Target completion: {milestone.target}</div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="completed">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {completedMilestones.map((milestone) => (
                                    <Card key={milestone.id}>
                                        <CardHeader className="pb-2">
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-lg">{milestone.name}</CardTitle>
                                                <Trophy className="h-5 w-5 text-yellow-500" />
                                            </div>
                                            <CardDescription>{milestone.habit}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                <Badge className="bg-green-500">Completed</Badge>
                                                <Progress value={100} className="h-2" />
                                                <div className="text-sm text-muted-foreground">Completed on: {milestone.date}</div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="all">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {mockMilestones.map((milestone) => (
                                    <Card key={milestone.id}>
                                        <CardHeader className="pb-2">
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-lg">{milestone.name}</CardTitle>
                                                <Trophy
                                                    className={`h-5 w-5 ${milestone.completed ? "text-yellow-500" : "text-muted-foreground"}`}
                                                />
                                            </div>
                                            <CardDescription>{milestone.habit}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                {milestone.completed ? (
                                                    <Badge className="bg-green-500">Completed</Badge>
                                                ) : (
                                                    <div className="flex justify-between text-sm">
                                                        <span>Progress</span>
                                                        <span>{milestone.progress}%</span>
                                                    </div>
                                                )}
                                                <Progress value={milestone.progress} className="h-2" />
                                                <div className="text-sm text-muted-foreground">
                                                    {milestone.completed
                                                        ? `Completed on: ${milestone.date}`
                                                        : `Target completion: ${milestone.target}`}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    )
}
