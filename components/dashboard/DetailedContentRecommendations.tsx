import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface DetailedContentRecommendationsProps {
  recommendations: string[] | undefined
}

export function DetailedContentRecommendations({ recommendations }: DetailedContentRecommendationsProps) {
  if (!recommendations || recommendations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Content Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-500">No recommendations available. Please analyze a keyword first.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">AI-Powered Content Recommendations</h2>
      {recommendations.map((recommendation, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-lg">Strategy #{index + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 leading-relaxed mb-4">{recommendation}</p>
            <div className="flex gap-2">
              <Badge variant="outline">AI Strategy</Badge>
              <Badge variant="secondary">Content Planning</Badge>
              {index < 3 && <Badge variant="default">High Priority</Badge>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
