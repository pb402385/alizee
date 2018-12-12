import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwinslimVisageComponent } from './twinslim-visage.component';

describe('TwinslimVisageComponent', () => {
  let component: TwinslimVisageComponent;
  let fixture: ComponentFixture<TwinslimVisageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwinslimVisageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwinslimVisageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
