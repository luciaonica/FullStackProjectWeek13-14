import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsAddDisplayComponent } from './projects-add-display.component';

describe('ProjectsAddDisplayComponent', () => {
  let component: ProjectsAddDisplayComponent;
  let fixture: ComponentFixture<ProjectsAddDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsAddDisplayComponent]
    });
    fixture = TestBed.createComponent(ProjectsAddDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
