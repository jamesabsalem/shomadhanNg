import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerFeedbackComponent } from './customerfeedback.component';




describe('BasicelementsComponent', () => {
  let component: CustomerFeedbackComponent;
  let fixture: ComponentFixture<CustomerFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
