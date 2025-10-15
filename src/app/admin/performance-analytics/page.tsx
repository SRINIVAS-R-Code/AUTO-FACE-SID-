
import Link from "next/link";
import { EmployeePerformanceCard } from "@/components/employee-performance-card";
import { employeeData } from "@/lib/data";

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
      
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {performanceData.map((employee) => (
          <Link href={`/admin/performance-analytics/${employee.id}`} key={employee.id}>
            <EmployeePerformanceCard employee={employee} />
          </Link>
        ))}
      </div>
    </div>
  );
}
