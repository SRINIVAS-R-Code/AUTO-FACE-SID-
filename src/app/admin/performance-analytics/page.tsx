
import { EmployeePerformanceCard } from "@/components/employee-performance-card";
import { employeeData, teamProductivityData, productivityTrendData, taskCompletionData } from "@/lib/data";
import { TeamProductivityChart } from "@/components/team-productivity-chart";
import { ProductivityTrendChart } from "@/components/productivity-trend-chart";
import { TaskCompletionPieChart } from "@/components/task-completion-pie-chart";

const performanceData = employeeData.map(employee => ({
  ...employee,
  performance: {
    productivity: Math.floor(Math.random() * 21) + 80, // 80-100%
    taskCompletion: Math.floor(Math.random() * 21) + 75, // 75-95%
  }
}));

export default function PerformanceAnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Employee Performance Analytics</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <TeamProductivityChart data={teamProductivityData} />
        <ProductivityTrendChart data={productivityTrendData} />
        <TaskCompletionPieChart data={taskCompletionData} />
      </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {performanceData.map((employee) => (
            <EmployeePerformanceCard key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  );
}
