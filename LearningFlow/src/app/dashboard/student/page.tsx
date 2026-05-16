
"use client"
import Link from 'next/link';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { BookOpen, CheckCircle, Percent, Star, FileText } from 'lucide-react'

const chartData = [
  { month: 'Jan', progress: 65 },
  { month: 'Feb', progress: 70 },
  { month: 'Mar', progress: 72 },
  { month: 'Apr', progress: 78 },
  { month: 'May', progress: 85 },
  { month: 'Jun', progress: 92 },
]

export default function StudentDashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 animate-fade-in-up">
      <h2 className="text-3xl font-bold tracking-tight font-headline">Student Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/courses">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">in current semester</p>
              </CardContent>
            </Card>
        </Link>
        <Link href="/assignments">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Assignments Done</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12 / 15</div>
                <p className="text-xs text-muted-foreground">+2 from last week</p>
              </CardContent>
            </Card>
        </Link>
        <Link href="/attendance">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                <Percent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">Maintained above 85%</p>
              </CardContent>
            </Card>
        </Link>
        <Link href="/cgpa-calculator">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current CGPA</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.75</div>
                <p className="text-xs text-muted-foreground">Target: 9.0</p>
              </CardContent>
            </Card>
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="font-headline">Academic Progress Overview</CardTitle>
            <CardDescription>Your progress over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                <Tooltip
                  cursor={{fill: 'hsl(var(--primary) / 0.1)'}}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background) / 0.8)',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                  }}
                />
                <Legend />
                <Bar dataKey="progress" fill="url(#colorProgress)" name="Progress" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
             <svg width="0" height="0">
              <defs>
                <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
            </svg>
          </CardContent>
        </Card>
        <Card className="col-span-4 md:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">Recent Activity</CardTitle>
            <CardDescription>
              You have 3 pending assignments this week.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Data Structures Mid-term</p>
                  <p className="text-sm text-muted-foreground">Due: Tomorrow, 11:59 PM</p>
                </div>
                <div className="ml-auto font-medium text-destructive">High Priority</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">AI Project Proposal</p>
                  <p className="text-sm text-muted-foreground">Due: In 3 days</p>
                </div>
                <div className="ml-auto font-medium">Medium Priority</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Calculus Weekly Quiz</p>
                  <p className="text-sm text-muted-foreground">Due: In 5 days</p>
                </div>
                <div className="ml-auto font-medium text-green-400">Low Priority</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
