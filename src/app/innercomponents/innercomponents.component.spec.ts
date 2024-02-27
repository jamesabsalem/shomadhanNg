import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InnerComponentsComponent } from './innercomponents.component';



describe('InnerComponentsComponent', () => {
  let component: InnerComponentsComponent;
  let fixture: ComponentFixture<InnerComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
