import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalMenu3Component } from './optional-menu3.component';

describe('OptionalMenu3Component', () => {
  let component: OptionalMenu3Component;
  let fixture: ComponentFixture<OptionalMenu3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionalMenu3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalMenu3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
