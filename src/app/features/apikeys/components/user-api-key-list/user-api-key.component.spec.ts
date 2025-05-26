import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserApiKeyListComponent } from './user-api-key.component';

describe('UserApiKeyComponent', () => {
  let component: UserApiKeyListComponent;
  let fixture: ComponentFixture<UserApiKeyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserApiKeyListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserApiKeyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
