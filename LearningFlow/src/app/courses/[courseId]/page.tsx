import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, FileText, Video } from "lucide-react";

// Mock data, in a real app this would be fetched from a database
const allCourses = [
  {
    id: 'CS101',
    title: 'Introduction to Python Programming',
    resources: [
      { type: 'video', title: 'Week 1: Introduction to Python', url: '#' },
      { type: 'pdf', title: 'Syllabus for CS101', url: '#' },
      { type: 'video', title: 'Week 2: Variables and Data Types', url: '#' },
    ]
  },
  {
    id: 'DS202',
    title: 'Data Structures and Algorithms',
    resources: [
        { type: 'pdf', title: 'Course Overview & Syllabus', url: '#' },
        { type: 'video', title: 'Lecture 1: Big O Notation', url: '#' },
        { type: 'pdf', title: 'Reading: Asymptotic Analysis', url: '#' },
    ]
  },
  {
    id: 'AI301',
    title: 'Artificial Intelligence Fundamentals',
     resources: [
        { type: 'video', title: 'Introduction to AI Agents', url: '#' },
        { type: 'pdf', title: 'Chapter 1: What is AI?', url: '#' },
    ]
  },
  {
    id: 'WD404',
    title: 'Modern Web Development',
     resources: [
        { type: 'video', title: 'Getting Started with React', url: '#' },
        { type: 'pdf', title: 'Next.js Documentation', url: '#' },
    ]
  },
  {
    id: 'DB501',
    title: 'Database Management Systems',
     resources: [
        { type: 'pdf', title: 'DBMS Syllabus', url: '#' },
        { type: 'video', title: 'Lecture: Relational Model', url: '#' },
    ]
  }
];

const getResourceIcon = (type: string) => {
    switch (type) {
        case 'video': return <Video className="h-6 w-6 text-primary" />;
        case 'pdf': return <FileText className="h-6 w-6 text-primary" />;
        default: return <Book className="h-6 w-6 text-primary" />;
    }
}


export default function CourseDetailPage({ params }: { params: { courseId: string } }) {
    const course = allCourses.find(c => c.id === params.courseId);

    if (!course) {
        return (
            <div className="p-4 md:p-8">
                <h1 className="text-2xl font-bold">Course not found</h1>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 animate-fade-in-up">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">{course.title}</CardTitle>
                    <CardDescription>
                        All materials and resources for this course are listed below.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold font-headline">Course Resources</h2>
                        {course.resources.length > 0 ? (
                            <ul className="space-y-3">
                                {course.resources.map((resource, index) => (
                                    <li key={index}>
                                        <a 
                                          href={resource.url} 
                                          target="_blank" 
                                          rel="noopener noreferrer" 
                                          className="flex items-center gap-4 p-4 rounded-lg bg-accent hover:bg-primary/20 transition-colors duration-200"
                                        >
                                            {getResourceIcon(resource.type)}
                                            <span className="font-medium">{resource.title}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-muted-foreground">No resources have been uploaded for this course yet.</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
