import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserApiKeyComponent } from './user-api-key.component';

describe('UserApiKeyComponent', () => {
  let component: UserApiKeyComponent;
  let fixture: ComponentFixture<UserApiKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserApiKeyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserApiKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
