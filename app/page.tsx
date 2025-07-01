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

// Types for new Blueprint API response
interface CompetitorData {
  domain: string
  title: string
  url: string
  position: number
  content_length: number
  keyword_usage: {
    count: number
    density: number
    in_title: boolean
    in_meta: boolean
    in_h1: boolean
  }
  readability: {
    flesch_score: number
    reading_level: string
    avg_sentence_length: number
    word_count: number
  }
  sentiment: {
    score: number
    magnitude: number
    overall?: string
  }
  entities: Array<{
    name: string
    salience: number
    type: string
    mentions?: number
  }>
  content_structure: {
    heading_structure: Record<string, number>
    paragraph_count: number
    list_count: number
    image_count: number
    internal_link_count: number
    external_link_count: number
  }
}

interface HeadingStructure {
  h1: string
  h2_sections: Array<{
    title: string
    h3_subsections: string[]
  }>
}

interface SerpFeatureRecommendation {
  feature: string
  opportunity: string
  status: string
  recommendations: string[]
}

interface BlueprintAPIResponse {
  blueprint_id: string
  keyword: string
  status: string
  generation_time: number
  created_at: string
  data: {
    keyword: string
    competitor_analysis: {
      keyword: string
      competitors: CompetitorData[]
      insights: {
        common_topics: string[]
        content_length: {
          average: number
          count: number
          max: number
          min: number
        }
        sentiment_trend: string
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
    }
    heading_structure: HeadingStructure
    topic_clusters: {
      primary_cluster: string[]
      related_keywords: string[]
      secondary_clusters: Record<string, string[]>
    }
    serp_features: {
      keyword: string
      recommendations: SerpFeatureRecommendation[]
      serp_features: Array<{
        name: string
        presence: string
        data: any
      }>
    }
    content_insights: {
      analysis_status: string
      avg_word_count: number
      common_sections: string[]
      content_gaps: string[]
      structural_patterns: Record<string, any>
    }
    generation_metadata: {
      components_used: string[]
      created_at: string
      generation_time: number
      version: string
    }
  }
}

export default function SEODashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("ai powered seo tools")
  const [domain, setDomain] = useState("")
  const [apiData, setApiData] = useState<BlueprintAPIResponse | null>(null)
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
      const response = await fetch("https://app.serpstrategists.com/api/blueprints/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-User-ID": "test-user-1", // Required header for blueprint API
        },
        mode: "cors",
        credentials: "omit",
        body: JSON.stringify({
          keyword: searchQuery,
          project_id: domain || undefined, // Use domain as project_id if provided
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const data: BlueprintAPIResponse = await response.json()
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

  // Load sample data using new blueprint API format
  const loadSampleData = () => {
    const sampleData: BlueprintAPIResponse = {
      blueprint_id: "sample-blueprint-123",
      keyword: searchQuery,
      status: "completed",
      generation_time: 119,
      created_at: new Date().toISOString(),
      data: {
        keyword: searchQuery,
        competitor_analysis: {
          keyword: searchQuery,
          competitors: [
            {
              domain: "example.com",
              title: "Best AI-Powered SEO Tools 2025",
              url: "https://example.com/ai-seo-tools",
              position: 1,
              content_length: 45000,
              keyword_usage: {
                count: 15,
                density: 0.02,
                in_title: true,
                in_meta: true,
                in_h1: true
              },
              readability: {
                flesch_score: 65,
                reading_level: "College",
                avg_sentence_length: 18,
                word_count: 4500
              },
              sentiment: {
                score: 0.7,
                magnitude: 15.2,
                overall: "positive"
              },
              entities: [
                { name: "SEO", salience: 0.8, type: "TECHNOLOGY", mentions: 45 },
                { name: "AI", salience: 0.75, type: "TECHNOLOGY", mentions: 38 }
              ],
              content_structure: {
                heading_structure: { h1: 1, h2: 8, h3: 15 },
                paragraph_count: 35,
                list_count: 5,
                image_count: 12,
                internal_link_count: 18,
                external_link_count: 8
              }
            }
          ],
          insights: {
            common_topics: ["seo", "ai", "tools", "optimization", "content"],
            content_length: {
              average: 43878,
              count: 8,
              max: 113802,
              min: 1196
            },
            sentiment_trend: "Positive",
            data_quality: {
              competitors_analyzed: 10,
              content_samples: 8,
              entities_extracted: 109,
              failed_competitors: 2,
              sentiment_samples: 8,
              success_rate: 80,
              successful_competitors: 8
            }
          }
        },
        heading_structure: {
          h1: "Ultimate Guide to AI-Powered SEO Tools",
          h2_sections: [
            {
              title: "What are AI-Powered SEO Tools?",
              h3_subsections: ["Definition and Core Features", "How AI Enhances SEO", "Benefits for Businesses"]
            },
            {
              title: "Top AI SEO Tools in 2025",
              h3_subsections: ["Tool Comparison Matrix", "Pricing Analysis", "Feature Breakdown"]
            },
            {
              title: "Implementation Strategy",
              h3_subsections: ["Getting Started", "Best Practices", "Measuring Success"]
            }
          ]
        },
        topic_clusters: {
          primary_cluster: ["AI SEO Tools", "SEO Automation", "Content Optimization"],
          related_keywords: ["automated seo", "ai content optimization", "seo software", "keyword research tools"],
          secondary_clusters: {
            "Tool Features": ["keyword research", "content analysis", "rank tracking", "competitor analysis"],
            "Benefits": ["time savings", "accuracy improvement", "data insights", "automation"]
          }
        },
        serp_features: {
          keyword: searchQuery,
          recommendations: [
            {
              feature: "featured_snippets",
              opportunity: "medium",
              status: "Not present in current SERP",
              recommendations: [
                "Structure content with clear headings and concise paragraphs",
                "Answer the query directly and succinctly at the beginning",
                "Use lists, tables, or step-by-step formats where appropriate"
              ]
            }
          ],
          serp_features: [
            {
              name: "people_also_ask",
              presence: "strong",
              data: {
                presence: "strong",
                count: 4,
                data: [
                  {
                    question: "Is there an AI tool for SEO?",
                    snippet: "Yes, there are many AI-powered SEO tools available that can automate various SEO tasks.",
                    title: "AI SEO Tools Guide",
                    link: "https://example.com/ai-seo-guide"
                  }
                ]
              }
            }
          ]
        },
        content_insights: {
          analysis_status: "completed",
          avg_word_count: 4500,
          common_sections: ["Introduction", "Tool Reviews", "Comparison", "Conclusion"],
          content_gaps: ["Case studies", "ROI analysis", "Implementation tutorials"],
          structural_patterns: {
            "heading_depth": "3_levels",
            "list_usage": "frequent",
            "image_placement": "strategic"
          }
        },
        generation_metadata: {
          components_used: ["competitor_analysis", "content_analysis", "serp_optimization"],
          created_at: new Date().toISOString(),
          generation_time: 119,
          version: "1.0"
        }
      }
    }

    setApiData(sampleData)
    toast({
      title: "Demo Mode",
      description: "Using sample data for demonstration. Please check your API server connection.",
      variant: "default",
    })
  }

  // Get data from new blueprint structure
  const blueprintData = apiData?.data
  const competitorAnalysis = blueprintData?.competitor_analysis
  const headingStructure = blueprintData?.heading_structure
  const topicClusters = blueprintData?.topic_clusters
  const serpFeatures = blueprintData?.serp_features
  
  // Create mock primary keyword data for existing components
  const primaryKeyword = {
    keyword: apiData?.keyword || searchQuery,
    search_volume: 7435, // Mock data - you may want to add this to blueprint API
    competition: 0.3,
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
      trend_direction: "stable",
      year_over_year_change: "5%"
    }
  }

  // Transform trend data for chart
  const trendData = primaryKeyword?.trend_data?.monthly_data
    ? Object.entries(primaryKeyword.trend_data.monthly_data).map(([month, volume]) => ({
        month: month,
        volume: volume,
      }))
    : []

  // Get People Also Ask data from new structure
  const paaFeature = serpFeatures?.serp_features?.find(
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
                competitorInsights={competitorAnalysis?.insights}
                dataQuality={competitorAnalysis?.insights?.data_quality}
              />
            </TabsContent>

            <TabsContent value="keywords" className="space-y-6">
              <KeywordsTab apiData={apiData} />
            </TabsContent>

            <TabsContent value="content" className="space-y-6">
              <DetailedContentRecommendations 
                headingStructure={headingStructure}
                topicClusters={topicClusters}
                competitorInsights={competitorAnalysis?.insights}
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
