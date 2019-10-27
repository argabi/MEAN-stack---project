import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplingJobsComponent } from './appling-jobs.component';

describe('ApplingJobsComponent', () => {
  let component: ApplingJobsComponent;
  let fixture: ComponentFixture<ApplingJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplingJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplingJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
