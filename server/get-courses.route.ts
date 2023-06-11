import { Request, Response } from "express";
import { COURSES } from "./db-data";

export function getAllCourses(req: Request, res: Response) {
  res.status(200).json({ payload: Object.values(COURSES) });
}

export function getCourseById(req: Request, res: Response) {
  console.log(`/api/courses called`);

  const courseId = req.params["id"];

  const courses: any = Object.values(COURSES);

  const course = courses.find((course) => course.id == courseId);

  res.status(200).json(course);
}
