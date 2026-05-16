
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, BookOpen, Calendar, Briefcase, Building } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

// --- Data ---
const studentData = {
    name: 'Aarav Sharma',
    regNo: 'STU-001',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    address: '123, Learning Lane, Knowledge City, India',
    age: 20,
    avatarUrl: 'https://placehold.co/128x128.png?text=AS',
    avatarFallback: 'AS',
    courses: [
        'Introduction to Python Programming',
        'Data Structures and Algorithms',
        'Artificial Intelligence Fundamentals',
        'Modern Web Development',
        'Database Management Systems'
    ],
};

const teacherData = {
    name: 'Dr. Manasvi Maheshwari',
    regNo: 'EMP-002',
    email: 'manasvimaheshwari30@gmail.com',
    phone: '+91 6375836720',
    address: 'VIT Bhopal, India',
    department: 'Computer Science Department',
    avatarUrl: 'https://placehold.co/128x128.png?text=MM',
    avatarFallback: 'MM',
    courses: [
        'Data Structures and Algorithms',
        'Artificial Intelligence Fundamentals',
        'Modern Web Development',
    ],
};

const adminData = {
    name: 'Platform Administrator',
    regNo: 'ADM-001',
    email: 'admin@learningflow.edu',
    phone: '+1 415-555-0132',
    address: '789, Control Tower, System City, USA',
    role_desc: 'Full administrative access',
    avatarUrl: 'https://placehold.co/128x128.png?text=AD',
    avatarFallback: 'AD',
};


export default function ProfilePage() {
    const { role } = useAuth();

    if (!role) {
        return (
            <div className="p-4 md:p-8 animate-fade-in-up">
                <Card>
                    <CardHeader className="flex flex-col md:flex-row items-center gap-6 space-y-0">
                        <Skeleton className="h-32 w-32 rounded-full" />
                        <div className="space-y-2">
                           <Skeleton className="h-8 w-48" />
                           <Skeleton className="h-6 w-32" />
                        </div>
                    </CardHeader>
                    <CardContent className="mt-6">
                        <Skeleton className="h-64 w-full rounded-lg" />
                    </CardContent>
                </Card>
            </div>
        );
    }
    
    if (role === 'student') {
        const profileData = studentData;
        return (
            <div className="p-4 md:p-8 animate-fade-in-up">
                <Card>
                    <CardHeader className="flex flex-col md:flex-row items-center gap-6 space-y-0">
                        <Avatar className="h-32 w-32 border-4 border-primary">
                            <AvatarImage src={profileData.avatarUrl} alt={profileData.name} data-ai-hint="user avatar" />
                            <AvatarFallback className="text-4xl">{profileData.avatarFallback}</AvatarFallback>
                        </Avatar>
                        <div className="text-center md:text-left">
                            <CardTitle className="font-headline text-3xl">{profileData.name}</CardTitle>
                            <CardDescription className="text-lg text-muted-foreground">
                                Registration No: {profileData.regNo}
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="mt-6 grid gap-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-xl font-headline">
                                        <User className="h-5 w-5 text-primary" />
                                        Personal Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 text-muted-foreground">
                                    <p className="flex items-center gap-3"><Mail className="h-4 w-4" /> <span>{profileData.email}</span></p>
                                    <p className="flex items-center gap-3"><Phone className="h-4 w-4" /> <span>{profileData.phone}</span></p>
                                    <p className="flex items-center gap-3"><Calendar className="h-4 w-4" /> <span>{profileData.age} years old</span></p>
                                    <p className="flex items-center gap-3"><MapPin className="h-4 w-4" /> <span>{profileData.address}</span></p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-xl font-headline">
                                        <BookOpen className="h-5 w-5 text-primary" />
                                        Enrolled Courses
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-wrap gap-2">
                                    {profileData.courses.map((course, index) => (
                                        <Badge key={index} variant="secondary">{course}</Badge>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }
    
    if (role === 'teacher') {
        const profileData = teacherData;
        return (
            <div className="p-4 md:p-8 animate-fade-in-up">
                <Card>
                    <CardHeader className="flex flex-col md:flex-row items-center gap-6 space-y-0">
                        <Avatar className="h-32 w-32 border-4 border-primary">
                            <AvatarImage src={profileData.avatarUrl} alt={profileData.name} data-ai-hint="user avatar" />
                            <AvatarFallback className="text-4xl">{profileData.avatarFallback}</AvatarFallback>
                        </Avatar>
                        <div className="text-center md:text-left">
                            <CardTitle className="font-headline text-3xl">{profileData.name}</CardTitle>
                            <CardDescription className="text-lg text-muted-foreground">
                                Employee ID: {profileData.regNo}
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="mt-6 grid gap-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-xl font-headline">
                                        <User className="h-5 w-5 text-primary" />
                                        Personal Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 text-muted-foreground">
                                    <p className="flex items-center gap-3"><Mail className="h-4 w-4" /> <span>{profileData.email}</span></p>
                                    <p className="flex items-center gap-3"><Phone className="h-4 w-4" /> <span>{profileData.phone}</span></p>
                                    <p className="flex items-center gap-3"><Building className="h-4 w-4" /> <span>{profileData.department}</span></p>
                                    <p className="flex items-center gap-3"><MapPin className="h-4 w-4" /> <span>{profileData.address}</span></p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-xl font-headline">
                                        <BookOpen className="h-5 w-5 text-primary" />
                                        Taught Courses
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-wrap gap-2">
                                    {profileData.courses.map((course, index) => (
                                        <Badge key={index} variant="secondary">{course}</Badge>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }
    
    if (role === 'admin') {
        const profileData = adminData;
        return (
            <div className="p-4 md:p-8 animate-fade-in-up">
                 <Card>
                    <CardHeader className="flex flex-col md:flex-row items-center gap-6 space-y-0">
                        <Avatar className="h-32 w-32 border-4 border-primary">
                            <AvatarImage src={profileData.avatarUrl} alt={profileData.name} data-ai-hint="user avatar" />
                            <AvatarFallback className="text-4xl">{profileData.avatarFallback}</AvatarFallback>
                        </Avatar>
                        <div className="text-center md:text-left">
                            <CardTitle className="font-headline text-3xl">{profileData.name}</CardTitle>
                            <CardDescription className="text-lg text-muted-foreground">
                                Admin ID: {profileData.regNo}
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="mt-6 grid gap-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-xl font-headline">
                                        <User className="h-5 w-5 text-primary" />
                                        Personal Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 text-muted-foreground">
                                    <p className="flex items-center gap-3"><Mail className="h-4 w-4" /> <span>{profileData.email}</span></p>
                                    <p className="flex items-center gap-3"><Phone className="h-4 w-4" /> <span>{profileData.phone}</span></p>
                                    <p className="flex items-center gap-3"><MapPin className="h-4 w-4" /> <span>{profileData.address}</span></p>
                                </CardContent>
                            </Card>
                            <Card>
                               <CardHeader>
                                   <CardTitle className="flex items-center gap-2 text-xl font-headline">
                                       <Briefcase className="h-5 w-5 text-primary" />
                                       Admin Role
                                   </CardTitle>
                               </CardHeader>
                               <CardContent>
                                   <p className="text-muted-foreground">{profileData.role_desc}</p>
                               </CardContent>
                           </Card>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }
    
    return null;
}
