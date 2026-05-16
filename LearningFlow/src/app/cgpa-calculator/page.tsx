'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Trash2, PlusCircle } from 'lucide-react'

type Subject = {
  credits: string
  grade: string
}

const gradePoints: { [key: string]: number } = {
  S: 10,
  A: 9,
  B: 8,
  C: 7,
  D: 6,
  E: 5,
  F: 0,
}

export default function CgpaCalculatorPage() {
  const [subjects, setSubjects] = useState<Subject[]>([{ credits: '', grade: '' }])
  const [cgpa, setCgpa] = useState<number | null>(null)

  const handleSubjectChange = (index: number, field: keyof Subject, value: string) => {
    const newSubjects = [...subjects]
    newSubjects[index][field] = value
    setSubjects(newSubjects)
    setCgpa(null)
  }

  const addSubject = () => {
    setSubjects([...subjects, { credits: '', grade: '' }])
  }

  const removeSubject = (index: number) => {
    const newSubjects = subjects.filter((_, i) => i !== index)
    setSubjects(newSubjects)
  }

  const calculateCgpa = () => {
    let totalCredits = 0
    let totalPoints = 0
    
    subjects.forEach(subject => {
      const credits = parseFloat(subject.credits)
      const grade = subject.grade
      if (!isNaN(credits) && grade && gradePoints[grade] !== undefined) {
        totalCredits += credits
        totalPoints += credits * gradePoints[grade]
      }
    })

    if (totalCredits > 0) {
      setCgpa(totalPoints / totalCredits)
    } else {
      setCgpa(0)
    }
  }

  return (
    <div className="flex justify-center items-start p-4 md:p-8 min-h-screen animate-fade-in-up">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">CGPA Calculator</CardTitle>
          <CardDescription>Enter your course credits and grades to calculate your CGPA.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subjects.map((subject, index) => (
              <div key={index} className="flex gap-4 items-center">
                <Input
                  type="number"
                  placeholder="Credits"
                  value={subject.credits}
                  onChange={(e) => handleSubjectChange(index, 'credits', e.target.value)}
                  className="w-1/3"
                />
                <Select
                  value={subject.grade}
                  onValueChange={(value) => handleSubjectChange(index, 'grade', value)}
                >
                  <SelectTrigger className="w-2/3">
                    <SelectValue placeholder="Select Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(gradePoints).map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="icon" onClick={() => removeSubject(index)} disabled={subjects.length <= 1}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={addSubject} className="mt-4">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Subject
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
            <Button onClick={calculateCgpa}>Calculate CGPA</Button>
            {cgpa !== null && (
                <div className="mt-4 text-center p-4 rounded-lg bg-accent w-full">
                    <p className="text-muted-foreground">Your Calculated CGPA is:</p>
                    <p className="text-4xl font-bold font-headline text-primary">{cgpa.toFixed(2)}</p>
                </div>
            )}
        </CardFooter>
      </Card>
    </div>
  )
}
