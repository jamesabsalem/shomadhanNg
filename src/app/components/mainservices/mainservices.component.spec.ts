import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainservicesComponent } from './mainservices.component';

describe('BasicelementsComponent', () => {
  let component: MainservicesComponent;
  let fixture: ComponentFixture<MainservicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainservicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
