import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerserviceComponent } from './innerservice.component';

describe('BasicelementsComponent', () => {
  let component: InnerserviceComponent;
  let fixture: ComponentFixture<InnerserviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerserviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
