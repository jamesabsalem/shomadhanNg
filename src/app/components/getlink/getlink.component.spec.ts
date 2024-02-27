import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GetLinkComponent } from './getlink.component';




describe('BasicelementsComponent', () => {
  let component: GetLinkComponent;
  let fixture: ComponentFixture<GetLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
