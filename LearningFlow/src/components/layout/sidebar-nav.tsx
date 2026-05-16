
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar'
import {
  LayoutDashboard,
  BookOpen,
  Calculator,
  Sparkles,
  GraduationCap,
  LogOut,
  Upload,
  BarChart2,
  Users,
  Activity,
  Settings,
  UserCheck,
  FileText
} from 'lucide-react'
import { Button } from '../ui/button'
import { useAuth } from '@/contexts/AuthContext'

const studentMenuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/courses', label: 'Courses', icon: BookOpen },
  { href: '/assignments', label: 'Assignments', icon: FileText },
  { href: '/attendance', label: 'Attendance', icon: UserCheck },
  { href: '/cgpa-calculator', label: 'CGPA Calculator', icon: Calculator },
  { href: '/resource-recommendation', label: 'AI Resources', icon: Sparkles },
]

const teacherMenuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/courses', label: 'My Courses', icon: BookOpen },
  { href: '/teacher/materials', label: 'Upload Content', icon: Upload },
  { href: '/attendance', label: 'Mark Attendance', icon: UserCheck },
  { href: '/teacher/performance', label: 'Student Performance', icon: BarChart2 },
]

const adminMenuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Manage Users', icon: Users },
  { href: '/admin/activity', label: 'Platform Activity', icon: Activity },
  { href: '/courses', label: 'Manage Courses', icon: Settings },
]


export function SidebarNav() {
  const pathname = usePathname()
  const { role, logout } = useAuth()

  let menuItems = studentMenuItems;
  if (role === 'teacher') menuItems = teacherMenuItems;
  if (role === 'admin') menuItems = adminMenuItems;


  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
          <span className="font-headline text-xl font-semibold">LearningFlow</span>
        </div>
      </SidebarHeader>
      <SidebarMenu className="flex-1">
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href} legacyBehavior passHref>
              <SidebarMenuButton
                isActive={pathname.startsWith(item.href) && (item.href !== '/dashboard' || pathname === '/dashboard')}
                tooltip={item.label}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <SidebarFooter>
          <Button onClick={logout} variant="ghost" className="w-full justify-start">
              <LogOut />
              <span>Logout</span>
          </Button>
      </SidebarFooter>
    </>
  )
}
