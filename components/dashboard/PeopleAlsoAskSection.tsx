import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface PeopleAlsoAskData {
  question: string
  snippet: string
  title: string
  link?: string
  date?: string
}

interface PeopleAlsoAskSectionProps {
  paaData: PeopleAlsoAskData[] | undefined
}

export function PeopleAlsoAskSection({ paaData }: PeopleAlsoAskSectionProps) {
  if (!paaData || paaData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>People Also Ask</CardTitle>
          <CardDescription>No People Also Ask data available</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-slate-500">This search query doesn't have People Also Ask results in the SERP.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>People Also Ask</CardTitle>
        <CardDescription>Questions and answers from SERP analysis ({paaData.length} questions found)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {paaData.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
              <h4 className="font-medium text-blue-600 mb-2 leading-relaxed">{item.question}</h4>
              <p className="text-sm text-slate-600 mb-3 leading-relaxed">{item.snippet}</p>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <div className="flex-1">
                  <span className="font-medium">{item.title}</span>
                  {item.date && <span className="ml-2">• {item.date}</span>}
                </div>
                {item.link && (
                  <Button variant="ghost" size="sm" asChild>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View Source
                    </a>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
