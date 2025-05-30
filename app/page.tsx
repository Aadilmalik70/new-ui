"use client"

import { useState } from "react"
import {
  Search,
  Bell,
  HelpCircle,
  TrendingUp,
  TrendingDown,
  Target,
  Star,
  Download,
  ExternalLink,
  Filter,
  MoreHorizontal,
  FileText,
  Globe,
  Zap,
  BarChart3,
  Activity,
  CalendarIcon,
  Plus,
  CheckCircle2,
  Clock,
  Edit3,
  AlertCircle,
  Calendar,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"

// Types for API response
interface KeywordMetric {
  keyword: string
  search_volume: number
  competition: number
  competition_level: string
  cpc: number
  difficulty: number
  opportunity: number
  trend_data: {
    monthly_data: Record<string, number>
    trend_direction: string
    year_over_year_change: string
  }
  serp_features: {
    featured_snippet: boolean
    people_also_ask: boolean
    images: boolean
    videos: boolean
  }
  total_results: number
}

interface APIResponse {
  keyword_data: {
    keyword_metrics: KeywordMetric[]
    related_keywords: KeywordMetric[]
  }
  content_blueprint: {
    keyword: string
    recommendations: string[]
    outline: {
      title: string
      sections: Array<{
        heading: string
        subsections: string[]
      }>
    }
  }
  optimization_recommendations: {
    recommendations: Array<{
      feature: string
      status: string
      opportunity: string
      recommendations: string[]
    }>
    serp_features: Array<{
      name: string
      presence: string
      data: any
    }>
  }
  performance_prediction: {
    estimated_serp_position: number
    estimated_ctr: number
    estimated_traffic: number
    confidence_score: number
    ranking_factors: Array<{
      factor_name: string
      score: number
      description: string
    }>
    improvement_suggestions: Array<{
      area: string
      effort: string
      impact: string
      suggestion: string
    }>
  }
  export_formats: Array<{
    id: string
    name: string
    extension: string
    description: string
  }>
  cms_platforms: Array<{
    id: string
    name: string
    description: string
    icon: string
  }>
}

// Sample content planning data (keeping this as static for now)
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

export default function SEODashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("content strategy")
  const [domain, setDomain] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedView, setSelectedView] = useState("list")
  const [apiData, setApiData] = useState<APIResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Function to call the API
  const analyzeKeyword = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Error",
        description: "Please enter a keyword to analyze",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:5000/api/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        mode: "cors", // Enable CORS
        credentials: "omit", // Don't send credentials
        body: JSON.stringify({
          input: searchQuery,
          domain: domain,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const data: APIResponse = await response.json()
      setApiData(data)
      toast({
        title: "Success",
        description: "Keyword analysis completed successfully",
      })
    } catch (error) {
      console.error("Error analyzing keyword:", error)

      // More specific error messages
      let errorMessage = "Failed to analyze keyword. Please try again."

      if (error instanceof TypeError && error.message.includes("fetch")) {
        errorMessage =
          "Cannot connect to API server. Please ensure the server is running on localhost:5000 and CORS is enabled."
      } else if (error instanceof Error) {
        errorMessage = error.message
      }

      toast({
        title: "Connection Error",
        description: errorMessage,
        variant: "destructive",
      })

      // For demo purposes, load sample data if API fails
      loadSampleData()
    } finally {
      setIsLoading(false)
    }
  }

  // Add sample data loader for demo purposes
  const loadSampleData = () => {
    const sampleData: APIResponse = {
      keyword_data: {
        keyword_metrics: [
          {
            keyword: searchQuery,
            search_volume: 17500,
            competition: 0.65,
            competition_level: "Medium",
            cpc: 2.45,
            difficulty: 65,
            opportunity: 85,
            trend_data: {
              monthly_data: {
                "2024-11": 12500,
                "2024-12": 13200,
                "2025-01": 14800,
                "2025-02": 16200,
                "2025-03": 15900,
                "2025-04": 17500,
              },
              trend_direction: "up",
              year_over_year_change: "+12%",
            },
            serp_features: {
              featured_snippet: true,
              people_also_ask: true,
              images: false,
              videos: true,
            },
            total_results: 2100000,
          },
        ],
        related_keywords: [
          {
            keyword: "content marketing strategy",
            search_volume: 22100,
            competition: 0.8,
            competition_level: "High",
            cpc: 3.2,
            difficulty: 72,
            opportunity: 72,
            trend_data: {
              monthly_data: {},
              trend_direction: "up",
              year_over_year_change: "+8%",
            },
            serp_features: {
              featured_snippet: false,
              people_also_ask: true,
              images: true,
              videos: false,
            },
            total_results: 1800000,
          },
          {
            keyword: "SEO content strategy",
            search_volume: 8900,
            competition: 0.3,
            competition_level: "Low",
            cpc: 1.8,
            difficulty: 45,
            opportunity: 92,
            trend_data: {
              monthly_data: {},
              trend_direction: "stable",
              year_over_year_change: "0%",
            },
            serp_features: {
              featured_snippet: true,
              people_also_ask: false,
              images: false,
              videos: false,
            },
            total_results: 950000,
          },
        ],
      },
      content_blueprint: {
        keyword: searchQuery,
        recommendations: [
          "Create comprehensive guide covering all aspects of content strategy",
          "Develop case studies showcasing successful content strategy implementations",
          "Build resource library with templates and frameworks",
        ],
        outline: {
          title: "Ultimate Guide to Content Strategy",
          sections: [
            {
              heading: "Introduction to Content Strategy",
              subsections: ["What is Content Strategy", "Why It Matters", "Key Components"],
            },
          ],
        },
      },
      optimization_recommendations: {
        recommendations: [
          {
            feature: "featured_snippets",
            status: "Not present in current SERP",
            opportunity: "high",
            recommendations: [
              "Structure content with clear headings and concise paragraphs",
              "Answer the query directly and succinctly at the beginning",
              "Use lists, tables, or step-by-step formats where appropriate",
            ],
          },
        ],
        serp_features: [
          {
            name: "featured_snippets",
            presence: "none",
            data: { presence: "none" },
          },
          {
            name: "people_also_ask",
            presence: "strong",
            data: { presence: "strong", count: 4 },
          },
          {
            name: "knowledge_panels",
            presence: "strong",
            data: { presence: "strong" },
          },
          {
            name: "image_packs",
            presence: "none",
            data: { presence: "none" },
          },
          {
            name: "video_results",
            presence: "strong",
            data: { presence: "strong", count: 3 },
          },
        ],
      },
      performance_prediction: {
        estimated_serp_position: 5.2,
        estimated_ctr: 0.125,
        estimated_traffic: 2187,
        confidence_score: 85,
        ranking_factors: [
          { factor_name: "Content Quality", score: 0.86, description: "High-quality, comprehensive content" },
          { factor_name: "Technical SEO", score: 0.72, description: "Good technical optimization" },
          { factor_name: "User Experience", score: 0.9, description: "Excellent user experience" },
          { factor_name: "Authority", score: 0.68, description: "Moderate domain authority" },
          { factor_name: "Relevance", score: 0.88, description: "Highly relevant to search intent" },
        ],
        improvement_suggestions: [
          {
            area: "Content Freshness",
            effort: "Medium",
            impact: "Medium",
            suggestion: "Establish a regular update schedule to keep content fresh and current with latest trends.",
          },
          {
            area: "Mobile Optimization",
            effort: "Medium",
            impact: "High",
            suggestion: "Further optimize for mobile experience, focusing on Core Web Vitals metrics.",
          },
        ],
      },
      export_formats: [
        {
          id: "pdf",
          name: "PDF Document",
          extension: "PDF",
          description: "Export as a professionally formatted PDF document",
        },
        {
          id: "docx",
          name: "Word Document",
          extension: "DOCX",
          description: "Export as an editable Microsoft Word document",
        },
        {
          id: "html",
          name: "HTML Document",
          extension: "HTML",
          description: "Export as an HTML document ready for web publishing",
        },
        { id: "md", name: "Markdown", extension: "MD", description: "Export as a Markdown file for easy editing" },
        { id: "csv", name: "CSV Spreadsheet", extension: "CSV", description: "Export data as a CSV spreadsheet" },
        { id: "json", name: "JSON Data", extension: "JSON", description: "Export raw data in JSON format" },
      ],
      cms_platforms: [
        {
          id: "wordpress",
          name: "WordPress",
          description: "Publish directly to your WordPress site",
          icon: "wordpress-icon.svg",
        },
        { id: "webflow", name: "Webflow", description: "Export to your Webflow CMS", icon: "webflow-icon.svg" },
        {
          id: "contentful",
          name: "Contentful",
          description: "Publish to your Contentful workspace",
          icon: "contentful-icon.svg",
        },
        { id: "shopify", name: "Shopify", description: "Export to your Shopify blog", icon: "shopify-icon.svg" },
        { id: "hubspot", name: "HubSpot", description: "Publish to your HubSpot CMS", icon: "hubspot-icon.svg" },
      ],
    }

    setApiData(sampleData)
    toast({
      title: "Demo Mode",
      description: "Using sample data for demonstration. Please check your API server connection.",
      variant: "default",
    })
  }

  // Get primary keyword data
  const primaryKeyword = apiData?.keyword_data?.keyword_metrics?.[0]

  // Transform trend data for chart
  const trendData = primaryKeyword?.trend_data?.monthly_data
    ? Object.entries(primaryKeyword.trend_data.monthly_data).map(([month, volume]) => ({
        month: month,
        volume: volume,
      }))
    : []

  // Transform ranking factors for radar chart
  const radarData =
    apiData?.performance_prediction?.ranking_factors?.map((factor) => ({
      factor: factor.factor_name,
      score: Math.round(factor.score * 100),
    })) || []

  // Get content recommendations
  const contentRecommendations =
    apiData?.content_blueprint?.recommendations?.slice(0, 3).map((rec, index) => ({
      title: `Content Recommendation ${index + 1}`,
      type: "Blog Post",
      difficulty: "Medium",
      rationale: rec.substring(0, 100) + "...",
      focusAreas: ["Strategy Planning", "Content Audit", "Performance Metrics"],
      estimatedTraffic: "2,500-3,200 monthly visits",
    })) || []

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="flex h-16 items-center px-6">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">SEOStrategy</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900">
                Dashboard
              </Button>
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900">
                Keywords
              </Button>
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900">
                Content
              </Button>
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900">
                Analytics
              </Button>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Enter keyword (e.g., content strategy)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4"
                  onKeyPress={(e) => e.key === "Enter" && analyzeKeyword()}
                />
              </div>
              <Input
                placeholder="Domain (optional)"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-40"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>All Regions</DropdownMenuItem>
                  <DropdownMenuItem>United States</DropdownMenuItem>
                  <DropdownMenuItem>United Kingdom</DropdownMenuItem>
                  <DropdownMenuItem>Canada</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={analyzeKeyword} disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Search className="h-4 w-4 mr-2" />}
                Analyze
              </Button>
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">SEO Analysis: {searchQuery}</h1>
            <p className="text-slate-600">Comprehensive keyword and content strategy insights</p>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin mr-2" />
              <span>Analyzing keyword...</span>
            </div>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="keywords">Keywords</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="serp">SERP Analysis</TabsTrigger>
              <TabsTrigger value="predictions">Predictions</TabsTrigger>
              <TabsTrigger value="planning">Planning</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Hero Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Search Volume</CardTitle>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{primaryKeyword?.search_volume?.toLocaleString() || "N/A"}</div>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {primaryKeyword?.trend_data?.year_over_year_change || "N/A"} from last year
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Competition Level</CardTitle>
                    <Target className="h-4 w-4 text-orange-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">
                      {primaryKeyword?.competition_level || "N/A"}
                    </div>
                    <Progress value={primaryKeyword?.difficulty || 0} className="mt-2" />
                    <p className="text-xs text-slate-600 mt-1">
                      {primaryKeyword?.difficulty || 0}/100 difficulty score
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Opportunity Score</CardTitle>
                    <Zap className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">{primaryKeyword?.opportunity || "N/A"}</div>
                    <div className="w-16 h-16 mx-auto mt-2">
                      <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="2"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#2563eb"
                          strokeWidth="2"
                          strokeDasharray={`${primaryKeyword?.opportunity || 0}, 100`}
                        />
                      </svg>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">CPC</CardTitle>
                    <Star className="h-4 w-4 text-yellow-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">${primaryKeyword?.cpc?.toFixed(2) || "N/A"}</div>
                    <p className="text-xs text-slate-600">Average cost per click</p>
                  </CardContent>
                </Card>
              </div>

              {/* Trend Chart */}
              {trendData.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Search Volume Trends</CardTitle>
                    <CardDescription>Monthly search volume over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="volume" stroke="#2563eb" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="keywords" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Primary Keyword Analysis</CardTitle>
                  <CardDescription>Detailed metrics for your target keyword</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {primaryKeyword?.search_volume?.toLocaleString() || "N/A"}
                      </div>
                      <div className="text-sm text-slate-600">Monthly Volume</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        ${primaryKeyword?.cpc?.toFixed(2) || "N/A"}
                      </div>
                      <div className="text-sm text-slate-600">Avg CPC</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {primaryKeyword?.competition_level || "N/A"}
                      </div>
                      <div className="text-sm text-slate-600">Competition</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {primaryKeyword?.total_results?.toLocaleString() || "N/A"}
                      </div>
                      <div className="text-sm text-slate-600">Total Results</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {primaryKeyword?.serp_features?.featured_snippet && (
                      <Badge variant="secondary">Featured Snippets</Badge>
                    )}
                    {primaryKeyword?.serp_features?.people_also_ask && (
                      <Badge variant="secondary">People Also Ask</Badge>
                    )}
                    {primaryKeyword?.serp_features?.images && <Badge variant="secondary">Images</Badge>}
                    {primaryKeyword?.serp_features?.videos && <Badge variant="secondary">Videos</Badge>}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Related Keywords</CardTitle>
                  <CardDescription>Discover related keywords and their metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Keyword</TableHead>
                        <TableHead>Volume</TableHead>
                        <TableHead>Competition</TableHead>
                        <TableHead>CPC</TableHead>
                        <TableHead>Opportunity</TableHead>
                        <TableHead>Trend</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {apiData?.keyword_data?.related_keywords?.map((keyword, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{keyword.keyword}</TableCell>
                          <TableCell>{keyword.search_volume.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                keyword.competition_level === "High"
                                  ? "destructive"
                                  : keyword.competition_level === "Medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {keyword.competition_level}
                            </Badge>
                          </TableCell>
                          <TableCell>${keyword.cpc.toFixed(2)}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Progress value={keyword.opportunity} className="w-16" />
                              <span className="text-sm">{keyword.opportunity}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {keyword.trend_data.trend_direction === "up" ? (
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            ) : keyword.trend_data.trend_direction === "down" ? (
                              <TrendingDown className="h-4 w-4 text-red-600" />
                            ) : (
                              <div className="h-4 w-4 bg-slate-300 rounded-full" />
                            )}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>Add to favorites</DropdownMenuItem>
                                <DropdownMenuItem>Export keyword</DropdownMenuItem>
                                <DropdownMenuItem>View SERP</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-6">
              <div className="grid gap-6">
                {contentRecommendations.map((rec, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{rec.title}</CardTitle>
                          <CardDescription className="mt-1">{rec.rationale}</CardDescription>
                        </div>
                        <div className="flex space-x-2">
                          <Badge variant="outline">{rec.type}</Badge>
                          <Badge
                            variant={
                              rec.difficulty === "Low"
                                ? "secondary"
                                : rec.difficulty === "Medium"
                                  ? "default"
                                  : "destructive"
                            }
                          >
                            {rec.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Focus Areas:</h4>
                          <div className="flex flex-wrap gap-2">
                            {rec.focusAreas.map((area, i) => (
                              <Badge key={i} variant="outline">
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="text-sm text-slate-600">
                            <strong>Estimated Traffic:</strong> {rec.estimatedTraffic}
                          </div>
                          <Button size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            Generate Outline
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="serp" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>SERP Features Analysis</CardTitle>
                  <CardDescription>Current SERP features and optimization opportunities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {apiData?.optimization_recommendations?.serp_features?.map((feature, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium capitalize">{feature.name.replace("_", " ")}</h4>
                          <Badge variant={feature.presence === "strong" ? "default" : "outline"}>
                            {feature.presence === "strong" ? "Present" : "Absent"}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Opportunity</span>
                            <span>{feature.presence === "strong" ? "High" : "Medium"}</span>
                          </div>
                          <Progress value={feature.presence === "strong" ? 80 : 40} />
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Optimization Recommendations</CardTitle>
                  <CardDescription>Actionable steps to improve your SERP presence</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {apiData?.optimization_recommendations?.recommendations?.map((rec, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium capitalize">{rec.feature.replace("_", " ")}</h4>
                          <Badge variant={rec.opportunity === "high" ? "default" : "secondary"}>
                            {rec.opportunity} opportunity
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-3">{rec.status}</p>
                        <ul className="space-y-1">
                          {rec.recommendations.slice(0, 3).map((recommendation, i) => (
                            <li key={i} className="text-sm flex items-start">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                              {recommendation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="predictions" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ranking Factors Analysis</CardTitle>
                    <CardDescription>Your content performance across key ranking factors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {radarData.length > 0 ? (
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart data={radarData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="factor" />
                            <PolarRadiusAxis angle={90} domain={[0, 100]} />
                            <Radar name="Score" dataKey="score" stroke="#2563eb" fill="#2563eb" fillOpacity={0.1} />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="h-80 flex items-center justify-center text-slate-500">
                        No ranking factors data available
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Traffic Projections</CardTitle>
                    <CardDescription>Estimated performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-slate-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {Math.round(apiData?.performance_prediction?.estimated_serp_position || 0)}
                        </div>
                        <div className="text-sm text-slate-600">Estimated SERP Position</div>
                      </div>
                      <div className="text-center p-4 bg-slate-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {((apiData?.performance_prediction?.estimated_ctr || 0) * 100).toFixed(1)}%
                        </div>
                        <div className="text-sm text-slate-600">Expected CTR</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Monthly Traffic Potential</span>
                          <span>{apiData?.performance_prediction?.estimated_traffic || 0} visits</span>
                        </div>
                        <Progress value={apiData?.performance_prediction?.estimated_traffic || 0} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Confidence Level</span>
                          <span>{apiData?.performance_prediction?.confidence_score || 0}%</span>
                        </div>
                        <Progress value={apiData?.performance_prediction?.confidence_score || 0} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Improvement Suggestions */}
              {apiData?.performance_prediction?.improvement_suggestions && (
                <Card>
                  <CardHeader>
                    <CardTitle>Improvement Suggestions</CardTitle>
                    <CardDescription>Actionable recommendations to boost your rankings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {apiData.performance_prediction.improvement_suggestions.map((suggestion, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{suggestion.area}</h4>
                            <div className="flex space-x-2">
                              <Badge
                                variant={
                                  suggestion.effort === "Low"
                                    ? "secondary"
                                    : suggestion.effort === "Medium"
                                      ? "default"
                                      : "destructive"
                                }
                              >
                                {suggestion.effort} Effort
                              </Badge>
                              <Badge variant={suggestion.impact === "High" ? "default" : "secondary"}>
                                {suggestion.impact} Impact
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-slate-600">{suggestion.suggestion}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="planning" className="space-y-6">
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
            </TabsContent>
          </Tabs>
        </main>

        {/* Right Sidebar */}
        <aside className="w-80 bg-white border-l p-6 space-y-6">
          {/* Export Options */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Export Options</h3>
            <div className="grid grid-cols-2 gap-3">
              {(
                apiData?.export_formats || [
                  { id: "pdf", name: "PDF Document", extension: "PDF", description: "Report" },
                  { id: "docx", name: "Word Document", extension: "DOCX", description: "Document" },
                  { id: "html", name: "HTML Document", extension: "HTML", description: "Web Page" },
                  { id: "md", name: "Markdown", extension: "MD", description: "Markdown" },
                  { id: "csv", name: "CSV Spreadsheet", extension: "CSV", description: "Data" },
                  { id: "json", name: "JSON Data", extension: "JSON", description: "Raw Data" },
                ]
              ).map((format, index) => (
                <Button key={index} variant="outline" className="h-auto p-3 flex flex-col items-center space-y-1">
                  <FileText className="h-5 w-5" />
                  <div className="text-xs font-medium">{format.extension}</div>
                  <div className="text-xs text-slate-500">{format.description}</div>
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* CMS Publishing */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">CMS Publishing</h3>
            <div className="space-y-3">
              {(
                apiData?.cms_platforms || [
                  { id: "wordpress", name: "WordPress", description: "Publish directly to your WordPress site" },
                  { id: "webflow", name: "Webflow", description: "Export to your Webflow CMS" },
                  { id: "contentful", name: "Contentful", description: "Publish to your Contentful workspace" },
                  { id: "shopify", name: "Shopify", description: "Export to your Shopify blog" },
                  { id: "hubspot", name: "HubSpot", description: "Publish to your HubSpot CMS" },
                ]
              ).map((platform, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center">
                      <Globe className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-medium">{platform.name}</span>
                      <p className="text-xs text-slate-500">{platform.description}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Connect
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Quick Actions */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Star className="h-4 w-4 mr-2" />
                Save to Favorites
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ExternalLink className="h-4 w-4 mr-2" />
                Share Report Link
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Activity className="h-4 w-4 mr-2" />
                Schedule Refresh
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Print Summary
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
