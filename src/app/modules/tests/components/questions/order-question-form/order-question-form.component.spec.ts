import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderQuestionFormComponent } from './order-question-form.component';

describe('OrderQuestionFormComponent', () => {
  let component: OrderQuestionFormComponent;
  let fixture: ComponentFixture<OrderQuestionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderQuestionFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderQuestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
