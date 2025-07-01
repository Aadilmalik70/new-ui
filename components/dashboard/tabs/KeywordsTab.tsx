import { TrendingUp, Target, Hash } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface BlueprintAPIResponse {
  blueprint_id: string
  keyword: string
  status: string
  generation_time: number
  created_at: string
  data: {
    keyword: string
    topic_clusters: {
      primary_cluster: string[]
      related_keywords: string[]
      secondary_clusters: Record<string, string[]>
    }
    competitor_analysis: {
      insights: {
        common_topics: string[]
        content_length: {
          average: number
          count: number
          max: number
          min: number
        }
        sentiment_trend: string
      }
    }
  }
}

interface KeywordsTabProps {
  apiData: BlueprintAPIResponse | null
}

export function KeywordsTab({ apiData }: KeywordsTabProps) {
  const topicClusters = apiData?.data?.topic_clusters
  const competitorInsights = apiData?.data?.competitor_analysis?.insights
  const targetKeyword = apiData?.keyword

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Target Keyword Analysis
          </CardTitle>
          <CardDescription>Primary keyword and strategic insights</CardDescription>
        </CardHeader>
        <CardContent>
          {targetKeyword ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    "{targetKeyword}"
                  </div>
                  <div className="text-sm text-slate-600 mt-1">Target Keyword</div>
                </div>
                <div className="text-center bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {competitorInsights?.content_length?.average ? 
                      Math.round(competitorInsights.content_length.average).toLocaleString() 
                      : "N/A"}
                  </div>
                  <div className="text-sm text-slate-600 mt-1">Avg. Content Length</div>
                </div>
                <div className="text-center bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {competitorInsights?.sentiment_trend || "N/A"}
                  </div>
                  <div className="text-sm text-slate-600 mt-1">Market Sentiment</div>
                </div>
              </div>
              
              {competitorInsights?.common_topics && (
                <div>
                  <h3 className="font-semibold mb-3">Common Topics in Competitor Content</h3>
                  <div className="flex flex-wrap gap-2">
                    {competitorInsights.common_topics.map((topic, index) => (
                      <Badge key={index} variant="outline" className="bg-yellow-50 text-yellow-800">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="text-slate-500">No target keyword data available</p>
          )}
        </CardContent>
      </Card>

      {topicClusters && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hash className="h-5 w-5" />
              Keyword Strategy & Topic Clusters
            </CardTitle>
            <CardDescription>Strategically related keywords and topic groupings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Primary Clusters */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                Primary Focus Areas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {topicClusters.primary_cluster.map((cluster, index) => (
                  <div key={index} className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="font-medium text-green-800">{cluster}</div>
                    <div className="text-sm text-green-600 mt-1">Primary Cluster</div>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            {/* Related Keywords */}
            <div>
              <h3 className="font-semibold mb-3">Related Keywords</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {topicClusters.related_keywords.map((keyword, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="justify-center p-2 text-center bg-blue-50 text-blue-700 hover:bg-blue-100"
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
            
            <Separator />
            
            {/* Secondary Clusters */}
            {Object.keys(topicClusters.secondary_clusters).length > 0 && (
              <div>
                <h3 className="font-semibold mb-4">Secondary Topic Areas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(topicClusters.secondary_clusters).map(([category, keywords]) => (
                    <Card key={category} className="border-slate-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base text-slate-700">{category}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-1">
                          {keywords.map((keyword, index) => (
                            <Badge 
                              key={index} 
                              variant="outline" 
                              className="text-xs bg-slate-50 text-slate-600"
                            >
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
      
      {/* Strategy Recommendations */}
      <Card className="border-indigo-200 bg-indigo-50">
        <CardHeader>
          <CardTitle className="text-indigo-800">💡 Keyword Strategy Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-indigo-700">
            <li>✅ Focus on primary clusters for main content sections</li>
            <li>✅ Use related keywords naturally throughout your content</li>
            <li>✅ Address common competitor topics to ensure competitive coverage</li>
            <li>✅ Create separate content pieces for each secondary topic area</li>
            <li>✅ Target content length around {competitorInsights?.content_length?.average ? 
              Math.ceil(competitorInsights.content_length.average * 1.1).toLocaleString() 
              : "industry average"} words</li>
          </ul>
        </CardContent>
      </Card>
    </>
  )
}
