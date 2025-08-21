import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortafolioLeoComponent } from './portafolio-leo.component';

describe('PortafolioLeoComponent', () => {
  let component: PortafolioLeoComponent;
  let fixture: ComponentFixture<PortafolioLeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortafolioLeoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortafolioLeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
