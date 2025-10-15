
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { employeeData } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Circle } from "lucide-react";

export default function EmployeeDirectoryPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Employee Management</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {employeeData.map((employee) => (
          <Card key={employee.id} className="bg-card/80 hover:bg-card/95 transition-colors">
            <CardHeader>
              <CardTitle>{employee.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <span className="font-semibold text-muted-foreground">Position: </span>
                <span>{employee.position}</span>
              </div>
              <div>
                <span className="font-semibold text-muted-foreground">Department: </span>
                <span>{employee.department}</span>
              </div>
              <div>
                <span className="font-semibold text-muted-foreground">Employee ID: </span>
                <span>{employee.id.toUpperCase()}</span>
              </div>
               <div>
                <span className="font-semibold text-muted-foreground">Status: </span>
                <Badge variant="outline" className="border-green-500/50 bg-green-500/10 text-green-400">
                    <Circle className="mr-1 h-2 w-2 fill-current" />
                    Active
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
