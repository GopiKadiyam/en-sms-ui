import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSmscComponent } from './delete-smsc.component';

describe('DeleteSmscComponent', () => {
  let component: DeleteSmscComponent;
  let fixture: ComponentFixture<DeleteSmscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteSmscComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSmscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
