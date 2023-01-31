import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeTeacherMenuComponent } from './become-teacher-menu.component';

describe('BecomeTeacherMenuComponent', () => {
  let component: BecomeTeacherMenuComponent;
  let fixture: ComponentFixture<BecomeTeacherMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BecomeTeacherMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BecomeTeacherMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
