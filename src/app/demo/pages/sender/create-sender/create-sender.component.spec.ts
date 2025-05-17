import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSenderComponent } from './create-sender.component';

describe('CreateSenderComponent', () => {
  let component: CreateSenderComponent;
  let fixture: ComponentFixture<CreateSenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSenderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
