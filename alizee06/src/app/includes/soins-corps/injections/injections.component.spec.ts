import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InjectionsComponent } from './injections.component';

describe('InjectionsComponent', () => {
  let component: InjectionsComponent;
  let fixture: ComponentFixture<InjectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InjectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InjectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
