import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoinsCorpsComponent } from './soins-corps.component';

describe('SoinsCorpsComponent', () => {
  let component: SoinsCorpsComponent;
  let fixture: ComponentFixture<SoinsCorpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoinsCorpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoinsCorpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
