import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroVisageComponent } from './micro-visage.component';

describe('MicroVisageComponent', () => {
  let component: MicroVisageComponent;
  let fixture: ComponentFixture<MicroVisageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicroVisageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroVisageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
