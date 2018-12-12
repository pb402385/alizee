import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DervabrasionComponent } from './dervabrasion.component';

describe('DervabrasionComponent', () => {
  let component: DervabrasionComponent;
  let fixture: ComponentFixture<DervabrasionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DervabrasionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DervabrasionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
