import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManyOfQuestionFormComponent } from './many-of-question-form.component';

describe('ManyOfQuestionFormComponent', () => {
  let component: ManyOfQuestionFormComponent;
  let fixture: ComponentFixture<ManyOfQuestionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManyOfQuestionFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManyOfQuestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
