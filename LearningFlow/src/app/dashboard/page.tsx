'use client';
import { useAuth } from "@/contexts/AuthContext";
import StudentDashboard from "./student/page";
import TeacherDashboard from "./teacher/page";
import AdminDashboard from "./admin/page";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
    const { role } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!role) {
            router.push('/');
        }
    }, [role, router]);

    if (!role) {
        return (
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                <Skeleton className="h-8 w-1/4 rounded-lg" />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Skeleton className="h-28 rounded-xl" />
                    <Skeleton className="h-28 rounded-xl" />
                    <Skeleton className="h-28 rounded-xl" />
                    <Skeleton className="h-28 rounded-xl" />
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Skeleton className="col-span-4 h-80 rounded-xl" />
                    <Skeleton className="col-span-3 h-80 rounded-xl" />
                </div>
            </div>
        );
    }
    
    switch (role) {
        case 'student':
            return <StudentDashboard />;
        case 'teacher':
            return <TeacherDashboard />;
        case 'admin':
            return <AdminDashboard />;
        default:
            return null;
    }
}
