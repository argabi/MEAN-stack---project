import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsUserRegComponent } from './as-user-reg.component';

describe('AsUserComponent', () => {
  let component: AsUserRegComponent;
  let fixture: ComponentFixture<AsUserRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsUserRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsUserRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
