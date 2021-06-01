import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExactAnswerQuestionFormComponent } from './exact-answer-question-form.component';

describe('ExactAnswerQuestionFormComponent', () => {
  let component: ExactAnswerQuestionFormComponent;
  let fixture: ComponentFixture<ExactAnswerQuestionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExactAnswerQuestionFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExactAnswerQuestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
