import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeelingComponent } from './peeling.component';

describe('PeelingComponent', () => {
  let component: PeelingComponent;
  let fixture: ComponentFixture<PeelingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeelingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeelingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
