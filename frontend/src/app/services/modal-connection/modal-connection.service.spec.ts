import { TestBed } from '@angular/core/testing';

import { ModalConnectionService } from './modal-connection.service';

describe('ModalConnectionService', () => {
  let service: ModalConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
