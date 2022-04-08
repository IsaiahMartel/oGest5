import { TestBed } from '@angular/core/testing';

import { TypeScheduleService } from './type-schedule.service';

describe('TypeScheduleService', () => {
  let service: TypeScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
