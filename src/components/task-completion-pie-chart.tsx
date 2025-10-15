"use client"

import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartTooltipContent, ChartContainer, type ChartConfig, ChartLegend, ChartLegendContent } from "@/components/ui/chart"

type TaskCompletionPieChartProps = {
  data: { status: string; count: number; fill: string }[]
}

const chartConfig = {
  count: {
    label: "Count",
  },
  "On Track": {
    label: "On Track",
    color: "hsl(var(--chart-1))",
  },
  "Excelling": {
    label: "Excelling",
    color: "hsl(var(--chart-2))",
  },
  "Behind": {
    label: "Behind",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function TaskCompletionPieChart({ data }: TaskCompletionPieChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Completion</CardTitle>
        <CardDescription>Distribution of employee task rates.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <PieChart>
            <Tooltip
              content={<ChartTooltipContent nameKey="count" hideLabel />}
            />
            <Pie data={data} dataKey="count" nameKey="status" innerRadius={60} strokeWidth={5} />
            <ChartLegend
              content={<ChartLegendContent nameKey="status" />}
              className="-translate-y-[2rem] flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
