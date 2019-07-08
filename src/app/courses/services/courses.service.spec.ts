import { COURSES } from './../../../../server/db-data';
import { CoursesService } from './courses.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Course } from '../model/course';
import { HttpErrorResponse } from '@angular/common/http';

describe(`${CoursesService.name}`, () => {
  let coursesService: CoursesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers: [
        CoursesService
      ]
    });
    coursesService = TestBed.get(CoursesService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should retrieve all courses', () => {
    coursesService.findAllCourses().subscribe(courses => {
      expect(courses).toBeTruthy('No courses returned');
      expect(courses.length).toBe(12, 'Incorrect number of courses');
      const course = courses.find(c => c.id === 12);
      expect(course.titles.description).toBe('Angular Testing Course');
    });

    const req = httpTestingController.expectOne('/api/courses', 'Wrong URL for all courses');
    expect(req.request.method).toBe('GET', 'Wrong request verb');
    req.flush({payload: Object.values(COURSES)});
  });

  it('should find a course by id', () => {
    coursesService.findCourseById(12).subscribe(course => {
      expect(course).toBeTruthy();
      expect(course.id).toBe(12);
    });

    const req = httpTestingController.expectOne('/api/courses/12', 'Wrong URL for course');
    expect(req.request.method).toBe('GET', 'Wrong request werb');
    req.flush(COURSES[12]);
  });

  it('should save the course datad', () => {
    const changes: Partial<Course> = { titles: { description: 'Testing course of Angular'} };
    coursesService.saveCourse(12, changes)
      .subscribe(course => {
        expect(course).toBeTruthy();
        expect(course.id).toBe(12);
      });

    const req = httpTestingController.expectOne('/api/courses/12', `Wrong URL for ${coursesService.saveCourse.name}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body.titles.description).toBe(changes.titles.description);
    req.flush({
      ...COURSES[12],
      ...changes
    });
  });

  it('should give an error when save course fails', () => {
    const changes: Partial<Course> = { titles: { description: 'Testing course of Angular'} };
    coursesService.saveCourse(12, changes)
      .subscribe(() => fail(`the "${coursesService.saveCourse.name}" operation should have failed`),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
      });

    const req = httpTestingController.expectOne('/api/courses/12', `Wrong URL for ${coursesService.saveCourse.name}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body.titles.description).toBe(changes.titles.description);
    req.flush('Save course failed', { status: 500, statusText: 'Internal server error'});
  });
});
