import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryInfoComponent } from './categoryinfo.component';




describe('CategoryInfoComponent', () => {
  let component: CategoryInfoComponent;
  let fixture: ComponentFixture<CategoryInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
