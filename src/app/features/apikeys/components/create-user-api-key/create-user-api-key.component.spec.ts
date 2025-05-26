import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserApiKeyComponent } from './create-user-api-key.component';

describe('CreateUserApiKeyComponent', () => {
  let component: CreateUserApiKeyComponent;
  let fixture: ComponentFixture<CreateUserApiKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUserApiKeyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUserApiKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
