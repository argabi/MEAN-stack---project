import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsRecruiterComponent } from './as-recruiter.component';

describe('AsRecruiterComponent', () => {
  let component: AsRecruiterComponent;
  let fixture: ComponentFixture<AsRecruiterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsRecruiterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsRecruiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
