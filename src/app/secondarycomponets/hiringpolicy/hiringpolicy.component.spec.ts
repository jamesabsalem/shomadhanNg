import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HiringPolicyComponent } from './hiringpolicy.component';






describe('HiringPolicyComponent', () => {
  let component: HiringPolicyComponent;
  let fixture: ComponentFixture<HiringPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiringPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
