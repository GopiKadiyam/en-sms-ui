import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSmscComponent } from './create-smsc.component';

describe('CreateSmscComponent', () => {
  let component: CreateSmscComponent;
  let fixture: ComponentFixture<CreateSmscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSmscComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSmscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
