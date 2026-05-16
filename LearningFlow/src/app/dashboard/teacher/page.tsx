'use client'

import Link from 'next/link'
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, UserCheck, BarChart2 } from "lucide-react";

export default function TeacherDashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 animate-fade-in-up">
      <h2 className="text-3xl font-bold tracking-tight font-headline">Teacher Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/courses">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><BookOpen className="w-5 h-5" /> Manage Courses</CardTitle>
              <CardDescription>Upload materials, create assignments, and post announcements.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/attendance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><UserCheck className="w-5 h-5" /> Mark Attendance</CardTitle>
              <CardDescription>Monitor and record student attendance for your classes.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/teacher/performance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><BarChart2 className="w-5 h-5" /> Student Performance</CardTitle>
              <CardDescription>View analytics on student grades and progress.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
      <Link href="/profile">
        <Card>
          <CardHeader>
            <CardTitle>Welcome, Teacher!</CardTitle>
            <CardDescription>Here you can manage your courses, attendance, and student performance.</CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </div>
  );
}
