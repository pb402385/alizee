import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalMenu2Component } from './optional-menu2.component';

describe('OptionalMenu2Component', () => {
  let component: OptionalMenu2Component;
  let fixture: ComponentFixture<OptionalMenu2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionalMenu2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalMenu2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
