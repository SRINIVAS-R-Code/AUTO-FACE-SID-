
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

type ProductivityTrendChartProps = {
  data: { month: string; productivity: number }[]
}

const chartConfig = {
  productivity: {
    label: "Productivity",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function ProductivityTrendChart({ data }: ProductivityTrendChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Productivity Trend</CardTitle>
        <CardDescription>Company-wide productivity over time.</CardDescription>
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
              <Line type="monotone" dataKey="productivity" stroke="var(--color-productivity)" strokeWidth={2} dot={false} />
            </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
