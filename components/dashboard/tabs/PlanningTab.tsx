import { useState } from "react"
import {
  Calendar,
  CalendarIcon,
  Plus,
  CheckCircle2,
  Clock,
  Edit3,
  AlertCircle,
  MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

// Sample content planning data
const contentPlanningData = [
  {
    id: 1,
    title: "Ultimate Guide to Content Strategy in 2025",
    type: "Blog Post",
    status: "In Progress",
    assignedTo: "Alex Johnson",
    dueDate: "2025-05-15",
    keywords: ["content strategy", "content planning", "SEO content"],
    priority: "High",
  },
  {
    id: 2,
    title: "10 Content Strategy Templates for Marketing Teams",
    type: "Resource",
    status: "Planned",
    assignedTo: "Sarah Miller",
    dueDate: "2025-05-22",
    keywords: ["content templates", "content strategy", "marketing"],
    priority: "Medium",
  },
  {
    id: 3,
    title: "How to Audit Your Content Strategy: Step-by-Step Guide",
    type: "Tutorial",
    status: "Completed",
    assignedTo: "Michael Brown",
    dueDate: "2025-05-08",
    keywords: ["content audit", "content strategy", "content analysis"],
    priority: "Medium",
  },
  {
    id: 4,
    title: "Content Strategy vs Content Marketing: Key Differences",
    type: "Blog Post",
    status: "Review",
    assignedTo: "Emily Davis",
    dueDate: "2025-05-12",
    keywords: ["content strategy", "content marketing", "differences"],
    priority: "Low",
  },
  {
    id: 5,
    title: "Building a Content Strategy Framework for E-commerce",
    type: "Case Study",
    status: "Planned",
    assignedTo: "Alex Johnson",
    dueDate: "2025-05-28",
    keywords: ["e-commerce", "content strategy", "framework"],
    priority: "High",
  },
]

export function PlanningTab() {
  const [selectedView, setSelectedView] = useState("list")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">Content Calendar</h2>
          <p className="text-slate-600">Plan, schedule and track your content creation process</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Select value={selectedView} onValueChange={setSelectedView}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="list">List View</SelectItem>
              <SelectItem value="calendar">Calendar View</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Content</SelectItem>
              <SelectItem value="planned">Planned</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="review">In Review</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Content
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Add New Content</DialogTitle>
                <DialogDescription>
                  Create a new content item and add it to your content calendar.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter content title" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="type">Content Type</Label>
                    <Select>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blog">Blog Post</SelectItem>
                        <SelectItem value="resource">Resource</SelectItem>
                        <SelectItem value="tutorial">Tutorial</SelectItem>
                        <SelectItem value="case-study">Case Study</SelectItem>
                        <SelectItem value="infographic">Infographic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select>
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="assigned">Assigned To</Label>
                    <Input id="assigned" placeholder="Enter name" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Due Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="keywords">Target Keywords</Label>
                  <Input id="keywords" placeholder="Enter keywords separated by commas" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Brief Description</Label>
                  <Textarea id="description" placeholder="Enter a brief description of the content" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Content</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {selectedView === "list" ? (
        <Card>
          <CardHeader>
            <CardTitle>Content Items</CardTitle>
            <CardDescription>Manage your planned content items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contentPlanningData
                .filter(
                  (item) =>
                    selectedFilter === "all" || item.status.toLowerCase().replace(" ", "-") === selectedFilter,
                )
                .map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div
                        className={`w-full md:w-1 h-2 md:h-auto ${
                          item.status === "Completed"
                            ? "bg-green-500"
                            : item.status === "In Progress"
                              ? "bg-blue-500"
                              : item.status === "Review"
                                ? "bg-orange-500"
                                : "bg-slate-300"
                        }`}
                      ></div>
                      <div className="flex-1 p-4">
                        <div className="flex flex-col md:flex-row justify-between gap-2">
                          <div>
                            <h3 className="font-medium text-lg">{item.title}</h3>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {item.keywords.map((keyword, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-2 md:mt-0">
                            <Badge
                              variant={
                                item.priority === "High"
                                  ? "destructive"
                                  : item.priority === "Medium"
                                    ? "default"
                                    : "secondary"
                              }
                              className="whitespace-nowrap"
                            >
                              {item.priority} Priority
                            </Badge>
                            <Badge variant="outline">{item.type}</Badge>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between mt-4 gap-2">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center text-sm text-slate-600">
                              <Calendar className="h-4 w-4 mr-1" />
                              Due: {new Date(item.dueDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center text-sm text-slate-600">
                              <Avatar className="h-5 w-5 mr-1">
                                <AvatarFallback className="text-xs">
                                  {item.assignedTo
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              {item.assignedTo}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={`flex items-center gap-1 ${
                                item.status === "Completed"
                                  ? "text-green-600 border-green-200 bg-green-50"
                                  : item.status === "In Progress"
                                    ? "text-blue-600 border-blue-200 bg-blue-50"
                                    : item.status === "Review"
                                      ? "text-orange-600 border-orange-200 bg-orange-50"
                                      : "text-slate-600 border-slate-200 bg-slate-50"
                              }`}
                            >
                              {item.status === "Completed" ? (
                                <CheckCircle2 className="h-3 w-3" />
                              ) : item.status === "In Progress" ? (
                                <Clock className="h-3 w-3" />
                              ) : item.status === "Review" ? (
                                <AlertCircle className="h-3 w-3" />
                              ) : (
                                <Calendar className="h-3 w-3" />
                              )}
                              {item.status}
                            </Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>
                                  <Edit3 className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>Change Status</DropdownMenuItem>
                                <DropdownMenuItem>Reassign</DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Content Calendar</CardTitle>
            <CardDescription>Monthly view of your content schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md p-4">
              <div className="grid grid-cols-7 gap-px bg-slate-200">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="bg-white p-2 text-center font-medium">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }).map((_, i) => {
                  const day = i - 3 // Offset to start month on a Wednesday
                  const isCurrentMonth = day >= 0 && day < 31
                  const hasContent = isCurrentMonth && [8, 12, 15, 22, 28].includes(day)

                  return (
                    <div
                      key={i}
                      className={`min-h-24 bg-white p-1 ${
                        isCurrentMonth ? "text-slate-900" : "text-slate-400 bg-slate-50"
                      } ${day === 14 ? "ring-2 ring-blue-500" : ""}`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-medium p-1">
                          {isCurrentMonth ? day + 1 : day < 0 ? 30 + day + 1 : day - 30}
                        </span>
                      </div>
                      {hasContent && (
                        <div
                          className={`mt-1 p-1 text-xs rounded-md ${
                            day === 8
                              ? "bg-green-100 text-green-800"
                              : day === 12
                                ? "bg-orange-100 text-orange-800"
                                : day === 15
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-slate-100 text-slate-800"
                          }`}
                        >
                          {day === 8 && "How to Audit Content..."}
                          {day === 12 && "Content Strategy vs..."}
                          {day === 15 && "Ultimate Guide to..."}
                          {day === 22 && "10 Content Strategy..."}
                          {day === 28 && "Building a Content..."}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Content Status</CardTitle>
            <CardDescription>Overview of your content pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { status: "Planned", count: 2, color: "bg-slate-200" },
                { status: "In Progress", count: 1, color: "bg-blue-500" },
                { status: "Review", count: 1, color: "bg-orange-500" },
                { status: "Completed", count: 1, color: "bg-green-500" },
              ].map((item) => (
                <div key={item.status} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{item.status}</span>
                    <span>{item.count} items</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full ${item.color}`}
                      style={{ width: `${(item.count / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Content items due soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contentPlanningData
                .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                .slice(0, 3)
                .map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
                        <Badge
                          variant="outline"
                          className={`${
                            item.status === "Completed"
                              ? "text-green-600 border-green-200 bg-green-50"
                              : item.status === "In Progress"
                                ? "text-blue-600 border-blue-200 bg-blue-50"
                                : item.status === "Review"
                                  ? "text-orange-600 border-orange-200 bg-orange-50"
                                  : "text-slate-600 border-slate-200 bg-slate-50"
                          }`}
                        >
                          {item.status}
                        </Badge>
                        <span>•</span>
                        <span>{item.assignedTo}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{new Date(item.dueDate).toLocaleDateString()}</div>
                      <div className="text-xs text-slate-500">
                        {Math.ceil(
                          (new Date(item.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                        )}{" "}
                        days left
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
