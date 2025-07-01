import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface HeadingStructure {
  h1: string
  h2_sections: Array<{
    title: string
    h3_subsections: string[]
  }>
}

interface TopicClusters {
  primary_cluster: string[]
  related_keywords: string[]
  secondary_clusters: Record<string, string[]>
}

interface CompetitorInsights {
  common_topics: string[]
  content_length: {
    average: number
    count: number
    max: number
    min: number
  }
  sentiment_trend: string
}

interface DetailedContentRecommendationsProps {
  headingStructure?: HeadingStructure
  topicClusters?: TopicClusters
  competitorInsights?: CompetitorInsights
}

export function DetailedContentRecommendations({ 
  headingStructure, 
  topicClusters, 
  competitorInsights 
}: DetailedContentRecommendationsProps) {
  if (!headingStructure && !topicClusters && !competitorInsights) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Content Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-500">No content blueprint available. Please analyze a keyword first.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">AI-Generated Content Blueprint</h2>
      
      {/* Content Structure Section */}
      {headingStructure && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📝 Recommended Content Structure
              <Badge variant="default">AI Generated</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-blue-600 mb-2">Main Title (H1)</h3>
              <p className="text-slate-700 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                {headingStructure.h1}
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-semibold text-md mb-3">Content Sections (H2 & H3)</h3>
              <div className="space-y-4">
                {headingStructure.h2_sections.map((section, index) => (
                  <div key={index} className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-medium text-slate-800 mb-2">
                      {index + 1}. {section.title}
                    </h4>
                    {section.h3_subsections.length > 0 && (
                      <ul className="ml-4 space-y-1">
                        {section.h3_subsections.map((subsection, subIndex) => (
                          <li key={subIndex} className="text-slate-600 text-sm">
                            • {subsection}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Topic Clusters Section */}
      {topicClusters && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🎯 Topic Clusters & Keywords
              <Badge variant="secondary">Strategic Focus</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Primary Clusters</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {topicClusters.primary_cluster.map((cluster, index) => (
                  <Badge key={index} variant="default" className="bg-green-100 text-green-800">
                    {cluster}
                  </Badge>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-semibold mb-2">Related Keywords</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {topicClusters.related_keywords.map((keyword, index) => (
                  <Badge key={index} variant="outline" className="text-blue-600">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
            
            {Object.keys(topicClusters.secondary_clusters).length > 0 && (
              <>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-3">Secondary Topic Areas</h3>
                  <div className="space-y-3">
                    {Object.entries(topicClusters.secondary_clusters).map(([category, keywords]) => (
                      <div key={category} className="bg-slate-50 p-3 rounded-lg">
                        <h4 className="font-medium text-slate-800 mb-2">{category}</h4>
                        <div className="flex flex-wrap gap-1">
                          {keywords.map((keyword, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Competitor Insights Section */}
      {competitorInsights && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📊 Competitive Intelligence
              <Badge variant="outline">Data-Driven</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Content Length Strategy</h3>
                <div className="space-y-1 text-sm">
                  <p><strong>Average:</strong> {competitorInsights.content_length.average.toLocaleString()} words</p>
                  <p><strong>Range:</strong> {competitorInsights.content_length.min.toLocaleString()} - {competitorInsights.content_length.max.toLocaleString()} words</p>
                  <p className="text-blue-600 font-medium mt-2">
                    💡 Aim for {Math.ceil(competitorInsights.content_length.average * 1.1).toLocaleString()}+ words to outperform
                  </p>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Market Sentiment</h3>
                <div className="space-y-1 text-sm">
                  <p><strong>Trend:</strong> {competitorInsights.sentiment_trend}</p>
                  <p className="text-green-600 font-medium mt-2">
                    💡 {competitorInsights.sentiment_trend === 'Positive' 
                      ? 'Focus on benefits and success stories'
                      : 'Address pain points and solutions'
                    }
                  </p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-semibold mb-2">Common Topics in Top Content</h3>
              <div className="flex flex-wrap gap-2">
                {competitorInsights.common_topics.map((topic, index) => (
                  <Badge key={index} variant="outline" className="bg-yellow-50 text-yellow-800">
                    {topic}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-slate-600 mt-2">
                💡 Ensure your content covers these essential topics for competitive relevance
              </p>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Action Items Card */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800">🚀 Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-green-700">
            <li>✅ Use the recommended H1 and section structure as your content outline</li>
            <li>✅ Target the suggested word count based on competitor analysis</li>
            <li>✅ Incorporate primary and secondary topic clusters throughout your content</li>
            <li>✅ Include related keywords naturally in your content</li>
            <li>✅ Address the common topics found in top-performing competitor content</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
