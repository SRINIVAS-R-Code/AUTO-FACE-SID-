"use client"

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"

const chartData = [
  { department: "Engineering", attendance: 98, productivity: 95, satisfaction: 85 },
  { department: "Marketing", attendance: 95, productivity: 92, satisfaction: 90 },
  { department: "Sales", attendance: 93, productivity: 98, satisfaction: 88 },
  { department: "HR", attendance: 99, productivity: 91, satisfaction: 92 },
  { department: "Support", attendance: 96, productivity: 89, satisfaction: 87 },
]

const chartConfig = {
  attendance: {
    label: "Attendance",
    color: "hsl(var(--chart-1))",
  },
  productivity: {
    label: "Productivity",
    color: "hsl(var(--chart-2))",
  },
  satisfaction: {
    label: "Satisfaction",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function DepartmentPerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Department Performance</CardTitle>
        <CardDescription>
          Comparing key metrics across departments.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="department" />
              <PolarRadiusAxis angle={30} domain={[80, 100]} />
              <Radar
                name="Attendance"
                dataKey="attendance"
                stroke="var(--color-attendance)"
                fill="var(--color-attendance)"
                fillOpacity={0.6}
              />
              <Radar
                name="Productivity"
                dataKey="productivity"
                stroke="var(--color-productivity)"
                fill="var(--color-productivity)"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
