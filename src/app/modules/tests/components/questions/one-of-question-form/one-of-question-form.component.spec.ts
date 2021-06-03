import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneOfQuestionFormComponent } from './one-of-question-form.component';

describe('OneOfQuestionFormComponent', () => {
  let component: OneOfQuestionFormComponent;
  let fixture: ComponentFixture<OneOfQuestionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OneOfQuestionFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneOfQuestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
