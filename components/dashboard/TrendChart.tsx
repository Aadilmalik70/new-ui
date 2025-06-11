import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface TrendChartProps {
  trendData: Array<{ month: string; volume: number }> | undefined
  keyword: string | undefined
}

export function TrendChart({ trendData, keyword }: TrendChartProps) {
  if (!trendData || trendData.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search Volume Trends</CardTitle>
        <CardDescription>Monthly search volume for "{keyword}" over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [value?.toLocaleString(), 'Search Volume']}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="volume" 
                stroke="#2563eb" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
