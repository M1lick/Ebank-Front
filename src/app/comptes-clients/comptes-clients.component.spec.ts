import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptesClientsComponent } from './comptes-clients.component';

describe('ComptesClientsComponent', () => {
  let component: ComptesClientsComponent;
  let fixture: ComponentFixture<ComptesClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComptesClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComptesClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
