import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts"

interface APIResponse {
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

interface PredictionsTabProps {
  apiData: APIResponse | null
}

export function PredictionsTab({ apiData }: PredictionsTabProps) {
  // Transform ranking factors for radar chart
  const radarData =
    apiData?.performance_prediction?.ranking_factors?.map((factor) => ({
      factor: factor.factor_name,
      score: Math.round(factor.score * 100),
    })) || []

  return (
    <>
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
                <Progress value={Math.min((apiData?.performance_prediction?.estimated_traffic || 0) / 10, 100)} />
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

      {/* Ranking Factors Details */}
      {apiData?.performance_prediction?.ranking_factors && (
        <Card>
          <CardHeader>
            <CardTitle>Ranking Factors Breakdown</CardTitle>
            <CardDescription>Detailed analysis of each ranking factor</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {apiData.performance_prediction.ranking_factors.map((factor, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{factor.factor_name}</h4>
                    <div className="flex items-center gap-2">
                      <Progress value={factor.score * 100} className="w-20" />
                      <span className="text-sm font-medium">{Math.round(factor.score * 100)}%</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600">{factor.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

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
    </>
  )
}
