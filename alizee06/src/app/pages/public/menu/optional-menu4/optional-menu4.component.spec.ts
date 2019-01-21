import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalMenu4Component } from './optional-menu4.component';

describe('OptionalMenu4Component', () => {
  let component: OptionalMenu4Component;
  let fixture: ComponentFixture<OptionalMenu4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionalMenu4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalMenu4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
