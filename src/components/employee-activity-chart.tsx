
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
    <Card>
      <CardHeader>
        <CardTitle>Performance & Activity Snapshot</CardTitle>
        <CardDescription>A holistic view of key performance indicators.</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig} className="w-full h-[250px]">
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
