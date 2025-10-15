
"use client"

import { Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartTooltipContent, ChartContainer, type ChartConfig, ChartLegend, ChartLegendContent } from "@/components/ui/chart"

type EmployeeTaskCompletionChartProps = {
  data: { status: string; tasks: number; fill: string }[]
}

const chartConfig = {
  tasks: {
    label: "Tasks",
  },
  "Completed": {
    label: "Completed",
    color: "hsl(var(--chart-1))",
  },
  "Pending": {
    label: "Pending",
    color: "hsl(var(--chart-3))",
  },
  "Overdue": {
    label: "Overdue",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function EmployeeTaskCompletionChart({ data }: EmployeeTaskCompletionChartProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Task Status</CardTitle>
        <CardDescription>Distribution of assigned tasks.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <PieChart>
            <ChartTooltipContent
              nameKey="tasks"
              content={<ChartTooltipContent nameKey="tasks" hideLabel />}
            />
            <Pie data={data} dataKey="tasks" nameKey="status" innerRadius={50} strokeWidth={5} />
            <ChartLegend
              content={<ChartLegendContent nameKey="status" />}
              className="-translate-y-[1rem] flex-wrap gap-2 [&>*]:basis-1/3 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
