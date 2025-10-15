
"use client"

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

type EmployeeActivityChartProps = {
  data: { metric: string; value: number }[]
}

const chartConfig = {
  value: {
    label: "Activity",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function EmployeeActivityChart({ data }: EmployeeActivityChartProps) {
  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="p-2">
        <CardTitle>Performance & Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <RadarChart data={data}>
            <ChartTooltip content={<ChartTooltipContent />} />
            <PolarGrid />
            <PolarAngleAxis dataKey="metric" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="Value"
              dataKey="value"
              stroke="var(--color-value)"
              fill="var(--color-value)"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
