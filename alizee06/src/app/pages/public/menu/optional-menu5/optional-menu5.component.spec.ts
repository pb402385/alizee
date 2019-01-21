import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalMenu5Component } from './optional-menu5.component';

describe('OptionalMenu5Component', () => {
  let component: OptionalMenu5Component;
  let fixture: ComponentFixture<OptionalMenu5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionalMenu5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalMenu5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
