import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwinslimComponent } from './twinslim.component';

describe('TwinslimComponent', () => {
  let component: TwinslimComponent;
  let fixture: ComponentFixture<TwinslimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwinslimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwinslimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
