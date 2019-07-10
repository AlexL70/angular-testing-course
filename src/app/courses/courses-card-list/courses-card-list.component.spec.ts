import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CoursesCardListComponent} from './courses-card-list.component';
import {CoursesModule} from '../courses.module';
import {COURSES} from '../../../../server/db-data';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {sortCoursesBySeqNo} from '../home/sort-course-by-seq';
import {Course} from '../model/course';
import {setupCourses} from '../common/setup-test-data';

describe(`${CoursesCardListComponent.name}`, () => {
  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoursesModule]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(CoursesCardListComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
    });
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  it('should display the course list', () => {
    component.courses = setupCourses();
    fixture.detectChanges();
    const cards = debugElement.queryAll(By.css('.course-card'));
    expect(cards).toBeTruthy('Could not find cards');
    expect(cards.length).toBe(component.courses.length, 'Unexpected number of courses.');
  });


  it('should display the first course', () => {
    component.courses = setupCourses();
    fixture.detectChanges();
    const course = component.courses[0];
    const card = debugElement.query(By.css('.course-card:first-child'));
    expect(card).toBeTruthy('Could not find the first course card');
    const title = card.query(By.css('mat-card-title'));
    expect(title.nativeElement.textContent).toBe(course.titles.description);
    const image = card.query(By.css('img'));
    expect(image.nativeElement.src).toBe(course.iconUrl);
  });


});


