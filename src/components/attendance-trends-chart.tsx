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

type AttendanceChartProps = {
  data: { month: string; attendance: number }[]
}

const chartConfig = {
  attendance: {
    label: "Attendance",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export function AttendanceTrendsChart({ data }: AttendanceChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Trends</CardTitle>
        <CardDescription>Overall monthly attendance percentage.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                cursor={{ fill: 'hsl(var(--muted))' }}
                content={<ChartTooltipContent />}
              />
              <Bar dataKey="attendance" fill="var(--color-attendance)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
