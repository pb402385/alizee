import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiltatherapieComponent } from './miltatherapie.component';

describe('MiltatherapieComponent', () => {
  let component: MiltatherapieComponent;
  let fixture: ComponentFixture<MiltatherapieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiltatherapieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiltatherapieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
