'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GraduationCap } from "lucide-react";
import { useAuth, type Role } from '@/contexts/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const [role, setRole] = useState<Role>('student');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role) {
      login(role);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--primary)/0.2),rgba(255,255,255,0))]"></div>
      
      <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-block p-6 bg-primary/10 rounded-full animate-float">
            <GraduationCap className="h-24 w-24 md:h-32 md:w-32 text-primary animate-glow" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-headline mt-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            LearningFlow
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">Your Modern Learning Management System</p>
      </div>

      <Card className="w-full max-w-sm animate-fade-in-up" style={{animationDelay: '0.3s'}}>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select defaultValue="student" onValueChange={(value) => setRole(value as Role)}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full mt-2">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
