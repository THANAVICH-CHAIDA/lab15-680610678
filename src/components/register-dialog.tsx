import { useState } from "react";
import type { Course, Student } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type RegisterDialogProps = {
  courses: (Course & { isEnrolled?: boolean })[];
  student?: Student;
  onEnroll: (courseId: string, enrollTime: string) => void;
};

export function RegisterDialog({
  courses = [],
  student,
  onEnroll,
}: RegisterDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [enrollTime, setEnrollTime] = useState(getCurrentTime);


  const availableCourses = courses.filter((course) => !course.isEnrolled);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setEnrollTime(getCurrentTime());
      setSelectedCourseId("");
    }
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedCourseId) return;

onEnroll(selectedCourseId, enrollTime);

  setOpen(false);
  }

  const studentFullName = student 
    ? `${student.firstName} ${student.lastName}` 
    : "ธนวิชญ์ ชัยดา";
  const studentProgram = student?.program ?? "CPE";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
    
      <DialogTrigger>
        <Button>ลงทะเบียน</Button>
      </DialogTrigger>

  
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>ลงทะเบียนรายวิชา</DialogTitle>
            <DialogDescription>กรอกข้อมูลเพื่อลงทะเบียน</DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="course">วิชา</Label>
            <Select
              value={selectedCourseId}
              onValueChange={(val) => setSelectedCourseId(val ?? "")}
            >
              <SelectTrigger id="course" className="w-full">
                <SelectValue placeholder="เลือกวิชา" />
              </SelectTrigger>
              <SelectContent  className="z-[60]">
                {availableCourses.length === 0 ? (
                  <div className="p-2 text-center text-sm text-muted-foreground">
                    ลงทะเบียนครบทุกวิชาแล้ว
                  </div>
                ) : (
                  availableCourses.map((course) => (
                    <SelectItem key={course.courseId} value={course.courseId}>
                      {course.courseId} – {course.courseTitle}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          
          <div className="space-y-2">
            <Label htmlFor="enrollTime">เลือกเวลา</Label>
            <Input
              id="enrollTime"
              type="time"
              value={enrollTime}
              onChange={(e) => setEnrollTime(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="studentId">รหัสนักศึกษา</Label>
            <Input
              id="studentId"
              value={student?.studentId ?? "680610678"}
              readOnly
              className="bg-muted text-muted-foreground cursor-not-allowed"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">ชื่อ นศ.</Label>
            <Input
              id="fullName"
              value={studentFullName}
              readOnly
              className="bg-muted text-muted-foreground cursor-not-allowed"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="program">โปรแกรม</Label>
            <Input
              id="program"
              value={studentProgram}
              readOnly
              className="bg-muted text-muted-foreground cursor-not-allowed"
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={!selectedCourseId}>
              ยืนยันการลงทะเบียน
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
