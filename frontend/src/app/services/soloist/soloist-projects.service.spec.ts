import { TestBed } from '@angular/core/testing';

import { SoloistProjectsService } from './soloist-projects.service';

describe('SoloistProjectsService', () => {
  let service: SoloistProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoloistProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

