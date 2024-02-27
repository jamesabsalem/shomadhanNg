import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AvailableAreaComponent } from './availableareas.component';





describe('AvailableAreaComponent', () => {
  let component: AvailableAreaComponent;
  let fixture: ComponentFixture<AvailableAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
