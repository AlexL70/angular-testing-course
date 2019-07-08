import { COURSES } from './../../../../server/db-data';
import { CoursesService } from './courses.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

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
});