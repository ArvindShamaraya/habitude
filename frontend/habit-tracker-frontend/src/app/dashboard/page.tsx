"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarIcon, ChevronLeft, ChevronRight, PlusCircle, Share2, Trophy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

// Mock data for habits
const mockHabits = [
  { id: 1, name: "Morning Meditation", streak: 8, color: "bg-green-500", completedDays: [1, 2, 3, 5, 8, 9, 10, 11] },
  { id: 2, name: "Read 30 minutes", streak: 5, color: "bg-blue-500", completedDays: [2, 4, 6, 9, 11] },
  { id: 3, name: "Drink 8 glasses of water", streak: 3, color: "bg-purple-500", completedDays: [1, 3, 4, 7, 8, 9, 11] },
  { id: 4, name: "Exercise", streak: 2, color: "bg-orange-500", completedDays: [2, 5, 8, 11] },
]

// Mock data for milestones
const mockMilestones = [
  { id: 1, name: "7 Day Streak", habit: "Morning Meditation", progress: 100, completed: true },
  { id: 2, name: "30 Day Streak", habit: "Morning Meditation", progress: 27, completed: false },
  { id: 3, name: "5 Day Streak", habit: "Read 30 minutes", progress: 100, completed: true },
  { id: 4, name: "Complete 10 times", habit: "Exercise", progress: 40, completed: false },
]

