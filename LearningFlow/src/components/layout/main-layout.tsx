'use client'

import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar'
import { SidebarNav } from './sidebar-nav'
import { Header } from './header'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useEffect } from 'react'

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { role } = useAuth()

  const isPublicPage = pathname === '/'

  useEffect(() => {
    if (!role && !isPublicPage) {
      router.push('/')
    }
  }, [role, isPublicPage, router])

  if (isPublicPage) {
    return <>{children}</>
  }
  
  if (!role) {
    // You can add a loading skeleton here
    return (
        <div className="flex items-center justify-center h-screen bg-background">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        </div>
    )
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarNav />
      </Sidebar>
      <div className="flex flex-col w-full">
        <Header />
        <SidebarInset>
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
