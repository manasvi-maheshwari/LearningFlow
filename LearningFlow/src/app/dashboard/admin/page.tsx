import Link from 'next/link';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, Settings } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 animate-fade-in-up">
      <h2 className="text-3xl font-bold tracking-tight font-headline">Admin Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin/users">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><Users className="w-5 h-5" /> Manage Users</CardTitle>
              <CardDescription>Add, remove, or update student and teacher accounts.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/admin/activity">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><Activity className="w-5 h-5" /> Platform Activity</CardTitle>
              <CardDescription>View overall platform usage and analytics.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/courses">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><Settings className="w-5 h-5" /> Manage Courses</CardTitle>
              <CardDescription>Configure courses, semesters, and other platform settings.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
      <Card className="hover:shadow-none hover:-translate-y-0 cursor-default">
        <CardHeader>
          <CardTitle>Welcome, Admin!</CardTitle>
          <CardDescription>You have full access to oversee and manage the LearningFlow platform.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
