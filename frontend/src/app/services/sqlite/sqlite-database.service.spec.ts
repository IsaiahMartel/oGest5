import { TestBed } from '@angular/core/testing';

import { SqliteDatabaseService } from './sqlite-database.service';

describe('SqliteDatabaseService', () => {
  let service: SqliteDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SqliteDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
