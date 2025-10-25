import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Kpi } from "@/lib/types"
import { cn } from "@/lib/utils"
import { ArrowUp, ArrowDown } from "lucide-react"

type KpiCardProps = {
  kpi: Kpi
}

export function KpiCard({ kpi }: KpiCardProps) {
  const TrendIcon = kpi.changeType === "increase" ? ArrowUp : ArrowDown
  const trendColor =
    kpi.changeType === "increase" ? "text-green-500" : "text-red-500"

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
        {kpi.icon && <kpi.icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{kpi.value}</div>
        <p className="text-xs text-muted-foreground flex items-center">
          <span className={cn("mr-1 flex items-center", trendColor)}>
            <TrendIcon className="h-3 w-3 mr-0.5" />
            {kpi.change}
          </span>
          from last month
        </p>
      </CardContent>
    </Card>
  )
}
