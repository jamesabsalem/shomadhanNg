import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RecomandedServiceComponent } from './recomandedservice.component';






describe('RecomandedServiceComponent', () => {
  let component: RecomandedServiceComponent;
  let fixture: ComponentFixture<RecomandedServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecomandedServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomandedServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
