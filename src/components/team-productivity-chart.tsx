"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartTooltipContent, ChartContainer, type ChartConfig } from "@/components/ui/chart"

type TeamProductivityChartProps = {
  data: { department: string; productivity: number }[]
}

const chartConfig = {
  productivity: {
    label: "Productivity",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export function TeamProductivityChart({ data }: TeamProductivityChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Productivity</CardTitle>
        <CardDescription>Average productivity by department.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis
                dataKey="department"
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
                cursor={{ fill: 'hsl(var(--muted))' }}
                content={<ChartTooltipContent />}
              />
              <Bar dataKey="productivity" fill="var(--color-productivity)" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