export default function DashboardPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)
  const [showAddHabitDialog, setShowAddHabitDialog] = useState(false)
  const [showDayDialog, setShowDayDialog] = useState(false)
  const [showReminderDialog, setShowReminderDialog] = useState(false)
  const [showShareDialog, setShowShareDialog] = useState(false)

  const currentMonth = date.toLocaleString("default", { month: "long" })
  const currentYear = date.getFullYear()

  const handlePreviousMonth = () => {
    const previousMonth = new Date(date)
    previousMonth.setMonth(previousMonth.getMonth() - 1)
    setDate(previousMonth)
  }

  const handleNextMonth = () => {
    const nextMonth = new Date(date)
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    setDate(nextMonth)
  }

  const handleDayClick = (day: Date) => {
    setSelectedDay(day)
    setShowDayDialog(true)
  }

  // Get days in current month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const daysInMonth = getDaysInMonth(date.getFullYear(), date.getMonth())
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay()

  // Generate calendar days
  const calendarDays = []

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }

  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">HabitTracker</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={() => setShowShareDialog(true)}>
                <Share2 className="h-5 w-5" />
              </Button>
              <Link href="/milestones">
                <Button variant="ghost" size="icon">
                  <Trophy className="h-5 w-5" />
                </Button>
              </Link>
              <Avatar>
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-bold">
                {currentMonth} {currentYear}
              </h2>
              <Button variant="outline" size="icon" onClick={handleNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={() => setShowAddHabitDialog(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Habit
            </Button>
          </div>

          <Tabs defaultValue="calendar">
            <TabsList className="mb-4">
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="streaks">Streaks</TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
            </TabsList>

            <TabsContent value="calendar">
              <Card>
                <CardContent className="p-6">
                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="font-medium text-sm py-1">
                        {day}
                      </div>
                    ))}

                    {calendarDays.map((day, index) => (
                      <div
                        key={index}
                        className={`aspect-square p-1 ${day ? "cursor-pointer" : ""}`}
                        onClick={
                          day ? () => handleDayClick(new Date(date.getFullYear(), date.getMonth(), day)) : undefined
                        }
                      >
                        {day && (
                          <div className="h-full rounded-md border flex flex-col p-1">
                            <div className="text-sm font-medium">{day}</div>
                            <div className="flex flex-wrap gap-1 mt-auto">
                              {mockHabits.map((habit) =>
                                habit.completedDays.includes(day) ? (
                                  <div
                                    key={habit.id}
                                    className={`w-2 h-2 rounded-full ${habit.color}`}
                                    title={habit.name}
                                  />
                                ) : null,
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockHabits.map((habit) => (
                  <Card key={habit.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{habit.name}</CardTitle>
                      <CardDescription>
                        Current streak: <Badge variant="outline">{habit.streak} days</Badge>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm">
                          Mark Complete
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setShowReminderDialog(true)}>
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          Reminder
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="streaks">
              <Card>
                <CardHeader>
                  <CardTitle>Current Streaks</CardTitle>
                  <CardDescription>Keep your streaks going to build lasting habits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockHabits.map((habit) => (
                      <div key={habit.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${habit.color}`}></div>
                          <span>{habit.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{habit.streak} days</span>
                          <Progress value={habit.streak * 10} className="w-24 h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="milestones">
              <Card>
                <CardHeader>
                  <CardTitle>Milestones</CardTitle>
                  <CardDescription>Track your progress and celebrate achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockMilestones.map((milestone) => (
                      <div key={milestone.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{milestone.name}</div>
                            <div className="text-sm text-muted-foreground">{milestone.habit}</div>
                          </div>
                          {milestone.completed && <Badge className="bg-green-500">Completed</Badge>}
                        </div>
                        <Progress value={milestone.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Add Habit Dialog */}
      <Dialog open={showAddHabitDialog} onOpenChange={setShowAddHabitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Habit</DialogTitle>
            <DialogDescription>Create a new habit to track in your calendar.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="habit-name">Habit Name</Label>
              <Input id="habit-name" placeholder="e.g., Morning Meditation" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="habit-color">Color</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="green">Green</SelectItem>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="purple">Purple</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                  <SelectItem value="red">Red</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="habit-frequency">Frequency</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekdays">Weekdays</SelectItem>
                  <SelectItem value="weekends">Weekends</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="habit-reminder">Set Reminder</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (8:00 AM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12:00 PM)</SelectItem>
                  <SelectItem value="evening">Evening (6:00 PM)</SelectItem>
                  <SelectItem value="custom">Custom Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddHabitDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowAddHabitDialog(false)}>Add Habit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Day View Dialog */}
      <Dialog open={showDayDialog} onOpenChange={setShowDayDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {selectedDay?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </DialogTitle>
            <DialogDescription>Manage your habits for this day.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {mockHabits.map((habit) => (
              <div key={habit.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${habit.color}`}></div>
                  <span>{habit.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    {habit.completedDays.includes(selectedDay?.getDate() || 0) ? "Completed" : "Mark Complete"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReminderDialog(true)}>
              Set Reminder
            </Button>
            <Button onClick={() => setShowDayDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reminder Dialog */}
      <Dialog open={showReminderDialog} onOpenChange={setShowReminderDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Set Reminder</DialogTitle>
            <DialogDescription>Choose when you want to be reminded.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="habit-select">Habit</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select habit" />
                </SelectTrigger>
                <SelectContent>
                  {mockHabits.map((habit) => (
                    <SelectItem key={habit.id} value={habit.id.toString()}>
                      {habit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reminder-time">Time</Label>
              <Input type="time" id="reminder-time" defaultValue="08:00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reminder-repeat">Repeat</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekdays">Weekdays</SelectItem>
                  <SelectItem value="weekends">Weekends</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReminderDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowReminderDialog(false)}>Save Reminder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share Your Progress</DialogTitle>
            <DialogDescription>Share your habit calendar with friends and family.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="share-link">Share Link</Label>
              <div className="flex gap-2">
                <Input id="share-link" value="https://habittracker.app/share/u123456" readOnly />
                <Button variant="outline" size="sm">
                  Copy
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Share with</Label>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  Email
                </Button>
                <Button variant="outline" size="sm">
                  Twitter
                </Button>
                <Button variant="outline" size="sm">
                  Facebook
                </Button>
                <Button variant="outline" size="sm">
                  WhatsApp
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="privacy-settings">Privacy Settings</Label>
              <Select defaultValue="friends">
                <SelectTrigger>
                  <SelectValue placeholder="Select privacy level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public - Anyone with the link</SelectItem>
                  <SelectItem value="friends">Friends Only</SelectItem>
                  <SelectItem value="private">Private - Only Me</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowShareDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowShareDialog(false)}>Share</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
