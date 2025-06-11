import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface APIResponse {
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
}

interface SerpTabProps {
  apiData: APIResponse | null
}

export function SerpTab({ apiData }: SerpTabProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>SERP Features Analysis</CardTitle>
          <CardDescription>Current SERP features and optimization opportunities</CardDescription>
        </CardHeader>
        <CardContent>
          {apiData?.optimization_recommendations?.serp_features ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {apiData.optimization_recommendations.serp_features.map((feature, index) => (
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
          ) : (
            <p className="text-slate-500">No SERP features data available</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Optimization Recommendations</CardTitle>
          <CardDescription>Actionable steps to improve your SERP presence</CardDescription>
        </CardHeader>
        <CardContent>
          {apiData?.optimization_recommendations?.recommendations ? (
            <div className="space-y-4">
              {apiData.optimization_recommendations.recommendations.map((rec, index) => (
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
          ) : (
            <p className="text-slate-500">No optimization recommendations available</p>
          )}
        </CardContent>
      </Card>
    </>
  )
}
