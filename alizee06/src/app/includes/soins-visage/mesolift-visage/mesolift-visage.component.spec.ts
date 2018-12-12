import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesoliftVisageComponent } from './mesolift-visage.component';

describe('MesoliftVisageComponent', () => {
  let component: MesoliftVisageComponent;
  let fixture: ComponentFixture<MesoliftVisageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesoliftVisageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesoliftVisageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
