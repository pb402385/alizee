import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalMenu1Component } from './optional-menu1.component';

describe('OptionalMenu1Component', () => {
  let component: OptionalMenu1Component;
  let fixture: ComponentFixture<OptionalMenu1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionalMenu1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalMenu1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
