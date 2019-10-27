import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsRecruiterRegComponent } from './as-recruiter-reg.component';

describe('AsRecruiterComponent', () => {
  let component: AsRecruiterRegComponent;
  let fixture: ComponentFixture<AsRecruiterRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsRecruiterRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsRecruiterRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
