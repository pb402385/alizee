import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InjectionsVisageComponent } from './injections-visage.component';

describe('InjectionsVisageComponent', () => {
  let component: InjectionsVisageComponent;
  let fixture: ComponentFixture<InjectionsVisageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InjectionsVisageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InjectionsVisageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
