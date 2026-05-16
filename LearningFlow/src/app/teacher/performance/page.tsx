'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { BarChart2, CheckCircle, Percent, BookOpen } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

// Mock Data
const performanceData = {
  'CS101': {
    courseName: 'Introduction to Python Programming',
    students: [
      {
        id: 'STU-001',
        name: 'Aarav Sharma',
        overallGrade: 'A',
        attendance: 95,
        assignmentsSubmitted: 5,
        assignmentsPending: 0,
        recentTestMarks: 88,
      },
      {
        id: 'STU-002',
        name: 'Diya Patel',
        overallGrade: 'B+',
        attendance: 89,
        assignmentsSubmitted: 4,
        assignmentsPending: 1,
        recentTestMarks: 76,
      },
    ],
  },
  'DS202': {
    courseName: 'Data Structures and Algorithms',
    students: [
      {
        id: 'STU-003',
        name: 'Rohan Mehta',
        overallGrade: 'A-',
        attendance: 92,
        assignmentsSubmitted: 3,
        assignmentsPending: 0,
        recentTestMarks: 91,
      },
      {
        id: 'STU-004',
        name: 'Priya Singh',
        overallGrade: 'C',
        attendance: 75,
        assignmentsSubmitted: 2,
        assignmentsPending: 1,
        recentTestMarks: 65,
      },
    ],
  },
  'AI301': {
    courseName: 'Artificial Intelligence Fundamentals',
    students: [
       {
        id: 'STU-005',
        name: 'Vihaan Kumar',
        overallGrade: 'A',
        attendance: 98,
        assignmentsSubmitted: 2,
        assignmentsPending: 0,
        recentTestMarks: 94,
      },
    ]
  }
};

type StudentPerformanceData = typeof performanceData.CS101.students[0];
type StudentPerformance = StudentPerformanceData & { courseName: string };

export default function TeacherPerformancePage() {
  const [selectedStudent, setSelectedStudent] = useState<StudentPerformance | null>(null)

  const handleSelectStudent = (student: StudentPerformanceData, courseName: string) => {
    setSelectedStudent({ ...student, courseName });
  }

  return (
    <div className="p-4 md:p-8 animate-fade-in-up bg-muted/40 min-h-full">
      <Card className="bg-background/80 backdrop-blur-sm border-none shadow-none hover:shadow-none hover:-translate-y-0">
        <CardHeader>
          <div className="flex items-center gap-3">
            <BarChart2 className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="font-headline text-3xl">
                Student Performance Analytics
              </CardTitle>
              <CardDescription className="text-base">
                An elegant overview of academic progress.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Sheet onOpenChange={(open) => !open && setSelectedStudent(null)}>
            <Accordion type="single" collapsible className="w-full">
              {Object.entries(performanceData).map(([courseId, data]) => (
                <AccordionItem value={courseId} key={courseId} className="border-border/50">
                  <AccordionTrigger className="text-xl font-headline py-4 hover:no-underline">
                    {data.courseName}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="overflow-hidden rounded-lg border">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50">
                            <TableHead>Student Name</TableHead>
                            <TableHead>Student ID</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {data.students.map((student) => (
                            <TableRow key={student.id}>
                              <TableCell className="font-medium">{student.name}</TableCell>
                              <TableCell>{student.id}</TableCell>
                              <TableCell className="text-right">
                                <SheetTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleSelectStudent(student, data.courseName)}
                                  >
                                    Check Performance
                                  </Button>
                                </SheetTrigger>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            {selectedStudent && (
              <SheetContent className="w-[400px] sm:w-[540px] p-0">
                <SheetHeader className="bg-accent p-6 text-left">
                  <SheetTitle className="font-headline text-2xl">{selectedStudent.name}</SheetTitle>
                  <SheetDescription>
                    Performance overview for {selectedStudent.courseName}.
                  </SheetDescription>
                </SheetHeader>
                <div className="p-6 grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg font-headline">
                        <BookOpen className="h-5 w-5 text-primary" />
                        Assignments
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="text-3xl font-bold">{selectedStudent.assignmentsSubmitted}</p>
                            <p className="text-sm text-muted-foreground">Submitted</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="text-3xl font-bold text-destructive">{selectedStudent.assignmentsPending}</p>
                            <p className="text-sm text-muted-foreground">Pending</p>
                        </div>
                    </CardContent>
                  </Card>
                   <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg font-headline">
                        <Percent className="h-5 w-5 text-primary" />
                        Attendance
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex justify-between text-muted-foreground">
                            <span>Overall Attendance</span>
                            <span className="font-bold text-foreground">{selectedStudent.attendance}%</span>
                        </div>
                        <Progress value={selectedStudent.attendance} />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg font-headline">
                            <CheckCircle className="h-5 w-5 text-primary" />
                            Academic Grades
                        </CardTitle>
                    </CardHeader>
                     <CardContent className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="text-3xl font-bold">{selectedStudent.overallGrade}</p>
                            <p className="text-sm text-muted-foreground">Overall Grade</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="text-3xl font-bold">{selectedStudent.recentTestMarks}</p>
                            <p className="text-sm text-muted-foreground">Recent Test %</p>
                        </div>
                    </CardContent>
                  </Card>
                </div>
              </SheetContent>
            )}
          </Sheet>
        </CardContent>
      </Card>
    </div>
  )
}
