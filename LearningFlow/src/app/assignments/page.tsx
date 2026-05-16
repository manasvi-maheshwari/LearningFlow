'use client'

import { useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

const todoAssignments = [
  { id: 'ASG-001', course: 'Data Structures and Algorithms', title: 'Implement a Binary Search Tree', dueDate: '2024-08-15' },
  { id: 'ASG-002', course: 'Artificial Intelligence Fundamentals', title: 'AI Project Proposal', dueDate: '2024-08-18' },
  { id: 'ASG-003', course: 'Modern Web Development', title: 'Build a Responsive Portfolio Site', dueDate: '2024-08-22' },
];

const completedAssignments = [
  { id: 'ASG-004', course: 'Introduction to Python Programming', title: 'Python Basics Quiz', submittedOn: '2024-07-25', status: 'Graded', grade: 'A' },
  { id: 'ASG-005', course: 'Data Structures and Algorithms', title: 'Linked List Operations', submittedOn: '2024-07-30', status: 'Graded', grade: 'B+' },
  { id: 'ASG-006', course: 'Modern Web Development', title: 'HTML & CSS Challenge', submittedOn: '2024-08-01', status: 'Pending' },
];

export default function AssignmentsPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "File Selected",
        description: `${file.name} is ready for submission.`,
      });
      // Here you would typically handle the file upload process
    }
  };

  const handleSubmissionClick = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <div className="p-4 md:p-8 animate-fade-in-up">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
      />
      <Card>
        <CardHeader>
            <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                    <CardTitle className="font-headline text-2xl">Assignments</CardTitle>
                    <CardDescription>
                        View and manage your assignments.
                    </CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="todo">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="todo">To Do</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="todo" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {todoAssignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell className="font-medium">{assignment.course}</TableCell>
                      <TableCell>{assignment.title}</TableCell>
                      <TableCell>{assignment.dueDate}</TableCell>
                      <TableCell className="text-right">
                        <Button onClick={handleSubmissionClick}>
                          <Upload className="mr-2 h-4 w-4" />
                          Submit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="completed" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Submitted On</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedAssignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell className="font-medium">{assignment.course}</TableCell>
                      <TableCell>{assignment.title}</TableCell>
                      <TableCell>{assignment.submittedOn}</TableCell>
                      <TableCell>
                        <Badge variant={assignment.status === 'Graded' ? 'default' : 'secondary'}>
                          {assignment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">{assignment.grade || 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
