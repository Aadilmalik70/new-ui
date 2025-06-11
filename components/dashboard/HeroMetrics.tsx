import { TrendingUp, TrendingDown, Target, Star, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

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

interface HeroMetricsProps {
  primaryKeyword: KeywordMetric | undefined
}

export function HeroMetrics({ primaryKeyword }: HeroMetricsProps) {
  return (
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
  )
}
