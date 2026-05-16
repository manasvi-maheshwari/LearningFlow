'use client'

import { useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Upload, BookOpen, FileText, Video } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

// Mock data for courses and their materials
const coursesWithMaterials = [
  {
    id: 'CS101',
    title: 'Introduction to Python Programming',
    materials: [
      { type: 'pdf', title: 'Syllabus for CS101.pdf' },
      { type: 'video', title: 'Week 1 Lecture.mp4' },
    ]
  },
  {
    id: 'DS202',
    title: 'Data Structures and Algorithms',
    materials: [
      { type: 'pdf', title: 'Course Overview.pdf' },
      { type: 'video', title: 'Lecture 1: Big O Notation.mp4' },
    ]
  },
  {
    id: 'AI301',
    title: 'Artificial Intelligence Fundamentals',
    materials: []
  },
  {
    id: 'WD404',
    title: 'Modern Web Development',
    materials: [
      { type: 'video', title: 'Getting Started with React.mp4' },
    ]
  },
  {
    id: 'DB501',
    title: 'Database Management Systems',
    materials: [
        { type: 'pdf', title: 'DBMS Syllabus.pdf' },
    ]
  }
];

const getResourceIcon = (type: string) => {
    switch (type) {
        case 'video': return <Video className="h-5 w-5 text-primary" />;
        case 'pdf': return <FileText className="h-5 w-5 text-primary" />;
        default: return <BookOpen className="h-5 w-5 text-primary" />;
    }
}


export default function TeacherMaterialsPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "File Ready for Upload",
        description: `${file.name} has been selected.`,
      });
      // In a real app, you would now handle the upload process.
    }
    // Reset file input to allow selecting the same file again
    if(event.target) {
        event.target.value = '';
    }
  };


  return (
    <div className="p-4 md:p-8 animate-fade-in-up">
       <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
      />
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Upload className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="font-headline text-2xl">Upload Content</CardTitle>
              <CardDescription>
                Select a course to manage its materials and upload new content.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {coursesWithMaterials.map((course) => (
              <AccordionItem value={course.id} key={course.id}>
                <AccordionTrigger className="text-lg font-medium hover:no-underline">
                  {course.title}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="font-semibold mb-4 font-headline">Uploaded Materials</h3>
                      {course.materials.length > 0 ? (
                        <ul className="space-y-3">
                          {course.materials.map((material, index) => (
                            <li key={index} className="flex items-center gap-3 p-3 rounded-md bg-accent">
                                {getResourceIcon(material.type)}
                                <span>{material.title}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted-foreground">No materials uploaded yet.</p>
                      )}
                    </div>
                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg bg-accent/50">
                       <h3 className="font-semibold mb-4 font-headline">Upload New File</h3>
                       <p className="text-sm text-muted-foreground text-center mb-4">Click the button below to select a file from your device.</p>
                       <Button onClick={handleUploadClick}>
                          <Upload className="mr-2 h-4 w-4" />
                          Choose File
                       </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
