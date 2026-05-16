
'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { UserPlus } from 'lucide-react'

const courses = [
  { id: 'CS101', name: 'Introduction to Python Programming' },
  { id: 'DS202', name: 'Data Structures and Algorithms' },
  { id: 'AI301', name: 'Artificial Intelligence Fundamentals' },
  { id: 'WD404', name: 'Modern Web Development' },
];

const teacherAttendanceData: { [key: string]: { id: string; name: string; status: string }[] } = {
  'CS101': [
    { id: 'STU-001', name: 'Aarav Sharma', status: 'Present' },
    { id: 'STU-002', name: 'Diya Patel', status: 'Present' },
    { id: 'STU-003', name: 'Rohan Mehta', status: 'Absent' },
    { id: 'STU-004', name: 'Priya Singh', status: 'Present' },
  ],
  'DS202': [
    { id: 'STU-001', name: 'Aarav Sharma', status: 'Absent' },
    { id: 'STU-002', name: 'Diya Patel', status: 'Present' },
    { id: 'STU-003', name: 'Rohan Mehta', status: 'Present' },
    { id: 'STU-004', name: 'Priya Singh', status: 'Late' },
  ],
  'AI301': [
    { id: 'STU-005', name: 'Vihaan Kumar', status: 'Present' },
    { id: 'STU-006', name: 'Ananya Reddy', status: 'Present' },
    { id: 'STU-007', name: 'Ishaan Gupta', status: 'Present' },
  ],
  'WD404': [
    { id: 'STU-008', name: 'Saanvi Desai', status: 'Absent' },
    { id: 'STU-009', name: 'Advik Joshi', status: 'Late' },
    { id: 'STU-010', name: 'Zara Khan', status: 'Present' },
  ],
};

const studentAttendanceData: { [key: string]: { date: string; status: string }[] } = {
  'CS101': [
    { date: '2024-07-29', status: 'Present' },
    { date: '2024-07-27', status: 'Present' },
    { date: '2024-07-25', status: 'Late' },
    { date: '2024-07-22', status: 'Present' },
  ],
  'DS202': [
    { date: '2024-07-28', status: 'Absent' },
    { date: '2024-07-26', status: 'Present' },
    { date: '2024-07-24', status: 'Present' },
    { date: '2024-07-21', status: 'Present' },
  ],
  'AI301': [
      { date: '2024-07-29', status: 'Present' },
      { date: '2024-07-25', status: 'Present' },
  ],
  'WD404': [
      { date: '2024-07-28', status: 'Present' },
      { date: '2024-07-26', status: 'Late' },
  ],
};

const getStatusBadgeVariant = (status: string) => {
    switch(status) {
        case 'Present': return 'default';
        case 'Late': return 'secondary';
        case 'Absent': return 'destructive';
        default: return 'outline';
    }
}

export default function AttendancePage() {
  const { role } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState(courses[0].id);
  const selectedCourseName = courses.find(c => c.id === selectedCourse)?.name || '';

  return (
    <div className="p-4 md:p-8 animate-fade-in-up">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <CardTitle className="font-headline text-2xl">Attendance</CardTitle>
              <CardDescription>
                {role === 'teacher' ? `Mark attendance for ${selectedCourseName}` : `View your attendance for ${selectedCourseName}`}. Date: {new Date().toLocaleDateString()}
              </CardDescription>
              <div className="mt-4 w-full md:max-w-xs">
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map(course => (
                      <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {role === 'teacher' && (
              <div className="flex items-center gap-2 mt-4 md:mt-0">
                  <Button variant="outline">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add Student
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Save Attendance</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="font-headline text-2xl">Success!</DialogTitle>
                        <DialogDescription className="pt-4 text-base">
                          The attendance has been saved.
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {role === 'teacher' && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead className="w-[150px]">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(teacherAttendanceData[selectedCourse] || []).map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>
                      <Select defaultValue={student.status}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Present">Present</SelectItem>
                          <SelectItem value="Absent">Absent</SelectItem>
                          <SelectItem value="Late">Late</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {role === 'student' && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(studentAttendanceData[selectedCourse] || []).map((record, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{record.date}</TableCell>
                    <TableCell>
                        <Badge variant={getStatusBadgeVariant(record.status)}>{record.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

