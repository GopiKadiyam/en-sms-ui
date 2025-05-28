import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmscActionRendererComponent } from './smsc-action-renderer.component';

describe('SmscActionRendererComponent', () => {
  let component: SmscActionRendererComponent;
  let fixture: ComponentFixture<SmscActionRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmscActionRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmscActionRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
