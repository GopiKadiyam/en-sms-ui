import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserApiKeyComponent } from './delete-user-api-key.component';

describe('DeleteUserApiKeyComponent', () => {
  let component: DeleteUserApiKeyComponent;
  let fixture: ComponentFixture<DeleteUserApiKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteUserApiKeyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteUserApiKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
