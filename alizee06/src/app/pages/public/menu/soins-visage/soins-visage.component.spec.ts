import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoinsVisageComponent } from './soins-visage.component';

describe('SoinsVisageComponent', () => {
  let component: SoinsVisageComponent;
  let fixture: ComponentFixture<SoinsVisageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoinsVisageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoinsVisageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
