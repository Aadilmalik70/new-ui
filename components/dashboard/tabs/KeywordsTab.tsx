import { TrendingUp, TrendingDown, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

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
}

interface KeywordsTabProps {
  apiData: APIResponse | null
}

export function KeywordsTab({ apiData }: KeywordsTabProps) {
  const primaryKeyword = apiData?.keyword_data?.keyword_metrics?.[0]

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Primary Keyword Analysis</CardTitle>
          <CardDescription>Detailed metrics for your target keyword</CardDescription>
        </CardHeader>
        <CardContent>
          {primaryKeyword ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {primaryKeyword.search_volume?.toLocaleString() || "N/A"}
                  </div>
                  <div className="text-sm text-slate-600">Monthly Volume</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    ${primaryKeyword.cpc?.toFixed(2) || "N/A"}
                  </div>
                  <div className="text-sm text-slate-600">Avg CPC</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {primaryKeyword.competition_level || "N/A"}
                  </div>
                  <div className="text-sm text-slate-600">Competition</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {primaryKeyword.total_results?.toLocaleString() || "N/A"}
                  </div>
                  <div className="text-sm text-slate-600">Total Results</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {primaryKeyword.serp_features?.featured_snippet && (
                  <Badge variant="secondary">Featured Snippets</Badge>
                )}
                {primaryKeyword.serp_features?.people_also_ask && (
                  <Badge variant="secondary">People Also Ask</Badge>
                )}
                {primaryKeyword.serp_features?.images && <Badge variant="secondary">Images</Badge>}
                {primaryKeyword.serp_features?.videos && <Badge variant="secondary">Videos</Badge>}
              </div>
            </>
          ) : (
            <p className="text-slate-500">No primary keyword data available</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Keywords</CardTitle>
          <CardDescription>Discover related keywords and their metrics</CardDescription>
        </CardHeader>
        <CardContent>
          {apiData?.keyword_data?.related_keywords && apiData.keyword_data.related_keywords.length > 0 ? (
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
                {apiData.keyword_data.related_keywords.map((keyword, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{keyword.keyword}</TableCell>
                    <TableCell>{keyword.search_volume?.toLocaleString() || 'N/A'}</TableCell>
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
                        {keyword.competition_level || 'N/A'}
                      </Badge>
                    </TableCell>
                    <TableCell>${keyword.cpc?.toFixed(2) || 'N/A'}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={keyword.opportunity || 0} className="w-16" />
                        <span className="text-sm">{keyword.opportunity || 'N/A'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {keyword.trend_data?.trend_direction === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : keyword.trend_data?.trend_direction === "down" ? (
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
          ) : (
            <p className="text-slate-500">No related keywords data available</p>
          )}
        </CardContent>
      </Card>
    </>
  )
}
