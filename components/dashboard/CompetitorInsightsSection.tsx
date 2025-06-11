import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

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

interface DataQuality {
  competitors_analyzed: number
  content_samples: number
  entities_extracted: number
  failed_competitors: number
  sentiment_samples: number
  success_rate: number
  successful_competitors: number
}

interface CompetitorInsightsSectionProps {
  competitorInsights: CompetitorInsights | undefined
  dataQuality: DataQuality | undefined
}

export function CompetitorInsightsSection({ competitorInsights, dataQuality }: CompetitorInsightsSectionProps) {
  if (!competitorInsights && !dataQuality) {
    return null
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Competitor Analysis</CardTitle>
          <CardDescription>
            Insights from {dataQuality?.competitors_analyzed || 0} competitors analyzed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Analysis Success Rate</span>
                <span>{dataQuality?.success_rate || 0}%</span>
              </div>
              <Progress value={dataQuality?.success_rate || 0} />
            </div>
            
            {competitorInsights?.common_topics && (
              <div>
                <h4 className="font-medium mb-2">Common Topics:</h4>
                <div className="flex flex-wrap gap-2">
                  {competitorInsights.common_topics.map((topic, i) => (
                    <Badge key={i} variant="secondary">{topic}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            {competitorInsights?.content_length && (
              <div>
                <h4 className="font-medium mb-2">Content Length Insights:</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-600">Average:</span>
                    <div className="font-bold">
                      {competitorInsights.content_length.average?.toLocaleString() || 0} words
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-600">Range:</span>
                    <div className="font-bold">
                      {competitorInsights.content_length.min?.toLocaleString() || 0} - {competitorInsights.content_length.max?.toLocaleString() || 0}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {competitorInsights?.sentiment_trend && (
              <div>
                <h4 className="font-medium mb-2">Sentiment Trend:</h4>
                <Badge variant={competitorInsights.sentiment_trend === "Positive" ? "default" : "secondary"}>
                  {competitorInsights.sentiment_trend}
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Quality Metrics</CardTitle>
          <CardDescription>Analysis reliability indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Competitors Analyzed</span>
              <span className="font-medium">{dataQuality?.competitors_analyzed || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Successful Analyses</span>
              <span className="font-medium">{dataQuality?.successful_competitors || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Content Samples</span>
              <span className="font-medium">{dataQuality?.content_samples || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Entities Extracted</span>
              <span className="font-medium">{dataQuality?.entities_extracted || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Failed Analyses</span>
              <span className="font-medium text-red-600">{dataQuality?.failed_competitors || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Sentiment Samples</span>
              <span className="font-medium">{dataQuality?.sentiment_samples || 0}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
