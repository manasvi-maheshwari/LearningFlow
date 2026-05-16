'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { ArrowRight, PlusCircle, Trash2, Settings } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

// --- Mock Data ---
const enrolledCourses = [
  {
    id: 'CS101',
    title: 'Introduction to Python Programming',
    description: 'Master the fundamentals of Python, one of the most popular programming languages in the world.',
    instructor: 'Dr. Alan Turing',
    category: 'Programming',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'programming code',
  },
  {
    id: 'DS202',
    title: 'Data Structures and Algorithms',
    description: 'Learn core data structures and algorithms to write efficient and scalable code.',
    instructor: 'Dr. Ada Lovelace',
    category: 'Computer Science',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'data network',
  },
  {
    id: 'AI301',
    title: 'Artificial Intelligence Fundamentals',
    description: 'Explore the exciting world of AI, including machine learning, neural networks, and more.',
    instructor: 'Dr. John McCarthy',
    category: 'AI/ML',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'artificial intelligence',
  },
  {
    id: 'WD404',
    title: 'Modern Web Development',
    description: 'Build responsive and interactive web applications with the latest technologies like React and Next.js.',
    instructor: 'Dr. Tim Berners-Lee',
    category: 'Web Development',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'web design',
  },
  {
    id: 'DB501',
    title: 'Database Management Systems',
    description: 'Understand the principles of database design, querying with SQL, and data management.',
    instructor: 'Dr. Edgar Codd',
    category: 'Databases',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'database server',
  }
];

const availableCourses = [
    {
        id: 'CC601',
        title: 'Cloud Computing Essentials',
        description: 'Learn the fundamentals of cloud computing, including services from AWS, Azure, and Google Cloud.',
        instructor: 'Dr. Vint Cerf',
        category: 'Cloud',
        image: 'https://placehold.co/600x400.png',
        aiHint: 'cloud servers',
    },
    {
        id: 'CS701',
        title: 'Cybersecurity Basics',
        description: 'An introduction to the world of cybersecurity, covering common threats and defense mechanisms.',
        instructor: 'Dr. Kevin Mitnick',
        category: 'Security',
        image: 'https://placehold.co/600x400.png',
        aiHint: 'cyber security',
    },
    {
        id: 'UX801',
        title: 'UI/UX Design Principles',
        description: 'Master the principles of user interface and user experience design to create intuitive products.',
        instructor: 'Dr. Don Norman',
        category: 'Design',
        image: 'https://placehold.co/600x400.png',
        aiHint: 'ui design',
    },
];

const allCourses = [...enrolledCourses, ...availableCourses];

// --- Admin View ---
function AdminCoursesView() {
  return (
    <div className="p-4 md:p-8 animate-fade-in-up">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div className="flex items-center gap-3">
            <Settings className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="font-headline text-2xl">Manage Courses</CardTitle>
              <CardDescription>
                Add, remove, and update courses on the platform.
              </CardDescription>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Course</DialogTitle>
                <DialogDescription>Fill in the details to create a new course.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">Title</Label>
                  <Input id="title" placeholder="e.g., Quantum Computing" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="instructor" className="text-right">Instructor</Label>
                  <Input id="instructor" placeholder="e.g., Dr. Richard Feynman" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">Category</Label>
                  <Input id="category" placeholder="e.g., Physics" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right pt-2">Description</Label>
                  <Textarea id="description" placeholder="A brief description of the course." className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Course</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course ID</TableHead>
                <TableHead>Course Title</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.id}</TableCell>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell><Badge variant="secondary">{course.category}</Badge></TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="mr-2 h-4 w-4" /> Remove
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently remove the course from the platform.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// --- Student & Teacher View ---
export default function CoursesPage() {
  const { role } = useAuth();

  if (role === 'admin') {
    return <AdminCoursesView />;
  }

  return (
    <div className="p-4 md:p-8 animate-fade-in-up space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-6 font-headline">
          {role === 'teacher' ? 'Your Courses' : 'Enrolled Courses'}
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {enrolledCourses.map((course) => (
            <Link href={`/courses/${course.id}`} key={course.id} className="group">
              <Card className="flex flex-col h-full">
                <CardHeader className="p-0">
                    <div className="relative h-48 w-full">
                        <Image src={course.image} alt={course.title} layout="fill" objectFit="cover" className="rounded-t-lg" data-ai-hint={course.aiHint} />
                        <div className="absolute bottom-2 right-2 flex items-center gap-2 p-2 bg-background/80 backdrop-blur-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span>View Resources</span>
                            <ArrowRight className="h-4 w-4" />
                        </div>
                    </div>
                  <div className="p-6">
                    <Badge variant="secondary" className="mb-2">{course.category}</Badge>
                    <CardTitle className="font-headline">{course.title}</CardTitle>
                    <CardDescription className="mt-2 h-16 overflow-hidden">{course.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-sm text-muted-foreground">
                    <p><span className="font-semibold">Instructor:</span> {course.instructor}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {role === 'student' && (
        <div>
          <h1 className="text-3xl font-bold mb-6 font-headline">Available Courses</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {availableCourses.map((course) => (
              <Card key={course.id} className="flex flex-col">
                <CardHeader className="p-0">
                    <div className="relative h-48 w-full">
                        <Image src={course.image} alt={course.title} layout="fill" objectFit="cover" className="rounded-t-lg" data-ai-hint={course.aiHint} />
                    </div>
                  <div className="p-6">
                    <Badge variant="secondary" className="mb-2">{course.category}</Badge>
                    <CardTitle className="font-headline">{course.title}</CardTitle>
                    <CardDescription className="mt-2 h-16 overflow-hidden">{course.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-sm text-muted-foreground">
                    <p><span className="font-semibold">Instructor:</span> {course.instructor}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full">Enroll Now</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="font-headline text-2xl">Enrollment Status</DialogTitle>
                        <DialogDescription className="pt-4 text-base">
                          Maybe in the next semester, Champ!
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
