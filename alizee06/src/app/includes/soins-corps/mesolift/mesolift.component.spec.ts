import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesoliftComponent } from './mesolift.component';

describe('MesoliftComponent', () => {
  let component: MesoliftComponent;
  let fixture: ComponentFixture<MesoliftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesoliftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesoliftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
