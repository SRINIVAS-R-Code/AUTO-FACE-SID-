
"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartTooltipContent, ChartContainer, type ChartConfig } from "@/components/ui/chart"

type EmployeeActivityTrendChartProps = {
  data: { month: string; activity: number }[]
}

const chartConfig = {
  activity: {
    label: "Activity",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function EmployeeActivityTrendChart({ data }: EmployeeActivityTrendChartProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Activity Trend</CardTitle>
        <CardDescription>Overall activity level over the last 6 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                content={<ChartTooltipContent />}
              />
              <Line type="monotone" dataKey="activity" stroke="var(--color-activity)" strokeWidth={2} dot={false} />
            </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
