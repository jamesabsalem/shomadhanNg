import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbdModalContent } from './modal.component';

describe('ModalComponent', () => {
  let component: NgbdModalContent;
  let fixture: ComponentFixture<NgbdModalContent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgbdModalContent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbdModalContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
