import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DervabrasionVisageComponent } from './dervabrasion-visage.component';

describe('DervabrasionVisageComponent', () => {
  let component: DervabrasionVisageComponent;
  let fixture: ComponentFixture<DervabrasionVisageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DervabrasionVisageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DervabrasionVisageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
