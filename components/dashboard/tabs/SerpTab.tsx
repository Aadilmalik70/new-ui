import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertCircle, XCircle } from "lucide-react"

interface BlueprintAPIResponse {
  data: {
    serp_features: {
      keyword: string
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
}

interface SerpTabProps {
  apiData: BlueprintAPIResponse | null
}

export function SerpTab({ apiData }: SerpTabProps) {
  const serpFeatures = apiData?.data?.serp_features
  
  const getPresenceIcon = (presence: string) => {
    switch (presence) {
      case "strong":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "weak":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      default:
        return <XCircle className="h-4 w-4 text-red-600" />
    }
  }
  
  const getPresenceColor = (presence: string) => {
    switch (presence) {
      case "strong":
        return "bg-green-50 border-green-200"
      case "weak":
        return "bg-yellow-50 border-yellow-200"
      default:
        return "bg-red-50 border-red-200"
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>SERP Features Analysis</CardTitle>
          <CardDescription>
            Current SERP features for "{serpFeatures?.keyword || 'your keyword'}" and optimization opportunities
          </CardDescription>
        </CardHeader>
        <CardContent>
          {serpFeatures?.serp_features && serpFeatures.serp_features.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {serpFeatures.serp_features.map((feature, index) => (
                <Card key={index} className={`p-4 ${getPresenceColor(feature.presence)}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium capitalize flex items-center gap-2">
                      {getPresenceIcon(feature.presence)}
                      {feature.name.replace(/_/g, " ")}
                    </h4>
                    <Badge 
                      variant={feature.presence === "strong" ? "default" : 
                               feature.presence === "weak" ? "secondary" : "outline"}
                    >
                      {feature.presence}
                    </Badge>
                  </div>
                  
                  {feature.data?.count && (
                    <div className="text-sm text-slate-600 mb-2">
                      Found: {feature.data.count} instances
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Optimization Potential</span>
                      <span className="font-medium">
                        {feature.presence === "strong" ? "Low" : 
                         feature.presence === "weak" ? "Medium" : "High"}
                      </span>
                    </div>
                    <Progress 
                      value={feature.presence === "strong" ? 20 : 
                             feature.presence === "weak" ? 60 : 90} 
                      className="h-2"
                    />
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
          <CardTitle>SERP Optimization Recommendations</CardTitle>
          <CardDescription>AI-powered actionable steps to improve your SERP presence</CardDescription>
        </CardHeader>
        <CardContent>
          {serpFeatures?.recommendations && serpFeatures.recommendations.length > 0 ? (
            <div className="space-y-6">
              {serpFeatures.recommendations.map((rec, index) => (
                <div key={index} className="border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold text-lg capitalize">
                        {rec.feature.replace(/_/g, " ")}
                      </h4>
                      <Badge 
                        variant={rec.opportunity === "high" ? "default" : 
                                rec.opportunity === "medium" ? "secondary" : "outline"}
                        className={rec.opportunity === "high" ? "bg-green-100 text-green-800" : ""}
                      >
                        {rec.opportunity} opportunity
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 p-3 rounded-lg mb-4">
                    <p className="text-sm text-slate-700">
                      <strong>Current Status:</strong> {rec.status}
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium mb-3 text-slate-800">Recommended Actions:</h5>
                    <ul className="space-y-2">
                      {rec.recommendations.map((recommendation, i) => (
                        <li key={i} className="text-sm flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-slate-700">{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">No optimization recommendations available</p>
          )}
        </CardContent>
      </Card>
      
      {/* SERP Strategy Summary */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800">🎯 SERP Strategy Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">High Priority Actions</h4>
              <ul className="space-y-1 text-sm text-blue-700">
                {serpFeatures?.recommendations
                  ?.filter(rec => rec.opportunity === "high" || rec.opportunity === "medium")
                  ?.slice(0, 3)
                  ?.map((rec, index) => (
                  <li key={index}>
                    • Focus on {rec.feature.replace(/_/g, " ")} optimization
                  </li>
                )) || <li>• Analyze keyword to get specific recommendations</li>}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Expected Benefits</h4>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• Increased visibility in search results</li>
                <li>• Higher click-through rates</li>
                <li>• Better user engagement</li>
                <li>• Competitive advantage in SERPs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
