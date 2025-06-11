"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

// Import new components
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { HeroMetrics } from "@/components/dashboard/HeroMetrics"
import { CompetitorInsightsSection } from "@/components/dashboard/CompetitorInsightsSection"
import { DetailedContentRecommendations } from "@/components/dashboard/DetailedContentRecommendations"
import { PeopleAlsoAskSection } from "@/components/dashboard/PeopleAlsoAskSection"
import { TrendChart } from "@/components/dashboard/TrendChart"

// Keep existing tab components for now (will be refactored separately)
import { KeywordsTab } from "@/components/dashboard/tabs/KeywordsTab"
import { SerpTab } from "@/components/dashboard/tabs/SerpTab"
import { PredictionsTab } from "@/components/dashboard/tabs/PredictionsTab"
import { PlanningTab } from "@/components/dashboard/tabs/PlanningTab"

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
    competitor_insights: {
      common_topics: string[]
      content_length: {
        average: number
        count: number
        max: number
        min: number
      }
      sentiment_trend: string
    }
    data_quality: {
      competitors_analyzed: number
      content_samples: number
      entities_extracted: number
      failed_competitors: number
      sentiment_samples: number
      success_rate: number
      successful_competitors: number
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
}

export default function SEODashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("ai powered seo tools")
  const [domain, setDomain] = useState("")
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
        mode: "cors",
        credentials: "omit",
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

      // Load sample data for demo purposes
      loadSampleData()
    } finally {
      setIsLoading(false)
    }
  }

  // Load sample data (using actual JSON structure provided)
  const loadSampleData = () => {
    const sampleData: APIResponse = {
      keyword_data: {
        keyword_metrics: [
          {
            keyword: "ai powered seo tools",
            search_volume: 7435,
            competition: 0.3,
            competition_level: "Low",
            cpc: 2.71,
            difficulty: 39,
            opportunity: 67,
            trend_data: {
              monthly_data: {
                "2024-11": 515,
                "2024-12": 451,
                "2025-01": 531,
                "2025-02": 470,
                "2025-03": 461,
                "2025-04": 441,
              },
              trend_direction: "down",
              year_over_year_change: "12%",
            },
            serp_features: {
              featured_snippet: false,
              people_also_ask: false,
              images: false,
              videos: false,
            },
            total_results: 52100000,
          },
        ],
        related_keywords: [
          {
            keyword: "ai powered seo tools tools",
            search_volume: 7286,
            competition: 0.3,
            competition_level: "Low",
            cpc: 2.04,
            difficulty: 30,
            opportunity: 70,
            trend_data: {
              monthly_data: {
                "2024-11": 659,
                "2024-12": 633,
                "2025-01": 654,
                "2025-02": 690,
                "2025-03": 878,
                "2025-04": 877,
              },
              trend_direction: "up",
              year_over_year_change: "-6%",
            },
            serp_features: {
              featured_snippet: false,
              people_also_ask: false,
              images: false,
              videos: false,
            },
            total_results: 81300000,
          },
          {
            keyword: "best ai powered seo tools",
            search_volume: 3258,
            competition: 0.3,
            competition_level: "Low",
            cpc: 2.52,
            difficulty: 30,
            opportunity: 70,
            trend_data: {
              monthly_data: {
                "2024-11": 314,
                "2024-12": 364,
                "2025-01": 351,
                "2025-02": 362,
                "2025-03": 414,
                "2025-04": 465,
              },
              trend_direction: "up",
              year_over_year_change: "-17%",
            },
            serp_features: {
              featured_snippet: false,
              people_also_ask: false,
              images: false,
              videos: false,
            },
            total_results: 49400000,
          },
        ],
      },
      content_blueprint: {
        keyword: "ai powered seo tools",
        recommendations: [
          "Create an \"Ultimate Guide\" or Comprehensive Resource:** The enormous average content length suggests that users searching for \"ai powered seo tools\" are looking for incredibly in-depth, comprehensive resources. Create a guide that leaves no stone unturned.",
          "Actionable Recommendation:** Develop an \"Ultimate Guide to AI-Powered SEO Tools\" covering topics from basic definitions and principles to advanced strategies and tool comparisons. Break it down into chapters/sections with a table of contents for easy navigation. Aim for at least 40,000 words, exceeding the average to establish authority.",
          "Develop a Comparative Review Matrix:** With users seeking detailed information, a simple listicle won't cut it. A comparative review matrix lets them see the strengths and weaknesses of each tool side-by-side.",
          "Actionable Recommendation:**  Create a detailed table comparing 10-15 of the most popular AI-powered SEO tools across key features (keyword research, content optimization, link building, reporting), pricing, ease of use, integrations, customer support, and overall effectiveness.  Include screenshots and user testimonials to support your assessments.",
          "Incorporate Case Studies and Real-World Examples:** The positive sentiment suggests people are receptive to seeing *how* these tools deliver value.",
          "Actionable Recommendation:**  Feature 3-5 in-depth case studies showcasing how specific businesses or individuals have achieved significant SEO results using AI-powered tools. Quantify the results with metrics like organic traffic growth, keyword ranking improvements, and conversion rate increases. Obtain permission and quote the users/business owners when possible.",
          "Address Advanced AI SEO Techniques and Future Trends:** Focus on the cutting edge to differentiate your content. Don't just describe *what* AI SEO tools do, but *how* to use them for complex strategies and what to expect in the future."
        ],
        outline: {
          title: "**1. Introduction: The AI Revolution in SEO is Here**",
          sections: [
            {
              heading: "Content Outline: Unleash SEO Power: A Deep Dive into AI-Powered Tools",
              subsections: []
            }
          ]
        },
        competitor_insights: {
          common_topics: ["seo", "semrush", "content", "ai", "seo content"],
          content_length: {
            average: 43878.625,
            count: 8,
            max: 113802,
            min: 1196
          },
          sentiment_trend: "Positive"
        },
        data_quality: {
          competitors_analyzed: 10,
          content_samples: 8,
          entities_extracted: 109,
          failed_competitors: 2,
          sentiment_samples: 8,
          success_rate: 80,
          successful_competitors: 8
        }
      },
      optimization_recommendations: {
        recommendations: [
          {
            feature: "featured_snippets",
            opportunity: "medium",
            status: "Not present in current SERP",
            recommendations: [
              "Structure content with clear headings and concise paragraphs",
              "Answer the query directly and succinctly at the beginning",
              "Use lists, tables, or step-by-step formats where appropriate",
              "Include the target keyword in the heading and first paragraph",
              "Keep answers between 40-60 words for optimal snippet length"
            ]
          }
        ],
        serp_features: [
          {
            name: "featured_snippets",
            presence: "none",
            data: { presence: "none" }
          },
          {
            name: "people_also_ask",
            presence: "strong",
            data: {
              presence: "strong",
              count: 4,
              data: [
                {
                  question: "Is there an AI tool for SEO?",
                  snippet: "Alli AI is an AI-powered SEO optimization tool designed for agencies and teams that automates technical and on-page SEO optimization. It analyzes your website and detects search engine optimization issues.",
                  title: "8 AI SEO Tools We Absolutely Love Using in 2025 - Backlinko",
                  date: "May 15, 2025",
                  link: "https://backlinko.com/ai-seo-tools"
                },
                {
                  question: "Is SEO possible with AI?",
                  snippet: "While traditional SEO remains essential, AI enhances it, offering automation and data mining to increase productivity and unlock new value in the organic channel.",
                  title: "What Exactly is AI in SEO? - BrightEdge",
                  date: "Mar 21, 2025",
                  link: "https://www.brightedge.com/glossary/how-has-ai-changed-search-marketing"
                },
                {
                  question: "Can ChatGPT do SEO?",
                  snippet: "ChatGPT can help with various SEO tasks including content generation, keyword research, and optimization suggestions, but should be used as a tool alongside human expertise.",
                  title: "AI Overview",
                  link: "https://www.youtube.com/watch?v=QKvVCZV_M6o"
                },
                {
                  question: "Can Google detect AI SEO?",
                  snippet: "Detection: Yes, Google (and various third-party tools) can often detect patterns indicative of AI generation, especially if the content is used straight out-of-the-box with no human refinement.",
                  title: "Can Google Detect AI Content: Tips to Avoid Penalization - Boostability",
                  date: "May 22, 2025",
                  link: "https://www.boostability.com/content/can-google-detect-ai-content/"
                }
              ]
            }
          }
        ]
      },
      performance_prediction: {
        estimated_serp_position: 11.2,
        estimated_ctr: 0.5,
        estimated_traffic: 15,
        confidence_score: 79,
        ranking_factors: [
          {
            factor_name: "User Intent Match",
            score: 0.92,
            description: "Content aligns well with the primary user intent for target queries."
          },
          {
            factor_name: "Semantic Relevance",
            score: 0.67,
            description: "Content demonstrates strong semantic relevance to the topic."
          },
          {
            factor_name: "Keyword Optimization",
            score: 0.72,
            description: "Content is well-optimized for target keywords without over-optimization."
          },
          {
            factor_name: "Content Structure",
            score: 0.74,
            description: "Content is well-structured with appropriate headings and organization."
          },
          {
            factor_name: "Mobile Optimization",
            score: 0.85,
            description: "Content is well-optimized for mobile devices."
          },
          {
            factor_name: "Entity Coverage",
            score: 0.86,
            description: "Content covers important entities related to the topic."
          },
          {
            factor_name: "Content Freshness",
            score: 0.78,
            description: "Content appears fresh and up-to-date."
          }
        ],
        improvement_suggestions: [
          {
            area: "Schema Markup",
            effort: "Low",
            impact: "Medium",
            suggestion: "Implement additional schema markup types to enhance SERP appearance and click-through rates."
          },
          {
            area: "Multimedia Enhancement",
            effort: "Medium",
            impact: "Medium",
            suggestion: "Add more visual elements such as infographics, charts, and videos to improve engagement and time on page."
          },
          {
            area: "Topical Authority",
            effort: "High",
            impact: "High",
            suggestion: "Develop additional supporting content to establish stronger topical authority in this subject area."
          },
          {
            area: "Semantic Relevance",
            effort: "Medium",
            impact: "Medium",
            suggestion: "Improve this area to enhance overall performance."
          }
        ]
      }
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

  // Get People Also Ask data
  const paaFeature = apiData?.optimization_recommendations?.serp_features?.find(
    feature => feature.name === "people_also_ask"
  )
  const paaData = paaFeature?.data?.data

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        domain={domain}
        setDomain={setDomain}
        isLoading={isLoading}
        onAnalyze={analyzeKeyword}
      />

      <div className="flex">
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
              <HeroMetrics primaryKeyword={primaryKeyword} />
              
              <TrendChart trendData={trendData} keyword={primaryKeyword?.keyword} />

              <CompetitorInsightsSection 
                competitorInsights={apiData?.content_blueprint?.competitor_insights}
                dataQuality={apiData?.content_blueprint?.data_quality}
              />
            </TabsContent>

            <TabsContent value="keywords" className="space-y-6">
              <KeywordsTab apiData={apiData} />
            </TabsContent>

            <TabsContent value="content" className="space-y-6">
              <DetailedContentRecommendations 
                recommendations={apiData?.content_blueprint?.recommendations}
              />
            </TabsContent>

            <TabsContent value="serp" className="space-y-6">
              <PeopleAlsoAskSection paaData={paaData} />
              <SerpTab apiData={apiData} />
            </TabsContent>

            <TabsContent value="predictions" className="space-y-6">
              <PredictionsTab apiData={apiData} />
            </TabsContent>

            <TabsContent value="planning" className="space-y-6">
              <PlanningTab />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
